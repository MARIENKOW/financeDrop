import { $AdminApi, $UserApi } from "../http/index.js";
import config from "../config.js";
import axios from "axios";

export default class SiteService {
   static async getData() {
      const res = await axios.get(config.SERVER_API + "/getData");
      return res;
   }
   static async changeWallet(data) {
      const res = await $AdminApi.post(config.SERVER_API + "/wallet",data);
      return res;
   }
   static async changeReferralPercent(data) {
      const res = await $AdminApi.post(config.SERVER_API + "/referral-percent",data);
      return res;
   }
   static async changeCashOutPercent(data) {
      const res = await $AdminApi.post(config.SERVER_API + "/cash-out-percent",data);
      return res;
   }
}
