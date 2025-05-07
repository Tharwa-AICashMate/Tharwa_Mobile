// import { Document } from "langchain/document";
// import { createClient } from '@supabase/supabase-js';
// import dotenv from 'dotenv';

// dotenv.config();

// const supabaseUrl = process.env.SUPABASE_URL;
// const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// if (!supabaseUrl || !supabaseAnonKey) {
//   throw new Error('Missing Supabase environment variables');
// }

// const supabase = createClient(supabaseUrl, supabaseAnonKey);
//  async function findStoresNearby(
//     lat,
//     lon,
//     radius,
//     unit
//   ) {
//     const { data, error } = await supabase
//       .rpc("find_stores_nearby", {
//         user_lat: lat,
//         user_lon: lon,
//         radius,
//         unit,
//       })
//       .select("id");

//     if (error) {
//       console.log("Error fetching nearby stores:", error);
//       throw error;
//     }

//     return data;
//   }
// async function getSmartLocationContext(
//     userId,
//     coordinates,
//     queryContext  ) {
//     // Start with a small radius and expand if needed
//     const radiusTiers = ["5", "10", "20", "50", "100"];
//     let stores = [];
//     let usedRadius = "";

//     // Try increasingly larger radiuses until we find enough stores or reach the maximum
//     for (const radius of radiusTiers) {
//       const nearbyStores = await findStoresNearby(
//         coordinates.latitude,
//         coordinates.longitude,
//         radius,
//         "km"
//       );

//       if (nearbyStores && nearbyStores.length >= 3) {
//         stores = nearbyStores;
//         usedRadius = radius;
//         break;
//       }

//       if (nearbyStores && nearbyStores.length > 0) {
//         stores = nearbyStores;
//         usedRadius = radius;
//       }
//     }

//     if (stores.length === 0) {
//       return [
//         new Document({
//           pageContent:
//             "No stores found in your vicinity. Try expanding your search radius.",
//           metadata: { type: "location_context" },
//         }),
//       ];
//     }

//     const storeIds = stores.map((store) => store.id);

//     // Get user's transaction history with these stores
//     const { data: storeTransactions } = await supabase
//       .from("transaction_with_category_and_store")
//       .select("*")
//       .in("store_id", storeIds);

//     // Get store details
//     const { data: storeDetails } = await supabase
//       .from("stores")
//       .select("*")
//       .in("id", storeIds);

//     if (!storeDetails?.length) {
//       return [
//         new Document({
//           pageContent: `Found ${stores.length} stores within ${usedRadius}km, but couldn't retrieve their details.`,
//           metadata: { type: "location_context" },
//         }),
//       ];
//     }

//     // Extract item details from transaction details, titles, and descriptions
//     // Create maps to store items and transaction notes per store
//     const storeItemsMap = {};
//     const storeNotesMap = {};
//     console.log(storeTransactions);
//     if (storeTransactions?.length) {
//       for (const transaction of storeTransactions) {
//         console.log(transaction);
//         if (transaction.store_id) {
//           // Initialize store collections if needed
//           if (!storeItemsMap[transaction.store_id]) {
//             storeItemsMap[transaction.store_id] = [];
//           }
//           if (!storeNotesMap[transaction.store_id]) {
//             storeNotesMap[transaction.store_id] = [];
//           }

//           // Process transaction title - could be an item name
//           if (transaction.title) {
//             // Add title as a potential item with the transaction amount as price
//             // Only add if it's not already in the items list
//             const existingItem = storeItemsMap[transaction.store_id].find(
//               (existing) => existing.item === transaction.title
//             );

//             if (!existingItem) {
//               storeItemsMap[transaction.store_id].push({
//                 item: transaction.title,
//                 price: transaction.amount || 0,
//                 store_id: transaction.store_id,
//                 source: "title",
//               });
//             }

//             // Also capture the transaction title as contextual information
//             storeNotesMap[transaction.store_id].push(transaction.title);
//           }

//           // Process transaction description
//           if (transaction.description) {
//             // Capture the description as additional context
//             storeNotesMap[transaction.store_id].push(transaction.description);
//           }

