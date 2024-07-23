import { $AdminApi } from "../http/index.js";
import { ADMIN_API_URL } from "../http/index.js";
import config from "../config.js";

const NFT_API_URL = config.SERVER_API+"/Nft"

export default class NftService {
   static async create(value) {
      const res = await $AdminApi.post(NFT_API_URL+"/create", value,{headers: { "Content-Type": "multipart/form-data" }});
      return res;
   }
   static async getNotSold() {
      const res = await $AdminApi.get(NFT_API_URL+"/getNotSold");
      return res;
   }
   static async getById(id) {
      const res = await $AdminApi.get(NFT_API_URL+"/"+id);
      return res;
   }
   static async update(id,value) {
      const res = await $AdminApi.post(NFT_API_URL+"/update/"+id, value,{headers: { "Content-Type": "multipart/form-data" }});
      return res;
   }
   static async delete(id) {
      const res = await $AdminApi.delete(NFT_API_URL+"/"+id);
      return res;
   }
}
