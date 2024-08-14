import { makeAutoObservable } from "mobx";
import userService from "../services/UserService";
import SiteService from "../services/SiteService";

class Site {
   data = {};
   isLoading = true;
   constructor() {
      makeAutoObservable(this);
   }
   setData = (value) => {
      this.data = value;
   };
   setIsLoading = (value) => {
      this.isLoading = value;
   };
   getData = async () => {
      try {
         console.log('sss');
         this.setIsLoading(true);
         const { data } = await SiteService.getData();
         this.setData(data);
         this.setIsLoading(false);
      } catch (e) {
         console.log(e);
         setTimeout(this.getData, 5000);
      }
   };
   changeWallet = async (value) =>{
      const {data} =await SiteService.changeWallet(value)
      console.log(data);
      this.setData(data)
   }
   changeReferralPercent = async (value) =>{
      const {data} = await SiteService.changeReferralPercent(value)
      this.setData(data)
   }
   changeCashOutPercent = async (value) =>{
      const {data} = await SiteService.changeCashOutPercent(value)
      this.setData(data)
   }
}

export default Site;
