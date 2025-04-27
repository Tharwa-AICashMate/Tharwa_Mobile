import axios from 'axios';

const axiosInstance = axios.create({
<<<<<<< HEAD
  baseURL: "http://192.168.1.4:3000/api",
=======
  baseURL: "http://localhost:3000/store",
>>>>>>> 0aae993ffeb24265690a2e2e8393590110f6dfed
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
      console.error('خطأ في الاستجابة:', error.response.status, error.response.data);
    } else if (error.request) {
      // تم إجراء الطلب ولكن لم يتم استلام استجابة
      console.error('لم يتم استلام استجابة من الخادم:', error.request);
    } else {
      // حدث خطأ أثناء إعداد الطلب
      console.error('خطأ في إعداد الطلب:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance; 