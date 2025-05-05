import axios from "axios";
import fetch from "node-fetch";

const ORS_API_KEY = "5b3ce3597851110001cf6248d9ea8df6671a4be282ac4dc4d333108b";

interface LocationData {
  name?: string;
  latitude: number;
  longitude: number;
}

interface Place {
  name: string;
  latitude: number;
  longitude: number;
  city?: string | null;
  country?: string | null;
}

async function expandShortUrl(shortUrl: string): Promise<string> {
  try {
    const response = await fetch(shortUrl, {
      method: "HEAD",
      redirect: "follow",
    });
    if (!response.ok) throw new Error(`Failed to expand URL: ${response.statusText}`);
    return response.url;
  } catch (error) {
    console.error("Error expanding short URL:", error);
    throw new Error("Invalid or inaccessible short URL.");
  }
}

function extractLocationData(url: string): LocationData | undefined {
  if (!url) return;

  const placeMatch = url.match(/\/place\/([^/]+)\/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (placeMatch) {
    return {
      name: decodeURIComponent(placeMatch[1]),
      latitude: parseFloat(placeMatch[2]),
      longitude: parseFloat(placeMatch[3]),
    };
  }

  const searchMatch = url.match(/\/search\/([^/]+)[+@]?(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (searchMatch) {
    return {
      name: decodeURIComponent(searchMatch[1]),
      latitude: parseFloat(searchMatch[2]),
      longitude: parseFloat(searchMatch[3]),
    };
  }

  const coordMatch = url.match(/([-+]?\d+\.\d+),\s*([-+]?\d+\.\d+)/);
  if (coordMatch) {
    return {
      latitude: parseFloat(coordMatch[1]),
      longitude: parseFloat(coordMatch[2]),
    };
  }

  return undefined;
}

async function reverseGeocode(lat: number, lon: number, title?: string): Promise<Place[]> {
  try {
    const response = await axios.get(
      `https://api.openrouteservice.org/geocode/reverse?api_key=${ORS_API_KEY}&point.lon=${lon}&point.lat=${lat}`
    );

    const features = response.data?.features;
    if (!features || features.length === 0) {
      throw new Error("No location results found.");
    }

    const places = extractPlaceDetails(features);
    const address = features[0]?.properties;

    if (title && address) {
      places.unshift({
        name: title,
        latitude: lat,
        longitude: lon,
        city: address.county || null,
        country: address.country || null,
      });
    }

    return places;
  } catch (error) {
    console.error("Reverse geocoding failed:", error);
    throw new Error("Could not fetch location details.");
  }
}

function extractPlaceDetails(features: any[]): Place[] {
  return features.map((feature) => {
    const { properties, geometry } = feature;
    return {
      name: properties.name || properties.label || "Unnamed",
      latitude: geometry.coordinates[1],
      longitude: geometry.coordinates[0],
      city: properties.county || null,
      country: properties.country || null,
    };
  });
}

export async function getStoreFromUrl(url: string): Promise<Place[] | undefined> {
  if (!url || typeof url !== "string") {
    throw new Error("Invalid URL input.");
  }

  try {
    const fullUrl = await expandShortUrl(url);
    const data = extractLocationData(fullUrl);
    if (!data || isNaN(data.latitude) || isNaN(data.longitude)) {
      throw new Error("Unable to extract coordinates from the URL.");
    }

    return await reverseGeocode(data.latitude, data.longitude, data.name);
  } catch (error) {
    console.error("getStoreFromUrl error:", error);
    return undefined;
  }
}