//           // Process the JSON details if it exists
//           if (transaction.details) {
//             try {
//               const detailsItems = JSON.parse(transaction.details);

//               // Add each item to the store's items collection
//               if (Array.isArray(detailsItems)) {
//                 detailsItems.forEach((item) => {
//                   // Only add unique items
//                   const existingItem = storeItemsMap[transaction.store_id].find(
//                     (existing) => existing.item === item.name
//                   );

//                   if (!existingItem) {
//                     storeItemsMap[transaction.store_id].push({
//                       item: item.name,
//                       price: item.unitPrice,
//                       quantity: item.quantity,
//                       store_id: transaction.store_id,
//                       source: "details",
//                     });
//                   }
//                 });
//               }
//             } catch (e) {
//               // Handle JSON parsing errors silently
//               console.error(
//                 `Failed to parse transaction details for ID ${transaction.transaction_id}`
//               );

//               // If we can't parse JSON, still use the details string as a note
//               if (typeof transaction.details === "string") {
//                 storeNotesMap[transaction.store_id].push(transaction.details);
//               }
//             }
//           }
//         }
//       }
//     }

//     // Calculate distances
//     const locations = storeDetails.map((s) => [s.longitude, s.latitude]);
//     locations.push([coordinates.longitude, coordinates.latitude]);

   
//     // Process and rank stores by relevance
//     let rankedStores = storeDetails.map((store) => {
//       // Find user's history with this store
//       const storeHistory =
//         storeTransactions?.filter((t) => t.store_id === store.id) || [];
//       const visitCount = storeHistory.length;
//       const totalSpent = storeHistory.reduce(
//         (sum, t) => sum + Number(t.amount),
//         0
//       );

//       // Get store's items from our processed map
//       const items = storeItemsMap[store.id] || [];

//       // Get store's transaction notes
//       const notes = storeNotesMap[store.id] || [];

//       // Get most frequent categories for this store
//       const categoryFrequency = {};
//       storeHistory.forEach((transaction) => {
//         if (transaction.category_name) {
//           categoryFrequency[transaction.category_name] =
//             (categoryFrequency[transaction.category_name] || 0) + 1;
//         }
//       });

//       // Sort categories by frequency
//       const topCategories = Object.entries(categoryFrequency)
//         .sort((a, b) => b[1] - a[1])
//         .map((entry) => entry[0])
//         .slice(0, 3); // Top 3 categories

//       // Find distance data
//       const storeIndex = storeDetails.findIndex((s) => s.id === store.id);
//       const userIndex = locations.length - 1; // User is the last one in the locations array
   

//       // Calculate relevance score
//       // More visits, more spent, closer distance = higher relevance
//       let relevanceScore = 0;

//       if (visitCount > 0) relevanceScore += Math.min(visitCount * 10, 50); // Max 50 points for visits
//       if (totalSpent > 0) relevanceScore += Math.min(totalSpent / 10, 30); // Max 30 points for spending

//       // Distance factor - closer = higher score (max 20 points)
    

//       return {
//         store,
//         items,
//         notes,
//         topCategories,
//         visitCount,
//         totalSpent,
//         relevanceScore,
//       };
//     });

//     // Sort by relevance score, then apply query context if available
//     rankedStores = rankedStores.sort(
//       (a, b) => b.relevanceScore - a.relevanceScore
//     );

//     // If we have query context, refine further
//     if (queryContext) {
//       const keywords = queryContext.toLowerCase().split(/\s+/);

//       // Boost scores for stores with matching items, notes, categories, etc.
//       rankedStores = rankedStores
//         .map((storeData) => {
//           const store = storeData.store;
//           const items = storeData.items;
//           const notes = storeData.notes || [];
//           const categories = storeData.topCategories || [];

//           // Check if store name matches keywords
//           const nameMatchScore = keywords.reduce(
//             (score, keyword) =>
//               score + (store.name.toLowerCase().includes(keyword) ? 5 : 0),
//             0
//           );

