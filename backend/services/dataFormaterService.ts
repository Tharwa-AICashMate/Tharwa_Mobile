import e from "express";
import { supabase } from "../config/supabase.js";
import { Document } from "langchain/document";
import axios from "axios";

import dotenv from "dotenv";

dotenv.config();
const ORS_API_KEY = "5b3ce3597851110001cf6248d9ea8df6671a4be282ac4dc4d333108b";

class dataFormaterService {
  static async calculateDistance(places: number[][], mode: string) {
    try {
      const response = await axios.post(
        `https://api.openrouteservice.org/v2/matrix/${mode}`,
        {
          locations: places,
          metrics: ["distance", "duration"],
          units: "m",
        },
        {
          headers: {
            Authorization: ORS_API_KEY,
            "Content-Type": "application/json",
          },
        }
      );

      return response;
    } catch (error) {
      console.log("Error fetching distance:", error);
    }
  }
  static formatMatrixResult(matrixData: any, labels: string[]) {
    const { durations, distances, sources, destinations } = matrixData;
    let content = "";

    for (let i = 0; i < labels.length; i++) {
      for (let j = 0; j < labels.length; j++) {
        if (i === j) continue;
        const duration = durations[i]?.[j];
        const distance = distances[i]?.[j];
        if (duration != null && distance != null) {
          content += `From **${labels[i]}** to **${labels[j]}**:\n`;
          content += `   Duration: ${(duration / 60000).toFixed(1)} minutes\n`;
          content += `   Distance: ${(distance / 1000).toFixed(2)} km\n\n`;
        }
      }
    }

    return new Document({
      pageContent: content || "No valid distance data found.",
    });
  }

  static async findStoresNearby(
    lat: string | number,
    lon: string | number,
    radius: string | number,
    unit: string
  ) {
    const { data, error } = await supabase
      .rpc("find_stores_nearby", {
        user_lat: lat,
        user_lon: lon,
        radius,
        unit,
      })
      .select("id");

    if (error) {
      console.log("Error fetching nearby stores:", error);
      throw error;
    }

    return data;
  }
  
  static async getRelevantTransactions(
    userId: string,
    queryContext?: string,
    limit: number = 10
  ) {
    // Get all transactions
    const { data, error } = await supabase
      .from("transaction_with_category_and_store")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error || !data) throw error;

    // If queryContext exists, use it to filter transactions
    let relevantTransactions = data;

    if (queryContext) {
      const keywords = queryContext.toLowerCase().split(/\s+/);

      // Simple relevance scoring based on keyword matching
      relevantTransactions = data
        .map((transaction) => {
          const text = `${transaction.title} ${transaction.category_name} ${
            transaction.store_name || ""
          }`.toLowerCase();
          const score = keywords.reduce(
            (sum, keyword) => sum + (text.includes(keyword) ? 1 : 0),
            0
          );
          return { ...transaction, relevanceScore: score };
        })
        .filter((t) => t.relevanceScore > 0)
        .sort((a, b) => b.relevanceScore - a.relevanceScore)
        .slice(0, limit);
    }

    // If no relevant transactions found or no query context, return most recent ones
    if (relevantTransactions.length === 0) {
      relevantTransactions = data.slice(0, limit);
    }

