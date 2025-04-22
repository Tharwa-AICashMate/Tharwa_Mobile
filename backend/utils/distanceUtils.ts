// في ملف utils/distanceUtils.ts
import axios from 'axios';
import { calculateHaversineDistance } from './haversine';

export const getDistance = async (
  origin: { lat: number; lng: number },
  destination: { lat: number; lng: number }
): Promise<number> => {
  try {
    // محاولة استخدام OpenRouteService أولاً
    const response = await axios.post(
      'https://api.openrouteservice.org/v2/directions/driving-car',
      {
        coordinates: [
          [origin.lng, origin.lat],
          [destination.lng, destination.lat]
        ]
      },
      {
        headers: {
          'Authorization': process.env.OPENROUTE_API_KEY,
          'Content-Type': 'application/json'
        },
        timeout: 3000 // timeout بعد 3 ثواني
      }
    );

    const data = response.data as { routes: { distance: number }[] };
    return data.routes?.[0]?.distance / 1000; // تحويل إلى كيلومترات
  } catch (error) {
    console.warn('API failed, using Haversine fallback:', error);
    // استخدام الحساب المحلي كبديل
    return calculateHaversineDistance(
      origin.lat,
      origin.lng,
      destination.lat,
      destination.lng
    );
  }
};