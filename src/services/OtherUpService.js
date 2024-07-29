import { $AdminApi, $UserApi } from "../http/index.js";
import config from "../config.js";

const OTHER_UP_API_URL = config.SERVER_API + "/OtherUp";

export default class OtherUpService {
   constructor($api = $AdminApi) {
      this.createOtherUp = async (value) => {
         const res = await $api.post(OTHER_UP_API_URL + "/create", value);
         return res;
      };
   }
}
