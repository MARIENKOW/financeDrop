import { $AdminApi, $UserApi } from "../http/index.js";
import config from "../config.js";
import axios from "axios";

export default class SiteService {
   static async getData() {
      const res = await axios.get(config.SERVER_API + "/getData");
      return res;
   }
}
