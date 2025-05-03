import { apiBase } from '@/utils/axiosInstance';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${apiBase}/api`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// إضافة معالج للاستجابة
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // تم استلام استجابة من الخادم مع رمز حالة غير 2xx
      console.log('خطأ في الاستجابة:', error.response.status, error.response.data);
    } else if (error.request) {
      // تم إجراء الطلب ولكن لم يتم استلام استجابة
      console.log('لم يتم استلام استجابة من الخادم:', error.request);
    } else {
      // حدث خطأ أثناء إعداد الطلب
      console.log('خطأ في إعداد الطلب:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance; 