//           // Check if items match keywords
//           const itemMatchScore = items.reduce((score, item) => {
//             const matches = keywords.reduce(
//               (count, keyword) =>
//                 count + (item.item.toLowerCase().includes(keyword) ? 1 : 0),
//               0
//             );
//             return score + (matches > 0 ? 3 * matches : 0);
//           }, 0);

//           // Check if notes/titles match keywords
//           const notesMatchScore = notes.reduce((score, note) => {
//             const matches = keywords.reduce(
//               (count, keyword) =>
//                 count + (note.toLowerCase().includes(keyword) ? 1 : 0),
//               0
//             );
//             return score + (matches > 0 ? 2 * matches : 0);
//           }, 0);

//           // Check if categories match keywords
//           const categoryMatchScore = categories.reduce((score, category) => {
//             const matches = keywords.reduce(
//               (count, keyword) =>
//                 count + (category.toLowerCase().includes(keyword) ? 1 : 0),
//               0
//             );
//             return score + (matches > 0 ? 4 * matches : 0);
//           }, 0);

//           return {
//             ...storeData,
//             relevanceScore:
//               storeData.relevanceScore +
//               nameMatchScore +
//               itemMatchScore +
//               notesMatchScore +
//               categoryMatchScore,
//           };
//         })
//         .sort((a, b) => b.relevanceScore - a.relevanceScore);
//     }

//     // Take top stores
//     const topStores = rankedStores.slice(0, 5);

//     // Create documents
//     const documents= [];

//     // Add raw data document with all information for AI processing
//     documents.push(
//       new Document({
//         pageContent: `Location context data for ${stores.length} stores within ${usedRadius}km radius of coordinates (${coordinates.latitude}, ${coordinates.longitude}).`,
//         metadata: {
//           type: "location_data_raw",
//           user_id: userId,
//           user_coordinates: coordinates,
//           radius: usedRadius,
//           store_count: stores.length,
//           stores: rankedStores.map((storeData) => ({
//             id: storeData.store.id,
//             name: storeData.store.name,
//             city: storeData.store.city,
//             country: storeData.store.country,
//             latitude: storeData.store.latitude,
//             longitude: storeData.store.longitude,
//             visit_count: storeData.visitCount,
//             total_spent: storeData.totalSpent,
//             relevance_score: storeData.relevanceScore,
//             categories: storeData.topCategories || [],
//             items: storeData.items.map((item) => ({
//               name: item.item,
//               price: item.price,
//             })),
//             notes: storeData.notes || [],
//           })),
//         },
//       })
//     );

//     // Add overall summary
//     documents.push(
//       new Document({
//         pageContent: `Found ${stores.length} stores within ${usedRadius}km of your location. Here are the most relevant options:`,
//         metadata: {
//           type: "location_summary",
//           radius: usedRadius,
//           store_count: stores.length,
//           user_coordinates: coordinates,
//         },
//       })
//     );

//     // Add individual store information
//     for (const storeData of topStores) {
//       const {
//         store,
//         items,
//         notes,
//         topCategories,
//         visitCount,
//         totalSpent,
//         distance,
//         duration,
//       } = storeData;

//       let storeInfo = `🏪 ${store.name} (${store.city})\n`;

//       if (distance != null) {
//         storeInfo += `Distance: ${distance.toFixed(2)}km`;

//         if (duration != null) {
//           storeInfo += ` (${duration.toFixed(1)} min walk)\n`;
//         } else {
//           storeInfo += `\n`;
//         }
//       }

//       if (visitCount > 0) {
//         storeInfo += `You've visited ${visitCount} times and spent ${totalSpent.toFixed(
//           2
//         )} here.\n`;

//         // Include top spending categories if available
//         if (topCategories && topCategories.length > 0) {
//           storeInfo += `Most common categories: ${topCategories.join(", ")}\n`;
//         }
//       }

//       // Include some representative items from the store
//       if (items.length > 0) {
//         const displayItems = items; // Display up to 3 items
//         storeInfo += `Popular items at this store:\n`;
//         displayItems.forEach((item) => {
//           storeInfo += `- ${item.item} for ${item.price}\n`;
//         });

