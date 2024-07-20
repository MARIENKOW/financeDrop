import { $AdminApi } from "../http/index.js";

export default class AdminService {
   static async signIn(value) {
      const res = await $AdminApi.post("/signIn", value);
      return res;
   }
   static async logOut() {
      const rez = await $AdminApi.post("/logOut");
      return rez;
   }
   static async refresh() {
      return await $AdminApi.post("/refresh");
   }
   static async aboutAdmin() {
      const ans = await $AdminApi.get("/aboutAdmin");
      return ans;
   }
}
