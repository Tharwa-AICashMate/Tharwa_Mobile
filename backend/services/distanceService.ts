
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

interface OpenRouteServiceResponse {
  routes: Array<{
    summary: {
      distance: number;
      duration?: number;
    };
    geometry?: string;
  }>;
  metadata?: {
    engine: {
      version: string;
    };
  };
}

export const getDrivingDistance = async (
  start: [number, number],
  end: [number, number]
): Promise<number> => {
  try {
    const response = await axios({
      url: "https://api.openrouteservice.org/v2/directions/driving-car",
      method: "POST",
      headers: {
        Authorization: process.env.OPENROUTE_API_KEY!,
        "Content-Type": "application/json",
      },
      data: {
        coordinates: [start, end],
        instructions: false,
      },
    });

    const data = response.data as unknown as OpenRouteServiceResponse;

    if (!data.routes?.[0]?.summary?.distance) {
      throw new Error("Invalid response structure");
    }

    return data.routes[0].summary.distance / 1000;
  } catch (error) {
    console.error("Error:", error instanceof Error ? error.message : "Unknown error");
    throw new Error("Failed to fetch distance");
  }
};