import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Utiliser votre URL d'API
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  // Récupérer le token du localStorage ou sessionStorage
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Ajouter le token à l'en-tête Authorization
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
