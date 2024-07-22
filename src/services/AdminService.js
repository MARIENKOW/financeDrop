import { $AdminApi } from "../http/index.js";
import { ADMIN_API_URL } from "../http/index.js";

export default class AdminService {
   static async signIn(value) {
      const res = await $AdminApi.post(ADMIN_API_URL+"/signIn", value);
      return res;
   }
   static async logOut() {
      const rez = await $AdminApi.post(ADMIN_API_URL+"/logOut");
      return rez;
   }
   static async refresh() {
      return await $AdminApi.post(ADMIN_API_URL+"/refresh");
   }
   static async aboutAdmin() {
      const ans = await $AdminApi.get(ADMIN_API_URL+"/aboutAdmin");
      return ans;
   }
}
