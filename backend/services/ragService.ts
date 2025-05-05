import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { pull } from "langchain/hub";
import { Annotation } from "@langchain/langgraph";
import { ChatMistralAI } from "@langchain/mistralai";
import { StateGraph } from "@langchain/langgraph";
import { Document } from "langchain/document";
import dotenv from "dotenv";
import { supabase } from "../config/supabase";
import dataFormaterService from "./dataFormaterService";
import { MistralAIEmbeddings } from "@langchain/mistralai";

dotenv.config();

class RagService {
  private static instance: RagService;
  private model: ChatMistralAI;
  private embeddingModel: MistralAIEmbeddings;
  private vectorStore: SupabaseVectorStore;
  private promptTemplates: Map<string, any>;
  private graphs: Map<string, any>;
  private initialized: boolean = false;
  private userContextCache: Map<
    string,
    { timestamp: number; documents: Document[] }
  > = new Map();
  private CACHE_TTL = 10 * 60 * 1000; // 10 minutes in milliseconds

  private constructor() {
    this.model = new ChatMistralAI({
      model: "mistral-large-latest",
      apiKey: process.env.MISTRAL_API_KEY!,
      temperature: 0,
    });

    this.embeddingModel = new MistralAIEmbeddings({
      model: "mistral-embed", 
      apiKey: process.env.MISTRAL_API_KEY!,
    });

    this.vectorStore = new SupabaseVectorStore(this.embeddingModel, {
      client: supabase,
      tableName: "document_embeddings",
      queryName: "match_documents",
    });

    this.promptTemplates = new Map();
    this.graphs = new Map();
  }

  /**
   * Get the singleton instance
   */
  public static getInstance(): RagService {
    if (!RagService.instance) {
      RagService.instance = new RagService();
    }
    return RagService.instance;
  }

  /**
   * Initialize the RAG service at server startup
   */
  public async initialize(): Promise<void> {
    if (this.initialized) {
      console.log("RAG Service already initialized.");
      return;
    }

    try {
      // Load prompt templates for different use cases
      const ragPrompt = await pull("rlm/rag-prompt");
      const analysisPrompt = await pull("rlm/rag-prompt");
      const recommendationPrompt = await pull("rlm/rag-prompt");

      // Customize prompts for different scenarios
      this.promptTemplates.set("general", ragPrompt);
      this.promptTemplates.set("analysis", analysisPrompt);
      this.promptTemplates.set("recommendation", recommendationPrompt);

      // Create the base annotation for the state graphs
      const StateAnnotation = Annotation.Root({
        question: Annotation,
        context: Annotation,
        answer: Annotation,
        user_id: Annotation,
        coordinates: Annotation,
        options: Annotation,
      });

      // Create graphs for different types of queries
      this.initializeGraphs(StateAnnotation);

      this.initialized = true;
      console.log("✅ RAG Service fully initialized and ready.");
    } catch (error) {
      console.error("Failed to initialize RAG Service:", error);
      throw error;
    }
  }

