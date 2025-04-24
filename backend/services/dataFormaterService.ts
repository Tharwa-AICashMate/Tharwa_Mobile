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
      console.error("Error fetching distance:", error);
    }
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
      console.error("Error fetching nearby stores:", error);
      throw error;
    }

    return data;
  }
  static async getUserDataSummery(userId: string, type = "user") {
    const { data, error } = await supabase
      .from("transaction_with_category_and_store")
      .select("*")
      .eq("user_id", userId);

    if (error || !data) throw error;

    const summary: Document[] = [];

    // Category totals
    const categoriesTotal = data.reduce((acc, { category_name, amount }) => {
      acc[category_name] = (acc[category_name] || 0) + Number(amount);
      return acc;
    }, {} as Record<string, number>);

    let content = "";
    for (const key in categoriesTotal) {
      content += `The ${type} spent ${categoriesTotal[key]} on ${key}.\n`;
    }
    summary.push(new Document({ pageContent: content }));

    // Store date totals
    const storeDateTotal = data.reduce(
      (acc, { store_name, created_at, amount }) => {
        if (!store_name) return acc;
        const date = new Date(created_at).toLocaleDateString();
        const key = `${store_name} on ${date}`;
        acc[key] = (acc[key] || 0) + Number(amount);
        return acc;
      },
      {} as Record<string, number>
    );

    content = "";
    for (const key in storeDateTotal) {
      content += `The ${type} spent ${storeDateTotal[key].toFixed(
        2
      )} at ${key}.\n`;
    }
    summary.push(new Document({ pageContent: content }));

    // Individual transactions
    content = data
      .map(({ title, type, created_at, amount }) => {
        const date = new Date(created_at).toISOString().split("T")[0];
        return `The ${type} ${
          type === "expenses" ? "bought" : "got"
        } ${title} for ${amount} at ${date}.`;
      })
      .join("\n");

    summary.push(new Document({ pageContent: content }));

    // Net total
    const netTotal = data.reduce(
      (acc, { type, amount }) =>
        type === "expenses" ? acc - Number(amount) : acc + Number(amount),
      0
    );

    summary.push(
      new Document({
        pageContent: `The ${type} has a total ${
          netTotal >= 0 ? "revenue" : "spending"
        } of ${Math.abs(netTotal)}.`,
        metadata: { createdAt: new Date().toISOString() },
      })
    );

    return summary;
  }

  static async getNearbyStoresSummary(
    coordinates: {
      latitude: number;
      longitude: number;
    },
    mode: string,
    distance: string,
    unit: string
  ) {
    const nearbyStores = await dataFormaterService.findStoresNearby(
      coordinates.latitude,
      coordinates.longitude,
      distance,
      unit
    );
    const storeIds = nearbyStores?.map((store) => store.id);

    const { data, error } = await supabase
      .from("store_item_list")
      .select("*")
      .in("store_id", storeIds);

    if (error) return [];

    const storeMenus: string[] = data.reduce(
      (acc, { store, city, item, price, created_at }) => {
        acc[store] = acc[store] || `In ${city}, store ${store} sells:\n`;
        acc[store] += `- ${item} for $${price}, recorded at ${created_at.substr(
          0,
          10
        )}\n`;
        return acc;
      },
      {} as Record<string, string>
    );

    const docs = Object.values(storeMenus).map(
      (pageContent) => new Document({ pageContent })
    );

    const { data: stores } = await supabase
      .from("stores")
      .select("*")
      .in("id", storeIds);

    docs.push(
      new Document({
        pageContent: stores?.reduce((acc, store) => {
          return (acc += JSON.stringify(store) + "\n");
        }),
      })
    );
    const locations = stores?.map((s) => [s.longitude, s.latitude]) || [];
    const distanceData = await this.calculateDistance(
      [...locations, [coordinates.longitude, coordinates.latitude]],
      mode == "walk" ? "foot-walking" : "driving-car"
    );
    if (stores?.length)
      docs.push(
        dataFormaterService.formatMatrixResult(distanceData?.data, [
          ...stores.map((s) => s.name),
          "user",
        ])
      );
    else docs.push(new Document({ pageContent: "No stores recorded nearby." }));

    return docs;
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

  static async getUserGoalsWithDeposits(userId: string) {
    const { data: goals, error } = await supabase
      .from("goals")
      .select(
        "id, name, target_amount, deposits:goals_deposite (amount, title, message, created_at)"
      )
      .eq("user_id", userId);

    if (error) return [];

    return goals.map((goal) => {
      const total = goal.deposits
        .reduce((sum, d) => sum + Number(d.amount), 0)
        .toFixed(2);
      const lines = goal.deposits
        .map(
          (d) =>
            `a deposit of ${d.amount} was added at ${new Date(
              d.created_at
            ).toLocaleDateString()}`
        )
        .join("\n");
      return new Document({
        pageContent: `${goal.name} goal is about ${total} in total\n${lines}`,
      });
    });
  }

  static async getUserBudgetLimit(userId: string) {
    const { data, error } = await supabase
      .from("balance")
      .select("balance_limit")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(1);

    if (error || !data?.length) {
      return new Document({
        pageContent: `the user didn't set a budget limit`,
      });
    }

    return new Document({
      pageContent: `current user monthly budget limit is ${data[0].balance_limit}`,
    });
  }

  static async getContext(
    userId: string,
    coordinates: { latitude: number; longitude: number },
    mode: string = "walk",
    distance: string = "5",
    unit: string = "km"
  ) {
    const allUsers = await supabase.from("users").select("id");
    const docs: Document[] = [];

    let i = 0;
    for (const user of allUsers.data!) {
      i++;
      docs.push(
        ...(await this.getUserDataSummery(
          user.id,
          user.id === userId ? "I" : `another user ${i}`
        ))
      );
    }

    docs.push(
      ...(await dataFormaterService.getNearbyStoresSummary(
        coordinates,
        mode,
        distance,
        unit
      ))
    );
    docs.push(...(await dataFormaterService.getUserGoalsWithDeposits(userId)));
    docs.push(await dataFormaterService.getUserBudgetLimit(userId));

    return docs;
  }
}

export default dataFormaterService;
