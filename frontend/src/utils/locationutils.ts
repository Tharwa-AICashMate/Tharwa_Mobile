import axios from 'axios';
import * as Location from 'expo-location';

const ORS_API_KEY = '5b3ce3597851110001cf6248f38ae8dea5244702abb8b73a56c15a69';

  
export const calculateDistance = async (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): Promise<number> => {
  try {
    const response = await axios.post(
      'https://api.openrouteservice.org/v2/directions/driving-car',
      {
        coordinates: [[lon1, lat1], [lon2, lat2]],
      },
      {
        headers: {
          Authorization: ORS_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    const distanceInMeters = response.data.routes[0].summary.distance;
    const distanceInKm = distanceInMeters / 1000;

    return distanceInKm;
  } catch (error) {
    console.error('Error fetching distance:', error);
    return Number.MAX_VALUE; // قيمة كبيرة عشان يستبعد المتجر
  }
};
  const deg2rad = (deg: number): number => {
    return deg * (Math.PI / 180);
  };
  
  export const getCurrentLocation = async (): Promise<{
    latitude: number;
    longitude: number;
  }> => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        throw new Error('Permission to access location was denied');
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
    } catch (error) {
      console.error('Error getting location:', error);
      throw error;
    }
  };
  
  export const isWithinSearchRadius = async (
    storeLat: number,
    storeLng: number,
    userLat: number,
    userLng: number,
    radiusKm: number
  ): Promise<boolean> => {
    const distance = await calculateDistance(userLat, userLng, storeLat, storeLng);
    return distance <= radiusKm;
  };