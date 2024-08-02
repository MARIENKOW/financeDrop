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
}

export default Site;