//         if (items.length > 3) {
//           storeInfo += `And ${items.length - 3} more items...\n`;
//         }
//       }

//       // Include a sample of transaction notes/titles if available
//       if (notes && notes.length > 0) {
//         // Get up to 3 unique notes
//         const uniqueNotes = Array.from(new Set(notes)).slice(0, 3);
//         if (uniqueNotes.length > 0) {
//           storeInfo += `Your notes about this store include: "${uniqueNotes.join(
//             '", "'
//           )}".\n`;
//         }
//       }

//       documents.push(
//         new Document({
//           pageContent: storeInfo,
//           metadata: {
//             type: "store_context",
//             store_id: store.id,
//             latitude: store.latitude,
//             longitude: store.longitude,
//             relevance_score: storeData.relevanceScore,
//             categories: topCategories || [],
//             item_count: items.length,
//             visit_count: visitCount,
//             total_spent: totalSpent,
//           },
//         })
//       );
//     }

//     return documents;
//   }

//  console.log(await getSmartLocationContext(
//    '01c31c2e-b66c-41a7-ae89-d717b',
//   { latitude: 31.034285, longitude: 31.3756848 },
//  ) )


///////////////////////////-
// import axios from "axios";
// import fetch from "node-fetch";
// import plusCode from "pluscodes";
// const ORS_API_KEY = "5b3ce3597851110001cf6248d9ea8df6671a4be282ac4dc4d333108b";


// async function expandShortUrl(shortUrl){
//   try {
//     const response = await fetch(shortUrl, {
//       method: "HEAD",
//       redirect: "follow",
//     });
//     if (!response.ok)
//       throw new Error(`Failed to expand URL: ${response.statusText}`);
//     return response.url;
//   } catch (error) {
//     console.error("Error expanding short URL:", error);
//     throw new Error("Invalid or inaccessible short URL.");
//   }
// }



// function extractLocationData(url) {
//   if (!url) return;

//   // Try to extract name from /place/NAME
//   const nameMatch = url.match(/\/place\/([^/]+)/);
//   const baseName = nameMatch
//     ? decodeURIComponent(nameMatch[1].replace(/\+/g, " "))
//     : undefined;

//   // 1. /place/...!3dLAT!4dLNG
//   const coordMatch14 = url.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/);
//   if (coordMatch14) {
//     return {
//       name: baseName,
//       latitude: parseFloat(coordMatch14[1]),
//       longitude: parseFloat(coordMatch14[2]),
//     };
//   }

//   // 2. /place/NAME/@LAT,LNG,...
//   const placeAtMatch = url.match(/\/place\/([^/]+)\/@(-?\d+\.\d+),(-?\d+\.\d+)/);
//   if (placeAtMatch) {
//     return {
//       name: decodeURIComponent(placeAtMatch[1].replace(/\+/g, " ")),
//       latitude: parseFloat(placeAtMatch[2]),
//       longitude: parseFloat(placeAtMatch[3]),
//     };
//   }

//   // 3. /search/NAME@LAT,LNG
//   const searchMatch = url.match(/\/search\/([^/]+)[+@](-?\d+\.\d+),(-?\d+\.\d+)/);
//   if (searchMatch) {
//     return {
//       name: decodeURIComponent(searchMatch[1].replace(/\+/g, " ")),
//       latitude: parseFloat(searchMatch[2]),
//       longitude: parseFloat(searchMatch[3]),
//     };
//   }

//   // 4. @LAT,LNG (maps/@LAT,LNG)
//   const atMatch = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
//   if (atMatch) {
//     return {
//       name: baseName,
//       latitude: parseFloat(atMatch[1]),
//       longitude: parseFloat(atMatch[2]),
//     };
//   }

//   // 5. q=LAT,LNG
//   const qCoordMatch = url.match(/[?&]q=(-?\d+\.\d+),(-?\d+\.\d+)/);
//   if (qCoordMatch) {
//     return {
//       name: baseName,
//       latitude: parseFloat(qCoordMatch[1]),
//       longitude: parseFloat(qCoordMatch[2]),
//     };
//   }

