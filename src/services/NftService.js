import { $AdminApi, $UserApi } from "../http/index.js";
import { ADMIN_API_URL } from "../http/index.js";
import config from "../config.js";

const NFT_API_URL = config.SERVER_API + "/Nft";

export default class NftService {
   constructor($api = $UserApi) {
      this.createNft = async (value)=> {
         const res = await $api.post(NFT_API_URL + "/create", value, {
            headers: { "Content-Type": "multipart/form-data" },
         });
         return res;
      }
      this.getNftNotSold = async() =>{
         const res = await $api.get(NFT_API_URL + "/getNotSold");
         return res;
      }
   
      this.updateNft = async (id, value)=> {
         const res = await $api.post(NFT_API_URL + "/update/" + id, value, {
            headers: { "Content-Type": "multipart/form-data" },
         });
         return res;
      }
      this.deleteNft = async (id) =>{
         const res = await $api.delete(NFT_API_URL + "/" + id);
         return res;
      }
      this.getNftById = async (id) => {
         const res = await $api.get(NFT_API_URL + "/" + id);
         return res;
      };
      this.sendNft = async (data,id) => {
         const res = await $api.post(NFT_API_URL + "/sendNft/" + id,data);
         return res;
      };
   }

}
