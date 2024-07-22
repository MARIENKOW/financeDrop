import { store } from "../User";
import { adminStore } from "../Admin";
import axios from "axios";
import config from "../config";
export const USER_API_URL = config.SERVER_API + "/User";
export const ADMIN_API_URL = config.SERVER_API + "/Admin";

export const $UserApi = axios.create({
   baseURL: config.SERVER_API,
   withCredentials: true,
   headers: {
      "Content-Type": "application/json",
   },
});

$UserApi.interceptors.request.use((config) => {
   config.headers.Authorization = `Bearer ${localStorage.getItem(
      "accessToken"
   )}`;
   return config;
});

$UserApi.interceptors.response.use(
   (config) => config,
   async (err) => {
      const originalRequest = err.config;
      if (err?.response?.status === 401 && err.config && !err.config._isRetry) {
         originalRequest._isRetry = true;
         try {
            const response = await axios.get(`${USER_API_URL}/refresh`, {
               withCredentials: true,
            });
            localStorage.setItem("accessToken", response.data);
            return await $UserApi.request(originalRequest);
         } catch (e) {
            if (e?.response?.status === 401) store.setUnauthorized()
            throw e;
         }
      }
      throw err;
   }
);

export const $AdminApi = axios.create({
   baseURL: config.SERVER_API,
   withCredentials: true,
   headers: {
      "Content-Type": "application/json",
   },
});

$AdminApi.interceptors.request.use((config) => {
   config.headers.Authorization = `Bearer ${localStorage.getItem(
      "accessTokenAdmin"
   )}`;
   return config;
});

$AdminApi.interceptors.response.use(
   (config) => config,
   async (err) => {
      const originalRequest = err.config;
      if (err?.response?.status === 401 && err.config && !err.config._isRetry) {
         originalRequest._isRetry = true;
         try {
            const response = await axios.get(`${ADMIN_API_URL}/refresh`, {
               withCredentials: true,
            });
            localStorage.setItem("accessTokenAdmin", response.data);
            return await $AdminApi.request(originalRequest);
         } catch (e) {
            if (e?.response?.status === 401) adminStore.setUnauthorized()
            throw e;
         }
      }
      throw err;
   }
);