  /**
   * Initialize different graphs for various query types
   */
  private initializeGraphs(StateAnnotation: any): void {
    // Helper to create retrieve node
    const createRetrieveNode = () => async (state: any) => {
      let documents;
      const cacheKey = state.user_id;
      const cachedContext = this.userContextCache.get(cacheKey);
      const now = Date.now();

      if (cachedContext && now - cachedContext.timestamp < this.CACHE_TTL) {
        // Use cached context if it's not expired
        documents = cachedContext.documents;
        console.log("Using cached context for user:", cacheKey);
      } else {
        // Otherwise fetch fresh context
        console.log("Fetching fresh context for user:", cacheKey);
        const options = state.options || {};

        documents = await dataFormaterService.getContext(
          state.user_id,
          state.coordinates,
          {
            query: state.question,
            mode: options.mode || "walk",
            distance: options.distance || "5",
            unit: options.unit || "km",
            timeframe: options.timeframe || "month",
            includeNearbyStores: options.includeNearbyStores !== false,
            includeTransactions: options.includeTransactions !== false,
            includeGoals: options.includeGoals !== false,
            includeBudget: options.includeBudget !== false,
          }
        );

        console.log(documents)
        
        // Cache the new context
        this.userContextCache.set(cacheKey, {
          timestamp: now,
          documents,
        });
      }

      // Filter context relevant to the query using vector search
      const relevantDocs = await this.vectorStore.similaritySearchWithScore(
        state.question,
        10,
        { filter: { user_id: state.user_id } }
      );

      // Combine base context with query-specific relevant docs
      const combinedContext = [...documents];

      // Add any high scoring relevant docs not already in the context
      relevantDocs.forEach(([doc, score]) => {
        if (score > 0.7) {
          // Only add highly relevant docs
          const exists = combinedContext.some(
            (existingDoc) => existingDoc.pageContent === doc.pageContent
          );
          if (!exists) {
            combinedContext.push(doc);
          }
        }
      });

      // Optimize context based on token limits
      const optimizedContext = dataFormaterService.optimizeContextForTokenLimit(
        combinedContext,
        3000
      );

      return { context: optimizedContext };
    };

    // Base generate node for answering questions
    const createGenerateNode = (promptType: string) => async (state: any) => {
      const promptTemplate = this.promptTemplates.get(promptType);
      const docsContent = state.context
        .map((doc: Document) => doc.pageContent)
        .join("\n\n");

      // Check if Arabic response is requested
      const isArabic = state.options?.isArabic || false;
      
      let systemPrompt = "You are a helpful AI assistant providing accurate information.";
      
      if (isArabic) {
        systemPrompt = "أنت مساعد ذكي اصطناعي مفيد يقدم معلومات دقيقة. أجب دائمًا باللغة العربية الفصحى.";
      }

      const messages = await promptTemplate.invoke({
        question: state.question,
        context: docsContent,
      });
      
      // Insert system message to control language output
      messages.messages.unshift({
        role: "system",
        content: systemPrompt
      });

      const response = await this.model.invoke(messages);
      return { answer: response.content };
    };

    // Creating different graphs for different query types

    // General purpose query graph
    const generalGraph = new StateGraph(StateAnnotation)
      .addNode("retrieve", createRetrieveNode())
      .addNode("generate", createGenerateNode("general"))
      .addEdge("__start__", "retrieve")
      .addEdge("retrieve", "generate")
      .addEdge("generate", "__end__")
      .compile();
    this.graphs.set("general", generalGraph);

    // Analysis graph (with specialized prompt)
    const analysisGraph = new StateGraph(StateAnnotation)
      .addNode("retrieve", createRetrieveNode())
      .addNode("generate", createGenerateNode("analysis"))
      .addEdge("__start__", "retrieve")
      .addEdge("retrieve", "generate")
      .addEdge("generate", "__end__")
      .compile();
    this.graphs.set("analysis", analysisGraph);

    // Recommendation graph
    const recommendationGraph = new StateGraph(StateAnnotation)
      .addNode("retrieve", createRetrieveNode())
      .addNode("generate", createGenerateNode("recommendation"))
      .addEdge("__start__", "retrieve")
      .addEdge("retrieve", "generate")
      .addEdge("generate", "__end__")
      .compile();
    this.graphs.set("recommendation", recommendationGraph);

    console.log("✅ RAG Graphs compiled and ready.");
  }

  /**
   * Clear context cache for a user
   */
  public clearUserCache(userId: string): void {
    this.userContextCache.delete(userId);
    console.log(`Cleared context cache for user: ${userId}`);
  }

  /**
   * Force refresh of a user's context
   */
  public async refreshUserContext(
    userId: string,
    coordinates: { latitude: number; longitude: number },
    options: any = {}
  ): Promise<void> {
    console.log(`Refreshing context for user: ${userId}`);

    const documents = await dataFormaterService.getContext(
      userId,
      coordinates,
      options
    );

    // Update cache with fresh context
    this.userContextCache.set(userId, {
      timestamp: Date.now(),
      documents,
    });

    console.log(`Context refreshed for user: ${userId}`);
  }
  
