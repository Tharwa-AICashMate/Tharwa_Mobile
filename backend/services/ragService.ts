import e from "express";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { pull } from "langchain/hub";
import { Annotation } from "@langchain/langgraph";
import { ChatMistralAI } from "@langchain/mistralai";
import { StateGraph } from "@langchain/langgraph";
import dotenv from "dotenv";
import dataFormaterService from "./dataFormaterService";
dotenv.config();

class RagService {
  private model: ChatMistralAI;
  private embeddingModel: HuggingFaceInferenceEmbeddings;
  private vectorStore: MemoryVectorStore;
  private promptTemplate: any;
  private graph: any;

  constructor() {
    this.model = new ChatMistralAI({
      model: "mistral-large-latest",
      apiKey: process.env.MISTRAL_API_KEY!,
      temperature: 0,
    });

    this.embeddingModel = new HuggingFaceInferenceEmbeddings({
      apiKey: process.env.HUGGINGFACE_API_KEY!,
      model: "sentence-transformers/all-MiniLM-L6-v2",
    });

    this.vectorStore = new MemoryVectorStore(this.embeddingModel);
  }

  async initialize(
    userId: string,
    coordinates: { latitude: number; longitude: number }
  ) {
    const exampleDocs = await dataFormaterService.getContext(
      userId,
      coordinates
    );
    await this.vectorStore.addDocuments(exampleDocs);
    console.log("✅ Embedded with HuggingFace & stored in memory");

    this.promptTemplate = await pull("rlm/rag-prompt");
    console.log("✅ Prompt template loaded.");

    const StateAnnotation = Annotation.Root({
      question: Annotation,
      context: Annotation,
      answer: Annotation,
    });

    const retrieve = async (state) => {
      const retrievedDocs = await this.vectorStore.similaritySearch(
        state.question
      );
      return { context: retrievedDocs };
    };

    const generate = async (state) => {
      const docsContent = state.context
        .map((doc) => doc.pageContent)
        .join("\n");
      const messages = await this.promptTemplate.invoke({
        question: state.question,
        context: docsContent,
      });
      const response = await this.model.invoke(messages);
      return { answer: response.content };
    };

    this.graph = new StateGraph(StateAnnotation)
      .addNode("retrieve", retrieve)
      .addNode("generate", generate)
      .addEdge("__start__", "retrieve")
      .addEdge("retrieve", "generate")
      .addEdge("generate", "__end__")
      .compile();

    console.log("✅ RAG Graph compiled and ready.");
  }

  static async askQuestion(
    question: string,
    userId: string,
    coordinates: { latitude: number; longitude: number }
  ) {
    const rag = new RagService();
    console.log("Initializing RAG...");
    await rag.initialize(userId, coordinates);
    console.log("RAG initialized. Asking question...");
    const result = await rag.graph.invoke({ question });
    console.log("Question asked. Result:", result.answer,result.question);
    return result.answer;
  }
}

export default RagService;
