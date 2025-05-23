import axios from 'axios';
import { FAQItem, SupportChannel } from '../types';
import { apiBase } from '@/utils/axiosInstance';

const BASE_URL = apiBase;
// const BASE_URL = 'http://localhost:5000';

export const fetchFAQs = async (category: 'general' | 'account' | 'services') => {
  if (category === 'general') {
    const response = await axios.get(`${BASE_URL}/faqs`);
    return response.data;
  } else {
    const response = await axios.get(`${BASE_URL}/faqs?category=${category}`);
    return response.data;
  }
};

export const fetchSupportChannels = async (): Promise<SupportChannel[]> => {
  try {
    const response = await fetch(`${BASE_URL}/supportChannels`);
    return await response.json();
  } catch (error) {
    console.log('Error fetching support channels:', error);
    return [];
  }
};