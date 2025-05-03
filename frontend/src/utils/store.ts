import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { UserLocation } from '../types/store';

interface LocationHook {
  location: UserLocation | null;
  loading: boolean;
  error: string | null;
  refreshLocation: () => Promise<void>;
}

export const useLocation = (): LocationHook => {
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getLocation = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        setLoading(false);
        return;
      }
      
      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    } catch (err) {
      setError('Could not fetch location');
      console.log('Error getting location:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return {
    location,
    loading,
    error,
    refreshLocation: getLocation,
  };
};