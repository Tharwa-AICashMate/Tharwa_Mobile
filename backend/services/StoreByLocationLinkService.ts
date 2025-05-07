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
    if (!response.ok)
      throw new Error(`Failed to expand URL: ${response.statusText}`);
    return response.url;
  } catch (error) {
    console.error("Error expanding short URL:", error);
    throw new Error("Invalid or inaccessible short URL.");
  }
}

interface LocationData {
  name?: string;
  latitude: number;
  longitude: number;
}

function extractLocationData(url: string): LocationData | undefined {
  if (!url) return;

  // Try to extract name from /place/NAME
  const nameMatch = url.match(/\/place\/([^/]+)/);
  const baseName = nameMatch
    ? decodeURIComponent(nameMatch[1].replace(/\+/g, " "))
    : undefined;

  // 1. /place/...!3dLAT!4dLNG
  const coordMatch14 = url.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/);
  if (coordMatch14) {
    return {
      name: baseName,
      latitude: parseFloat(coordMatch14[1]),
      longitude: parseFloat(coordMatch14[2]),
    };
  }

  // 2. /place/NAME/@LAT,LNG,...
  const placeAtMatch = url.match(/\/place\/([^/]+)\/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (placeAtMatch) {
    return {
      name: decodeURIComponent(placeAtMatch[1].replace(/\+/g, " ")),
      latitude: parseFloat(placeAtMatch[2]),
      longitude: parseFloat(placeAtMatch[3]),
    };
  }

  // 3. /search/NAME@LAT,LNG
  const searchMatch = url.match(/\/search\/([^/]+)[+@](-?\d+\.\d+),(-?\d+\.\d+)/);
  if (searchMatch) {
    return {
      name: decodeURIComponent(searchMatch[1].replace(/\+/g, " ")),
      latitude: parseFloat(searchMatch[2]),
      longitude: parseFloat(searchMatch[3]),
    };
  }

  // 4. @LAT,LNG (maps/@LAT,LNG)
  const atMatch = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (atMatch) {
    return {
      name: baseName,
      latitude: parseFloat(atMatch[1]),
      longitude: parseFloat(atMatch[2]),
    };
  }

  // 5. q=LAT,LNG
  const qCoordMatch = url.match(/[?&]q=(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (qCoordMatch) {
    return {
      name: baseName,
      latitude: parseFloat(qCoordMatch[1]),
      longitude: parseFloat(qCoordMatch[2]),
    };
  }

  // 6. q=PLACE (if not coordinates)
  const qNameMatch = url.match(/[?&]q=([^&]+)/);
  if (qNameMatch && !qNameMatch[1].match(/^-?\d+\.\d+,-?\d+\.\d+$/)) {
    const decodedName = decodeURIComponent(qNameMatch[1].replace(/\+/g, " "));
    return {
      name: decodedName,
      latitude: NaN,
      longitude: NaN,
    };
  }

  // 7. destination=LAT,LNG
  const destMatch = url.match(/[?&]destination=(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (destMatch) {
    return {
      name: baseName,
      latitude: parseFloat(destMatch[1]),
      longitude: parseFloat(destMatch[2]),
    };
  }

  // 8. Generic LAT,LNG (no clear context)
  const coordOnlyMatch = url.match(/([-+]?\d+\.\d+),\s*([-+]?\d+\.\d+)/);
  if (coordOnlyMatch) {
    return {
      name: baseName,
      latitude: parseFloat(coordOnlyMatch[1]),
      longitude: parseFloat(coordOnlyMatch[2]),
    };
  }

  // 9. Embed URL (pb=!2dLNG!3dLAT)
  const pbMatch = url.match(/!2d(-?\d+\.\d+)!3d(-?\d+\.\d+)/);
  if (pbMatch) {
    return {
      name: baseName,
      latitude: parseFloat(pbMatch[2]),
      longitude: parseFloat(pbMatch[1]),
    };
  }

  // 10. Place with coords in name: /place/LAT,LNG
  const latLngNameMatch = url.match(/\/place\/(-?\d+\.\d+),\s*(-?\d+\.\d+)/);
  if (latLngNameMatch) {
    return {
      latitude: parseFloat(latLngNameMatch[1]),
      longitude: parseFloat(latLngNameMatch[2]),
    };
  }

  return undefined;
}


async function reverseGeocode(
  lat: number,
  lon: number,
  title?: string
): Promise<Place[]> {
  try {
    const response = await axios.get(
      `https://api.openrouteservice.org/geocode/reverse?api_key=${ORS_API_KEY}&point.lon=${lon}&point.lat=${lat}`
    );

    const features = (response.data as { features: any }).features;
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

export async function getStoreFromUrl(
  url: string
): Promise<Place[] | undefined> {
  if (!url || typeof url !== "string") {
    throw new Error("Invalid URL input.");
  }

  try {
    const fullUrl = await expandShortUrl(url);
    const data = extractLocationData(fullUrl);
    if (!data || isNaN(data.latitude) || isNaN(data.longitude)) {
      console.log("Unable to extract coordinates from the URL.")
      throw new Error("Unable to extract coordinates from the URL.");
    }

    return await reverseGeocode(data.latitude, data.longitude, data.name);
  } catch (error) {
    console.error("getStoreFromUrl error:", error);
    return undefined;
  }
}