    return relevantTransactions;
  }

  static async getTimeSensitiveUserSummary(
    userId: string,
    timeframe: "week" | "month" | "year" = "month"
  ) {
    // Calculate date range based on timeframe
    const now = new Date();
    let startDate = new Date();

    switch (timeframe) {
      case "week":
        startDate.setDate(now.getDate() - 7);
        break;
      case "month":
        startDate.setMonth(now.getMonth() - 1);
        break;
      case "year":
        startDate.setFullYear(now.getFullYear() - 1);
        break;
    }

    const startDateISO = startDate.toISOString();

    // Get transactions within timeframe
    const { data, error } = await supabase
      .from("transaction_with_category_and_store")
      .select("*")
      .eq("user_id", userId)
      .gte("created_at", startDateISO)
      .order("created_at", { ascending: false });

    if (error || !data) throw error;

    // Create time-sensitive summary
    const summary: Document[] = [];

    // Total spending in timeframe
    const totalSpent = data
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const totalEarned = data
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    summary.push(
      new Document({
        pageContent: `In the past ${timeframe}, you spent $${totalSpent.toFixed(
          2
        )} and earned $${totalEarned.toFixed(2)}.`,
        metadata: { type: "time_summary", timeframe },
      })
    );

    // Top spending categories
    const categoriesTotal = data
      .filter((t) => t.type === "expense")
      .reduce((acc, { category_name, amount }) => {
        acc[category_name] = (acc[category_name] || 0) + Number(amount);
        return acc;
      }, {} as Record<string, number>);

    const topCategories = Object.entries(categoriesTotal)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    if (topCategories.length > 0) {
      let content = `Your top spending categories in the past ${timeframe} were:\n`;
      topCategories.forEach(([category, amount], idx) => {
        content += `${idx + 1}. ${category}: $${amount.toFixed(2)}\n`;
      });

      summary.push(
        new Document({
          pageContent: content,
          metadata: { type: "category_summary", timeframe },
        })
      );
    }

    return summary;
  }

  static async getPersonalizedStoreRecommendations(
    userId: string,
    coordinates: { latitude: number; longitude: number },
    mode: string = "walk",
    distance: string = "5",
    unit: string = "km"
  ) {
    // Get user's transaction history to understand preferences
    const { data: userTransactions } = await supabase
      .from("transaction_with_category_and_store")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(100);

    // Get frequently visited store types/categories
    const frequentCategories = userTransactions
      ?.filter((t) => t.type === "expense")
      .reduce((acc, { category_name }) => {
        acc[category_name] = (acc[category_name] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

    const topCategories = Object.keys(frequentCategories || {})
      .sort(
        (a, b) =>
          (frequentCategories?.[b] || 0) - (frequentCategories?.[a] || 0)
      )
      .slice(0, 5);

    // Find nearby stores
    const nearbyStores = await dataFormaterService.findStoresNearby(
      coordinates.latitude,
      coordinates.longitude,
      distance,
      unit
    );

    if (!nearbyStores?.length) {
      return [
        new Document({
          pageContent:
            "No stores found nearby for personalized recommendations.",
        }),
      ];
    }

    const storeIds = nearbyStores.map((store) => store.id);

    // Get item details from these stores
    const { data: storeItems } = await supabase
      .from("store_item_list")
      .select("*")
      .in("store_id", storeIds);

    // Get store details
    const { data: storeDetails } = await supabase
      .from("stores")
      .select("*")
      .in("id", storeIds);

    if (!storeItems?.length || !storeDetails?.length) {
      return [
        new Document({
          pageContent: "No store items found for personalized recommendations.",
        }),
      ];
    }

    // Calculate personalized recommendations
    const recommendedStores = storeDetails
      .map((store) => {
        const storeProducts = storeItems.filter(
          (item) => item.store_id === store.id
        );

        // Match store products with user's preferred categories
        const categoryMatches = storeProducts.filter((product) => {
          // Simple matching - could be enhanced with NLP or ML
          return topCategories.some((category) =>
            product.item.toLowerCase().includes(category.toLowerCase())
          );
        });

        return {
          store,
          matchScore: categoryMatches.length,
          matchedProducts: categoryMatches
        };
      })
      .filter((store) => store.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore)
      ; 

    // Format recommendations as documents
    return recommendedStores.map(({ store, matchedProducts }) => {
      let content = `Recommended store: ${store.name} in ${store.city} with lat ${store.latitude} and lon ${store.longitude}\n`;
      content += `This store may have items you're interested in based on your shopping history:\n`;

      matchedProducts.forEach((product) => {
        content += `- ${product.item} for $${product.price}\n`;
      });

      return new Document({
        pageContent: content,
        metadata: {
          type: "store_recommendation",
          storeId: store.id,
          latitude: store.latitude,
          longitude: store.longitude,
        },
      });
    });
  }

  // Add budget analysis with insights and warnings
  static async getBudgetAnalysisAndInsights(userId: string) {
    // Get user's budget limit
    const { data: budgetData } = await supabase
      .from("balance")
      .select("balance_limit, income")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(1);

    if (!budgetData?.length) {
      return [
        new Document({
          pageContent:
            "No budget information found. Consider setting a monthly budget limit.",
          metadata: { type: "budget_insight", insight_type: "missing_budget" },
        }),
      ];
    }

    const { balance_limit: budgetLimit, income } = budgetData[0];

    // Get current month's transactions
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const { data: currentMonthTransactions } = await supabase
      .from("transaction_with_category_and_store")
      .select("*")
      .eq("user_id", userId)
      .gte("created_at", startOfMonth.toISOString());

    if (!currentMonthTransactions?.length) {
      return [
        new Document({
          pageContent: `Your monthly budget is $${budgetLimit}. No transactions recorded yet this month.`,
          metadata: { type: "budget_insight", insight_type: "empty_month" },
        }),
      ];
    }

    // Calculate spending by category this month
    const categorySpending = currentMonthTransactions
      .filter((t) => t.type === "expense")
      .reduce((acc, { category_name, amount }) => {
        acc[category_name] = (acc[category_name] || 0) + Number(amount);
        return acc;
      }, {} as Record<string, number>);

    const totalSpent = Object.values(categorySpending).reduce(
      (sum, amount) => sum + amount,
      0
    );
    const remainingBudget = Number(budgetLimit) - totalSpent;
    const daysInMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0
    ).getDate();
    const dayOfMonth = new Date().getDate();
    const daysRemaining = daysInMonth - dayOfMonth;

    const documents: Document[] = [];

    // Budget summary
    let budgetSummary = `Monthly Budget: $${Number(budgetLimit).toFixed(2)}\n`;
    budgetSummary += `Spent so far: $${totalSpent.toFixed(2)} (${(
      (totalSpent / Number(budgetLimit)) *
      100
    ).toFixed(1)}%)\n`;
    budgetSummary += `Remaining: $${remainingBudget.toFixed(2)}\n`;
    budgetSummary += `Daily budget for rest of month: $${(
      remainingBudget / Math.max(1, daysRemaining)
    ).toFixed(2)}/day for ${daysRemaining} days`;

    documents.push(
      new Document({
        pageContent: budgetSummary,
        metadata: { type: "budget_insight", insight_type: "summary" },
      })
    );

    // Budget status and warnings
    if (remainingBudget < 0) {
      documents.push(
        new Document({
          pageContent: `⚠️ Budget Alert: You've exceeded your monthly budget by $${Math.abs(
            remainingBudget
          ).toFixed(2)}.`,
          metadata: {
            type: "budget_insight",
            insight_type: "over_budget",
            severity: "high",
          },
        })
      );
    } else if (remainingBudget / Number(budgetLimit) < 0.2) {
      documents.push(
        new Document({
          pageContent: `⚠️ Budget Warning: You've used ${(
            (totalSpent / Number(budgetLimit)) *
            100
          ).toFixed(
            1
          )}% of your monthly budget with ${daysRemaining} days remaining.`,
          metadata: {
            type: "budget_insight",
            insight_type: "approaching_limit",
            severity: "medium",
          },
        })
      );
    }

    // Spending pattern insights
    const avgDailySpend = totalSpent / dayOfMonth;
    const projectedMonthlySpend = avgDailySpend * daysInMonth;

    if (projectedMonthlySpend > Number(budgetLimit)) {
      documents.push(
        new Document({
          pageContent: `At your current rate of spending ($${avgDailySpend.toFixed(
            2
          )}/day), you're projected to spend $${projectedMonthlySpend.toFixed(
            2
          )} this month, which exceeds your budget by $${(
            projectedMonthlySpend - Number(budgetLimit)
          ).toFixed(2)}.`,
          metadata: {
            type: "budget_insight",
            insight_type: "projection_warning",
          },
        })
      );
    }

    // Top spending categories
    const topCategories = Object.entries(categorySpending)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    let categorySummary = "Top spending categories this month:\n";
    topCategories.forEach(([category, amount], idx) => {
      categorySummary += `${idx + 1}. ${category}: $${amount.toFixed(2)} (${(
        (amount / totalSpent) *
        100
      ).toFixed(1)}% of total)\n`;
    });

    documents.push(
      new Document({
        pageContent: categorySummary,
        metadata: {
          type: "budget_insight",
          insight_type: "category_breakdown",
        },
      })
    );

    return documents;
  }
  // Enhance goal tracking with progress analysis and recommendations
  static async getEnhancedGoalProgress(userId: string) {
    // Get user's goals with progress
    const { data: goals, error } = await supabase
      .from("goals_progress")
      .select("*")
      .eq("user_id", userId);

    if (error || !goals?.length) {
      return [
        new Document({
          pageContent:
            "No savings goals found. Consider setting up goals to track your financial progress.",
          metadata: { type: "goal_insight", insight_type: "no_goals" },
        }),
      ];
    }

    // Get deposits details for timeline analysis
    const goalIds = goals.map((goal) => goal.id);
    const { data: deposits } = await supabase
      .from("goals_deposite")
      .select("*")
      .in("goal_id", goalIds)
      .order("created_at", { ascending: false });

    const documents: Document[] = [];

    // Process each goal
    for (const goal of goals) {
      const goalDeposits = deposits?.filter((d) => d.goal_id === goal.id) || [];
      const progressPercentage =
        (goal.current_amount / goal.target_amount) * 100;

      // Calculate deadline information
      let timeInfo = "";
      let projectionInfo = "";

      if (goal.deadline) {
        const deadline = new Date(goal.deadline);
        const today = new Date();
        const daysRemaining = Math.ceil(
          (deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (daysRemaining < 0) {
          timeInfo = `This goal is overdue by ${Math.abs(daysRemaining)} days.`;
        } else {
          timeInfo = `${daysRemaining} days remaining until deadline.`;

          // Calculate required savings rate
          const amountRemaining = goal.target_amount - goal.current_amount;
          if (amountRemaining > 0 && daysRemaining > 0) {
            const dailyRequired = amountRemaining / daysRemaining;
            projectionInfo = `To reach this goal on time, you need to save $${dailyRequired.toFixed(
              2
            )} per day.`;
          }
        }
      }

      // Calculate recent deposit pattern
      let depositPattern = "";
      if (goalDeposits.length >= 2) {
        const sortedDeposits = [...goalDeposits].sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );

        const intervals = [];
        for (let i = 1; i < sortedDeposits.length; i++) {
          const daysDiff = Math.round(
            (new Date(sortedDeposits[i].created_at).getTime() -
              new Date(sortedDeposits[i - 1].created_at).getTime()) /
              (1000 * 60 * 60 * 24)
          );
          intervals.push(daysDiff);
        }

        const avgInterval =
          intervals.reduce((sum, days) => sum + days, 0) / intervals.length;
        const lastDepositDate = new Date(
          sortedDeposits[sortedDeposits.length - 1].created_at
        );
        const daysSinceLastDeposit = Math.round(
          (new Date().getTime() - lastDepositDate.getTime()) /
            (1000 * 60 * 60 * 24)
        );

        if (daysSinceLastDeposit > avgInterval * 1.5) {
          depositPattern = `Your last deposit was ${daysSinceLastDeposit} days ago, which is longer than your usual interval of ${Math.round(
            avgInterval
          )} days between deposits.`;
        }
      }

      // Create goal summary
      let summary = `🎯 Goal: ${goal.name}\n`;
      summary += `Progress: $${goal.current_amount.toFixed(
        2
      )} of $${goal.target_amount.toFixed(2)} (${progressPercentage.toFixed(
        1
      )}%)\n`;

      if (timeInfo) {
        summary += `${timeInfo}\n`;
      }

      if (projectionInfo) {
        summary += `${projectionInfo}\n`;
      }

      if (depositPattern) {
        summary += `${depositPattern}\n`;
      }

      // Add recommendations based on goal status
      if (progressPercentage < 10 && goalDeposits.length < 2) {
        summary += `Recommendation: Try setting up a small recurring deposit to build momentum toward this goal.`;
      } else if (progressPercentage >= 90) {
        summary += `Recommendation: You're very close to achieving this goal! Consider a final push to reach the target.`;
      } else if (goal.deadline && new Date(goal.deadline) < new Date()) {
        summary += `Recommendation: This goal is past its deadline. Consider revising the deadline or adjusting the target amount.`;
      }

      documents.push(
        new Document({
          pageContent: summary,
          metadata: {
            type: "goal_insight",
            goal_id: goal.id,
            goal_name: goal.name,
            progress_percentage: progressPercentage,
          },
        })
      );

      // Add recent deposit history if available
      if (goalDeposits.length > 0) {
        const recentDeposits = goalDeposits.slice(0, 3);
        let depositHistory = `Recent deposits for ${goal.name}:\n`;

        recentDeposits.forEach((deposit) => {
          depositHistory += `- $${deposit.amount.toFixed(2)} on ${new Date(
            deposit.created_at
          ).toLocaleDateString()} - "${deposit.title}"\n`;
        });

        documents.push(
          new Document({
            pageContent: depositHistory,
            metadata: {
              type: "goal_deposits",
              goal_id: goal.id,
              goal_name: goal.name,
            },
          })
        );
      }
    }

    return documents;
  }

  // Enhance location context with dynamic radius and relevance filtering
  static async getSmartLocationContext(
    userId: string,
    coordinates: { latitude: number; longitude: number },
    queryContext?: string
  ) {
    // Start with a small radius and expand if needed
    const radiusTiers = [ "5", "10", "20", "50", "100"];
    let stores: any[] = [];
    let usedRadius = "";
  
    // Try increasingly larger radiuses until we find enough stores or reach the maximum
    for (const radius of radiusTiers) {
      const nearbyStores = await dataFormaterService.findStoresNearby(
        coordinates.latitude,
        coordinates.longitude,
        radius,
        "km"
      );
  
      if (nearbyStores && nearbyStores.length >= 3) {
        stores = nearbyStores;
        usedRadius = radius;
        break;
      }
  
      if (nearbyStores && nearbyStores.length > 0) {
        stores = nearbyStores;
        usedRadius = radius;
      }
    }
  
    if (stores.length === 0) {
      return [
        new Document({
          pageContent:
            "No stores found in your vicinity. Try expanding your search radius.",
          metadata: { type: "location_context" },
        }),
      ];
    }
  
    const storeIds = stores.map((store) => store.id);
  
    // Get user's transaction history with these stores
    const { data: storeTransactions } = await supabase
      .from("transaction_with_category_and_store")
      .select("*")
      .eq("user_id", userId)
      .in("store_id", storeIds);
  
    // Get store details
    const { data: storeDetails } = await supabase
      .from("stores")
      .select("*")
      .in("id", storeIds);
  
    if (!storeDetails?.length) {
      return [
        new Document({
          pageContent: `Found ${stores.length} stores within ${usedRadius}km, but couldn't retrieve their details.`,
          metadata: { type: "location_context" },
        }),
      ];
    }
  
    // Extract item details from transaction details, titles, and descriptions
    // Create maps to store items and transaction notes per store
    const storeItemsMap: Record<string, any[]> = {};
    const storeNotesMap: Record<string, string[]> = {};
    
    if (storeTransactions?.length) {
      for (const transaction of storeTransactions) {
        if (transaction.store_id) {
          // Initialize store collections if needed
          if (!storeItemsMap[transaction.store_id]) {
            storeItemsMap[transaction.store_id] = [];
          }
          if (!storeNotesMap[transaction.store_id]) {
            storeNotesMap[transaction.store_id] = [];
          }
          
          // Process transaction title - could be an item name
          if (transaction.title) {
            // Add title as a potential item with the transaction amount as price
            // Only add if it's not already in the items list
            const existingItem = storeItemsMap[transaction.store_id].find(
              existing => existing.item === transaction.title
            );
            
            if (!existingItem) {
              storeItemsMap[transaction.store_id].push({
                item: transaction.title,
                price: transaction.amount || 0,
                store_id: transaction.store_id,
                source: 'title'
              });
            }
            
            // Also capture the transaction title as contextual information
            storeNotesMap[transaction.store_id].push(transaction.title);
          }
          
          // Process transaction description
          if (transaction.description) {
            // Capture the description as additional context
            storeNotesMap[transaction.store_id].push(transaction.description);
          }
          
          // Process the JSON details if it exists
          if (transaction.details) {
            try {
              const detailsItems = JSON.parse(transaction.details);
              
              // Add each item to the store's items collection
              if (Array.isArray(detailsItems)) {
                detailsItems.forEach(item => {
                  // Only add unique items
                  const existingItem = storeItemsMap[transaction.store_id].find(
                    existing => existing.item === item.name
                  );
                  
                  if (!existingItem) {
                    storeItemsMap[transaction.store_id].push({
                      item: item.name,
                      price: item.unitPrice,
                      quantity: item.quantity,
                      store_id: transaction.store_id,
                      source: 'details'
                    });
                  }
                });
              }
            } catch (e) {
              // Handle JSON parsing errors silently
              console.error(`Failed to parse transaction details for ID ${transaction.transaction_id}`);
              
              // If we can't parse JSON, still use the details string as a note
              if (typeof transaction.details === 'string') {
                storeNotesMap[transaction.store_id].push(transaction.details);
              }
            }
          }
        }
      }
    }
  
    // Calculate distances
    const locations = storeDetails.map((s) => [s.longitude, s.latitude]);
    locations.push([coordinates.longitude, coordinates.latitude]);
  
    const distanceData = await this.calculateDistance(
      locations,
      "foot-walking" // Default to walking distance
    );
  
    // Process and rank stores by relevance
    let rankedStores = storeDetails.map((store) => {
      // Find user's history with this store
      const storeHistory =
        storeTransactions?.filter((t) => t.store_id === store.id) || [];
      const visitCount = storeHistory.length;
      const totalSpent = storeHistory.reduce(
        (sum, t) => sum + Number(t.amount),
        0
      );
  
      // Get store's items from our processed map
      const items = storeItemsMap[store.id] || [];
      
      // Get store's transaction notes
      const notes = storeNotesMap[store.id] || [];
      
      // Get most frequent categories for this store
      const categoryFrequency: Record<string, number> = {};
      storeHistory.forEach(transaction => {
        if (transaction.category_name) {
          categoryFrequency[transaction.category_name] = 
            (categoryFrequency[transaction.category_name] || 0) + 1;
        }
      });
      
      // Sort categories by frequency
      const topCategories = Object.entries(categoryFrequency)
        .sort((a, b) => b[1] - a[1])
        .map(entry => entry[0])
        .slice(0, 3); // Top 3 categories
  
      // Find distance data
      const storeIndex = storeDetails.findIndex((s) => s.id === store.id);
      const userIndex = locations.length - 1; // User is the last one in the locations array
      const distance =
        distanceData?.data?.distances?.[storeIndex]?.[userIndex] || null;
      const duration =
        distanceData?.data?.durations?.[storeIndex]?.[userIndex] || null;
  
      // Calculate relevance score
      // More visits, more spent, closer distance = higher relevance
      let relevanceScore = 0;
  
      if (visitCount > 0) relevanceScore += Math.min(visitCount * 10, 50); // Max 50 points for visits
      if (totalSpent > 0) relevanceScore += Math.min(totalSpent / 10, 30); // Max 30 points for spending
  
      // Distance factor - closer = higher score (max 20 points)
      if (distance != null) {
        const distanceKm = distance / 1000;
        relevanceScore += Math.max(0, 20 - distanceKm * 4); // Lose 4 points per km
      }
  
      return {
        store,
        items,
        notes,
        topCategories,
        visitCount,
        totalSpent,
        distance: distance != null ? distance / 1000 : null, // Convert to km
        duration: duration != null ? duration / 60 : null, // Convert to minutes
        relevanceScore,
      };
    });
  
    // Sort by relevance score, then apply query context if available
    rankedStores = rankedStores.sort(
      (a, b) => b.relevanceScore - a.relevanceScore
    );
  
    // If we have query context, refine further
    if (queryContext) {
      const keywords = queryContext.toLowerCase().split(/\s+/);
  
      // Boost scores for stores with matching items, notes, categories, etc.
      rankedStores = rankedStores
        .map((storeData) => {
          const store = storeData.store;
          const items = storeData.items;
          const notes = storeData.notes || [];
          const categories = storeData.topCategories || [];
  
          // Check if store name matches keywords
          const nameMatchScore = keywords.reduce(
            (score, keyword) =>
              score + (store.name.toLowerCase().includes(keyword) ? 5 : 0),
            0
          );
  
          // Check if items match keywords
          const itemMatchScore = items.reduce((score, item) => {
            const matches = keywords.reduce(
              (count, keyword) =>
                count + (item.item.toLowerCase().includes(keyword) ? 1 : 0),
              0
            );
            return score + (matches > 0 ? 3 * matches : 0);
          }, 0);
          
          // Check if notes/titles match keywords
          const notesMatchScore = notes.reduce((score, note) => {
            const matches = keywords.reduce(
              (count, keyword) =>
                count + (note.toLowerCase().includes(keyword) ? 1 : 0),
              0
            );
            return score + (matches > 0 ? 2 * matches : 0);
          }, 0);
          
          // Check if categories match keywords
          const categoryMatchScore = categories.reduce((score, category) => {
            const matches = keywords.reduce(
              (count, keyword) =>
                count + (category.toLowerCase().includes(keyword) ? 1 : 0),
              0
            );
            return score + (matches > 0 ? 4 * matches : 0);
          }, 0);
  
          return {
            ...storeData,
            relevanceScore:
              storeData.relevanceScore + nameMatchScore + itemMatchScore + notesMatchScore + categoryMatchScore,
          };
        })
        .sort((a, b) => b.relevanceScore - a.relevanceScore);
    }
  
    // Take top stores
    const topStores = rankedStores.slice(0, 5);
  
    // Create documents
    const documents: Document[] = [];
  
    // Add raw data document with all information for AI processing
    documents.push(
      new Document({
        pageContent: `Location context data for ${stores.length} stores within ${usedRadius}km radius of coordinates (${coordinates.latitude}, ${coordinates.longitude}).`,
        metadata: { 
          type: "location_data_raw",
          user_id: userId,
          user_coordinates: coordinates,
          radius: usedRadius,
          store_count: stores.length,
          stores: rankedStores.map(storeData => ({
            id: storeData.store.id,
            name: storeData.store.name,
            city: storeData.store.city,
            country: storeData.store.country,
            latitude: storeData.store.latitude,
            longitude: storeData.store.longitude,
            distance_km: storeData.distance,
            walk_minutes: storeData.duration,
            visit_count: storeData.visitCount,
            total_spent: storeData.totalSpent,
            relevance_score: storeData.relevanceScore,
            categories: storeData.topCategories || [],
            items: storeData.items.map(item => ({
              name: item.item,
              price: item.price
            })),
            notes: storeData.notes || []
          }))
        },
      })
    );
  
    // Add overall summary
    documents.push(
      new Document({
        pageContent: `Found ${stores.length} stores within ${usedRadius}km of your location. Here are the most relevant options:`,
        metadata: { 
          type: "location_summary",
          radius: usedRadius,
          store_count: stores.length,
          user_coordinates: coordinates,
        },
      })
    );
  
    // Add individual store information
    for (const storeData of topStores) {
      const { store, items, notes, topCategories, visitCount, totalSpent, distance, duration } =
        storeData;
  
      let storeInfo = `🏪 ${store.name} (${store.city})\n`;
  
      if (distance != null) {
        storeInfo += `Distance: ${distance.toFixed(2)}km`;
  
        if (duration != null) {
          storeInfo += ` (${duration.toFixed(1)} min walk)\n`;
        } else {
          storeInfo += `\n`;
        }
      }
  
      if (visitCount > 0) {
        storeInfo += `You've visited ${visitCount} times and spent ${totalSpent.toFixed(
          2
        )} here.\n`;
        
        // Include top spending categories if available
        if (topCategories && topCategories.length > 0) {
          storeInfo += `Most common categories: ${topCategories.join(', ')}\n`;
        }
      }
  
      // Include some representative items from the store
      if (items.length > 0) {
        const displayItems = items; // Display up to 3 items
        storeInfo += `Popular items at this store:\n`;
        displayItems.forEach((item) => {
          storeInfo += `- ${item.item} for ${item.price}\n`;
        });
  
        if (items.length > 3) {
          storeInfo += `And ${items.length - 3} more items...\n`;
        }
      }
      
      // Include a sample of transaction notes/titles if available
      if (notes && notes.length > 0) {
        // Get up to 3 unique notes
        const uniqueNotes = Array.from(new Set(notes)).slice(0, 3);
        if (uniqueNotes.length > 0) {
          storeInfo += `Your notes about this store include: "${uniqueNotes.join('", "')}".\n`;
        }
      }
  
      documents.push(
        new Document({
          pageContent: storeInfo,
          metadata: {
            type: "store_context",
            store_id: store.id,
            latitude: store.latitude,
            longitude: store.longitude,
            relevance_score: storeData.relevanceScore,
            categories: topCategories || [],
            item_count: items.length,
            visit_count: visitCount,
            total_spent: totalSpent,
          },
        })
      );
    }
  
    return documents;
  }
  // Main enhanced context builder that adapts to the user's query
  static async getEnhancedContext(
    userId: string,
    coordinates: { latitude: number; longitude: number },
    query: string = "",
    options: {
      includeNearbyStores?: boolean;
      includeTransactions?: boolean;
      includeGoals?: boolean;
      includeBudget?: boolean;
      timeframe?: "week" | "month" | "year";
      maxDocuments?: number;
    } = {}
  ) {
    // Set defaults
    const {
      includeNearbyStores = true,
      includeTransactions = true,
      includeGoals = true,
      includeBudget = true,
      timeframe = "month",
      maxDocuments = 20,
    } = options;

    // Analyze query to determine context importance
    const query_lower = query.toLowerCase();

    // Define keyword groups for different types of queries
    const locationKeywords = [
      "nearby",
      "close",
      "around",
      "nearest",
      "store",
      "shop",
      "restaurant",
      "distance",
      "far",
      "walk",
      "drive",
    ];
    const budgetKeywords = [
      "budget",
      "limit",
      "spend",
      "spent",
      "spending",
      "expense",
      "expenses",
      "balance",
      "money",
      "afford",
      "remaining",
    ];
    const goalKeywords = [
      "goal",
      "target",
      "saving",
      "savings",
      "save",
      "progress",
      "achieve",
      "deposit",
    ];
    const transactionKeywords = [
      "buy",
      "bought",
      "purchase",
      "transaction",
      "spent",
      "cost",
      "paid",
      "payment",
      "history",
    ];

    // Calculate relevance scores
    const locationScore = locationKeywords.reduce(
      (score, keyword) => score + (query_lower.includes(keyword) ? 1 : 0),
      0
    );

    const budgetScore = budgetKeywords.reduce(
      (score, keyword) => score + (query_lower.includes(keyword) ? 1 : 0),
      0
    );

    const goalScore = goalKeywords.reduce(
      (score, keyword) => score + (query_lower.includes(keyword) ? 1 : 0),
      0
    );

    const transactionScore = transactionKeywords.reduce(
      (score, keyword) => score + (query_lower.includes(keyword) ? 1 : 0),
      0
    );

    // Collect all documents
    const allDocuments: Document[] = [];

    // Add user identification context
    const { data: userData } = await supabase
      .from("users")
      .select("username, full_name")
      .eq("id", userId)
      .single();

    if (userData) {
      allDocuments.push(
        new Document({
          pageContent: `You are assisting ${
            userData.full_name || userData.username
          } with their financial management.`,
          metadata: { type: "user_context", priority: 10 },
        })
      );
    }

    // Always include summary of recent activity
    const recentSummary = await this.getTimeSensitiveUserSummary(
      userId,
      timeframe
    );
    allDocuments.push(
      ...recentSummary.map((doc) => ({
        ...doc,
        metadata: { ...doc.metadata, priority: 9 },
      }))
    );

    // Add budget context if relevant
    if (includeBudget || budgetScore > 0) {
      const budgetDocs = await this.getBudgetAnalysisAndInsights(userId);
      allDocuments.push(
        ...budgetDocs.map((doc) => ({
          ...doc,
          metadata: { ...doc.metadata, priority: budgetScore > 0 ? 8 : 6 },
        }))
      );
    }

    // Add goals context if relevant
    if (includeGoals || goalScore > 0) {
      const goalDocs = await this.getEnhancedGoalProgress(userId);
      allDocuments.push(
        ...goalDocs.map((doc) => ({
          ...doc,
          metadata: { ...doc.metadata, priority: goalScore > 0 ? 8 : 5 },
        }))
      );
    }

    // Add transaction context if relevant
    if (includeTransactions || transactionScore > 0) {
      const transactions = await this.getRelevantTransactions(
        userId,
        query,
        10
      );

      if (transactions.length > 0) {
        let transactionContent = "Recent relevant transactions:\n";
        transactions.forEach((t) => {
          transactionContent += `- ${t.title} for $${t.amount} (${
            t.category_name
          }) on ${new Date(t.created_at).toLocaleDateString()}\n`;
        });

        allDocuments.push(
          new Document({
            pageContent: transactionContent,
            metadata: {
              type: "transaction_context",
              priority: transactionScore > 0 ? 7 : 4,
            },
          })
        );
      }
    }

    // Add location context if relevant
    if (includeNearbyStores || locationScore > 0) {
      const locationDocs = await this.getSmartLocationContext(
        userId,
        coordinates,
        query
      );
      allDocuments.push(
        ...locationDocs.map((doc) => ({
          ...doc,
          metadata: { ...doc.metadata, priority: locationScore > 0 ? 8 : 3 },
        }))
      );

      // Add personalized recommendations if location is important
      if (locationScore > 0) {
        const recommendationDocs =
          await this.getPersonalizedStoreRecommendations(userId, coordinates);
        allDocuments.push(
          ...recommendationDocs.map((doc) => ({
            ...doc,
            metadata: { ...doc.metadata, priority: 7 },
          }))
        );
      }
    }

    // Sort by priority and limit
    const sortedDocuments = allDocuments
      .sort((a, b) => (b.metadata?.priority || 0) - (a.metadata?.priority || 0))
      .slice(0, maxDocuments);

    return sortedDocuments;
  }
  // Update the main API function with better error handling and options
  static async getContext(
    userId: string,
    coordinates: { latitude: number; longitude: number },
    options: {
      query?: string;
      mode?: string;
      distance?: string;
      unit?: string;
      timeframe?: "week" | "month" | "year";
      includeNearbyStores?: boolean;
      includeTransactions?: boolean;
      includeGoals?: boolean;
      includeBudget?: boolean;
      maxDocuments?: number;
    } = {}
  ) {
    try {
      // Set defaults
      const {
        query = "",
        mode = "walk",
        distance = "5",
        unit = "km",
        timeframe = "month",
        includeNearbyStores = true,
        includeTransactions = true,
        includeGoals = true,
        includeBudget = true,
        maxDocuments = 20,
      } = options;

      // Validate inputs
      if (!userId) {
        return [
          new Document({
            pageContent: "Error: User ID is required for context generation.",
            metadata: { type: "error", error_code: "missing_user_id" },
          }),
        ];
      }

      if (
        !coordinates ||
        typeof coordinates.latitude !== "number" ||
        typeof coordinates.longitude !== "number"
      ) {
        return [
          new Document({
            pageContent:
              "Error: Valid coordinates are required for location-based context.",
            metadata: { type: "error", error_code: "invalid_coordinates" },
          }),
        ];
      }

      // Check if user exists
      const { data: userCheck, error: userError } = await supabase
        .from("users")
        .select("id")
        .eq("id", userId)
        .single();

      if (userError || !userCheck) {
        return [
          new Document({
            pageContent: "Error: User not found.",
            metadata: { type: "error", error_code: "user_not_found" },
          }),
        ];
      }

      // Use the enhanced context builder
      return await this.getEnhancedContext(userId, coordinates, query, {
        includeNearbyStores,
        includeTransactions,
        includeGoals,
        includeBudget,
        timeframe,
        maxDocuments,
      });
    } catch (error) {
      console.error("Error in context generation:", error);

      // Create a meaningful error document
      let errorMessage = "An error occurred while generating context.";

      if (error instanceof Error) {
        errorMessage = `Error: ${error.message}`;
      }

      return [
        new Document({
          pageContent: errorMessage,
          metadata: { type: "error", error_code: "context_generation_failure" },
        }),
      ];
    }
  }

  // Add a utility function to estimate token count
  static estimateTokenCount(text: string): number {
    // Rough estimation: average English word is about 4.7 characters
    // GPT tokenizers typically use ~4 characters per token
    return Math.ceil(text.length / 4);
  }

  // Add a function to optimize context for token limits
  static optimizeContextForTokenLimit(
    documents: Document[],
    maxTokens: number = 3000
  ): Document[] {
    let totalTokens = 0;
    const optimizedDocs: Document[] = [];

    // First pass: add high priority documents
    for (const doc of documents) {
      const priority = doc.metadata?.priority || 0;
      const tokens = this.estimateTokenCount(doc.pageContent);

      // Add high priority docs first (priority >= 7)
      if (priority >= 7 && totalTokens + tokens <= maxTokens) {
        optimizedDocs.push(doc);
        totalTokens += tokens;
      }
    }

    // Second pass: add medium priority documents
    if (totalTokens < maxTokens) {
      for (const doc of documents) {
        const priority = doc.metadata?.priority || 0;
        const tokens = this.estimateTokenCount(doc.pageContent);

        if (
          priority >= 4 &&
          priority < 7 &&
          totalTokens + tokens <= maxTokens &&
          !optimizedDocs.includes(doc)
        ) {
          optimizedDocs.push(doc);
          totalTokens += tokens;
        }
      }
    }

    // Third pass: add remaining documents until we hit the limit
    if (totalTokens < maxTokens) {
      for (const doc of documents) {
        const tokens = this.estimateTokenCount(doc.pageContent);

        if (totalTokens + tokens <= maxTokens && !optimizedDocs.includes(doc)) {
          optimizedDocs.push(doc);
          totalTokens += tokens;
        }
      }
    }

    return optimizedDocs;
  }
}

export default dataFormaterService;
