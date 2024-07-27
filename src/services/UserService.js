import { $AdminApi, $UserApi, USER_API_URL } from "../http/index.js";

export default class UserService {
   static async signIn(value) {
      const res = await $UserApi.post(USER_API_URL+"/signIn", value);
      return res;
   }
   static async signUp(value) {
      const ans = await $UserApi.post(USER_API_URL+"/signUp", value);
      return ans;
   }
   static async rememberPassword(value) {
      const ans = await $UserApi.post(USER_API_URL+"/rememberPassword", value);
      return ans;
   }
   static async logOut() {
      const rez = await $UserApi.post(USER_API_URL+"/logOut");
      return rez;
   }
   static async refresh() {
      return await $UserApi.post(USER_API_URL+"/refresh");
   }
   static async checkAuthUser() {
      if (!localStorage.getItem("accessToken")) return { status: 401 };
      const response = await $UserApi.get(USER_API_URL+"/checkAuthUser");
      return response;
   }
   static async checkChangePassLink(value) {
      const response = await $UserApi.post(USER_API_URL+"/checkChangePassLink", value);
      return response;
   }
   static async activate(value) {
      const response = await $UserApi.post(USER_API_URL+"/activate", value);
      return response;
   }
   static async aboutUser() {
      const ans = await $UserApi.get(USER_API_URL+"/aboutUser");
      return ans;
   }
   static async changePassword(value) {
      const ans = await $UserApi.post(USER_API_URL+"/changePass", value);
      return ans;
   }
   static async getAll() {
      const ans = await $AdminApi.get(USER_API_URL+"/getAll");
      return ans;
   }
   static async getById(id) {
      const ans = await $AdminApi.get(USER_API_URL+'/'+id);
      return ans;
   }
}
