import axios from 'axios';
import { FAQItem, SupportChannel } from '../types';
import { API_BASE_URL } from '../config/api';

const BASE_URL = API_BASE_URL;
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
    console.error('Error fetching support channels:', error);
    return [];
  }
};