  /**
   * Hybrid extraction: try LLM, then fallback to heuristics
   */
  private async inferOptionsFromQuery(question: string): Promise<any> {
    let extracted: any = {};
    try {
      const extractionPrompt = `You are an assistant that extracts structured query options from user messages.\n
Given the message: "${question}"\n
Return only a JSON object with possible keys if nothing found don't return anything: mode, distance, unit, timeframe, includeNearbyStores, includeTransactions, includeGoals, includeBudget.`;
      const response = await this.model.invoke([
        { role: "system", content: "Extract query options." },
        { role: "user", content: extractionPrompt },
      ]);
      
      const fenceMatch = response.content
        .toString()
        .match(/```(?:json)?\s*([\s\S]*?)```/i);

      let data: string;
      if (fenceMatch) {
        data = fenceMatch[1].trim();
      } else {
        const braceMatch = response.content.toString().match(/({[\s\S]*})/);
        data = braceMatch ? braceMatch[1] : "";
      }
      
      if (data) extracted = JSON.parse(data);
    } catch (e) {
      console.warn("Option extraction via LLM failed, using heuristics.", e);
    }
    const heuristic = this.inferOptionsHeuristics(question);
    // Merge heuristic with extracted (extracted values take precedence)
    return { ...heuristic, ...extracted };
  }

  /**
   * Simple keyword-based heuristics for options
   */
  private inferOptionsHeuristics(message: string): any {
    const lower = message.toLowerCase();
    return {
      mode: lower.includes("save")
        ? "budget"
        : lower.includes("buy") || lower.includes("purchase")
        ? "store"
        : "general",
      timeframe: lower.includes("week")
        ? "week"
        : lower.includes("month")
        ? "month"
        : lower.includes("year")
        ? "year"
        : undefined,
      includeNearbyStores: lower.includes("store") || lower.includes("nearby"),
      includeTransactions:
        lower.includes("spending") || lower.includes("expenses"),
      includeGoals: lower.includes("goal"),
      includeBudget: lower.includes("budget") || lower.includes("save"),
    };
  }

  /**
   * General query method with hybrid options
   */
  public async query(
    question: string,
    userId: string,
    coordinates: { latitude: number; longitude: number },
    options: any = {}
  ): Promise<string> {
    if (!this.initialized) {
      throw new Error("RAG Service not initialized. Call initialize() first.");
    }
    // Infer missing options from question
    const inferred = await this.inferOptionsFromQuery(question);
    const mergedOptions = { ...inferred, ...options };

    const graphType = this.determineQueryType(question);
    const graph = this.graphs.get(graphType)!;
    const result = await graph.invoke({
      question,
      user_id: userId,
      coordinates,
      options: mergedOptions,
    });
    return result.answer;
  }

  /**
   * Analyze data with detailed output in markdown, hybrid options
   */
  public async analyzeData(
    question: string,
    userId: string,
    coordinates: { latitude: number; longitude: number },
    options: any = {}
  ): Promise<string> {
    if (!this.initialized) {
      throw new Error("RAG Service not initialized. Call initialize() first.");
    }
    
    // Add appropriate format directive based on language
    const isArabic = options?.isArabic || false;
    let formatInstruction = " Return your answer as a detailed analysis with metrics and format it as markdown.";
    
    if (isArabic) {
      formatInstruction = " قدم إجابتك كتحليل مفصل مع المقاييس وقم بتنسيقها بصيغة markdown.";
    }
    
    const enhancedQuestion = question + formatInstruction;
    const inferred = await this.inferOptionsFromQuery(question);
    const mergedOptions = { ...inferred, ...options };

    const graph = this.graphs.get("analysis")!;
    const result = await graph.invoke({
      question: enhancedQuestion,
      user_id: userId,
      coordinates,
      options: mergedOptions,
    });
    return result.answer;
  }