//   // 6. q=PLACE (if not coordinates)
//   const qNameMatch = url.match(/[?&]q=([^&]+)/);
//   if (qNameMatch && !qNameMatch[1].match(/^-?\d+\.\d+,-?\d+\.\d+$/)) {
//     const decodedName = decodeURIComponent(qNameMatch[1].replace(/\+/g, " "));
//     return {
//       name: decodedName,
//       latitude: NaN,
//       longitude: NaN,
//     };
//   }

//   // 7. destination=LAT,LNG
//   const destMatch = url.match(/[?&]destination=(-?\d+\.\d+),(-?\d+\.\d+)/);
//   if (destMatch) {
//     return {
//       name: baseName,
//       latitude: parseFloat(destMatch[1]),
//       longitude: parseFloat(destMatch[2]),
//     };
//   }

//   // 8. Generic LAT,LNG (no clear context)
//   const coordOnlyMatch = url.match(/([-+]?\d+\.\d+),\s*([-+]?\d+\.\d+)/);
//   if (coordOnlyMatch) {
//     return {
//       name: baseName,
//       latitude: parseFloat(coordOnlyMatch[1]),
//       longitude: parseFloat(coordOnlyMatch[2]),
//     };
//   }

//   // 9. Embed URL (pb=!2dLNG!3dLAT)
//   const pbMatch = url.match(/!2d(-?\d+\.\d+)!3d(-?\d+\.\d+)/);
//   if (pbMatch) {
//     return {
//       name: baseName,
//       latitude: parseFloat(pbMatch[2]),
//       longitude: parseFloat(pbMatch[1]),
//     };
//   }

//   // 10. Place with coords in name: /place/LAT,LNG
//   const latLngNameMatch = url.match(/\/place\/(-?\d+\.\d+),\s*(-?\d+\.\d+)/);
//   if (latLngNameMatch) {
//     return {
//       latitude: parseFloat(latLngNameMatch[1]),
//       longitude: parseFloat(latLngNameMatch[2]),
//     };
//   }

//   return undefined;
// }


// async function reverseGeocode(
//   lat,
//   lon,
//   title
// ) {
//   try {
//     const response = await axios.get(
//       `https://api.openrouteservice.org/geocode/reverse?api_key=${ORS_API_KEY}&point.lon=${lon}&point.lat=${lat}`
//     );

//     const features = (response.data).features;
//     if (!features || features.length === 0) {
//       throw new Error("No location results found.");
//     }

//     const places = extractPlaceDetails(features);
//     const address = features[0]?.properties;

//     if (title && address) {
//       places.unshift({
//         name: title,
//         latitude: lat,
//         longitude: lon,
//         city: address.county || null,
//         country: address.country || null,
//       });
//     }

//     return places;
//   } catch (error) {
//     console.error("Reverse geocoding failed:", error);
//     throw new Error("Could not fetch location details.");
//   }
// }

// function extractPlaceDetails(features){
//   return features.map((feature) => {
//     const { properties, geometry } = feature;
//     return {
//       name: properties.name || properties.label || "Unnamed",
//       latitude: geometry.coordinates[1],
//       longitude: geometry.coordinates[0],
//       city: properties.county || null,
//       country: properties.country || null,
//     };
//   });
// }

// export async function getStoreFromUrl(
//   url
// ) {
//   if (!url || typeof url !== "string") {
//     throw new Error("Invalid URL input.");
//   }

//   try {
//     const fullUrl = await expandShortUrl(url);
//     console.log(fullUrl)
//     const data = extractLocationData(fullUrl);
//     console.log(data)
//     if (!data || isNaN(data.latitude) || isNaN(data.longitude)) {
//       throw new Error("Unable to extract coordinates from the URL.");
//     }

//     return// await reverseGeocode(data.latitude, data.longitude, data.name);
//   } catch (error) {
//     console.error("getStoreFromUrl error:", error);
//     return undefined;
//   }
// }
// getStoreFromUrl("https://maps.app.goo.gl/VTTu8YnZUwZv9dhm8")