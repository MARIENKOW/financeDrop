import { store } from '../index';
import axios from 'axios';
import config from '../config';
export const API_URL = config.SERVER_API+'/User';


const $UserApi = axios.create({
   baseURL: API_URL,
   withCredentials: true,
   headers: {
      'Content-Type': 'application/json'
   }
})

$UserApi.interceptors.request.use((config) => {
   config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
   return config;
})

$UserApi.interceptors.response.use(config => config, async err => {
   const originalRequest = err.config;
   if (err?.response?.status === 401 && err.config && !err.config._isRetry) {
      originalRequest._isRetry = true
      try {
         const response = await axios.get(`${API_URL}/User/refresh`, { withCredentials: true })
         localStorage.setItem('accessToken', response.data);
         return await $UserApi.request(originalRequest)
      } catch (e) {
         store.setUnauthorized()
         throw e
      }
   }
   throw err
})

export default $UserApi;