  /**
   * Find data and return as structured JSON, hybrid options
   */
  public async findData(
    question: string,
    userId: string,
    coordinates: { latitude: number; longitude: number },
    options: any = {}
  ): Promise<any> {
    if (!this.initialized) {
      return;
    }
    
    let jsonInstruction = ` Return your answer JSON Array in the following exact object structure{
  store: {name,latitude,longitude},
  totalPrice for the requested items highlighted in between && as totalPrice,
  distance,
  } `;
    
    
    const enhancedQuestion = question + jsonInstruction;
    const inferred = await this.inferOptionsFromQuery(question);
    const mergedOptions = { ...inferred, ...options };

    const graph = this.graphs.get("general")!;
    const result = await graph.invoke({
      question: enhancedQuestion,
      user_id: userId,
      coordinates,
      options: mergedOptions,
    });
    
    try {
      const fenceMatch = result.answer
        .toString()
        .match(/```(?:json)?\s*([\s\S]*?)```/i);

      let data: string|null;
      if (fenceMatch) {
        data = fenceMatch[1].trim();
      } else {
        const braceMatch = result.answer.toString().match(/(\[{[\s\S]*}\]|{[\s\S]*})/);
        data = braceMatch ? braceMatch[1] : "";
      }
      
      if (data) data = JSON.parse(data);
      else data = null;
      
      return data;
    } catch (error) {
      console.error("Error parsing JSON response:", error);
      return [];
    }
  }

  /**
   * Determine the type of query for routing to appropriate graph
   */
  private determineQueryType(question: string): string {
    const questionLower = question.toLowerCase();

    // Analysis related keywords
    if (
      questionLower.includes("analyze") ||
      questionLower.includes("analysis") ||
      questionLower.includes("pattern") ||
      questionLower.includes("trend") ||
      questionLower.includes("statistics") ||
      questionLower.includes("metrics") ||
      questionLower.includes("spending") ||
      questionLower.includes("compare") ||
      // Arabic analysis keywords
      questionLower.includes("تحليل") ||
      questionLower.includes("نمط") ||
      questionLower.includes("اتجاه") ||
      questionLower.includes("إحصائيات") ||
      questionLower.includes("مقاييس") ||
      questionLower.includes("إنفاق") ||
      questionLower.includes("مقارنة")
    ) {
      return "analysis";
    }

    // Recommendation related keywords
    if (
      questionLower.includes("recommend") ||
      questionLower.includes("suggest") ||
      questionLower.includes("advice") ||
      questionLower.includes("should i") ||
      questionLower.includes("best place") ||
      questionLower.includes("best store") ||
      questionLower.includes("where to buy") ||
      questionLower.includes("improve") ||
      questionLower.includes("help me") ||
      questionLower.includes("better") ||
      // Arabic recommendation keywords
      questionLower.includes("توصية") ||
      questionLower.includes("اقتراح") ||
      questionLower.includes("نصيحة") ||
      questionLower.includes("أفضل مكان") ||
      questionLower.includes("أفضل متجر") ||
      questionLower.includes("أين أشتري") ||
      questionLower.includes("تحسين") ||
      questionLower.includes("ساعدني") ||
      questionLower.includes("أفضل")
    ) {
      return "recommendation";
    }

    // Default to general
    return "general";
  }
}

// Create and export static interface methods for easy use
const ragService = {
  initialize: async () => {
    await RagService.getInstance().initialize();
  },
  query: async (
    question: string,
    userId: string,
    coordinates: any,
    options: any = {}
  ) =>
    await RagService.getInstance().query(
      question,
      userId,
      coordinates,
      options
    ),
  analyzeData: async (
    question: string,
    userId: string,
    coordinates: any,
    options: any = {}
  ) =>
    await RagService.getInstance().analyzeData(
      question,
      userId,
      coordinates,
      options
    ),
  findData: async (
    question: string,
    userId: string,
    coordinates: any,
    options: any = {}
  ) =>
    await RagService.getInstance().findData(
      question,
      userId,
      coordinates,
      options
    ),
  refreshUserContext: async (
    userId: string,
    coordinates: any,
    options: any = {}
  ) =>
    await RagService.getInstance().refreshUserContext(
      userId,
      coordinates,
      options
    ),
  clearUserCache: (userId: string) => {
    RagService.getInstance().clearUserCache(userId);
  },
};

export default ragService;