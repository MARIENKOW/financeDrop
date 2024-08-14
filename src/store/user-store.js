import { makeAutoObservable } from "mobx";
import userService from "../services/UserService";

class User {
   isAuth = null;
   token = null;
   user = {};
   isLoading = true;
   constructor() {
      makeAutoObservable(this);
   }
   setAuth = (value) => {
      this.isAuth = value;
   };
   setUser = (value) => {
      this.user = value;
   };
   setUnauthorized = () => {
      this.setUser({});
      this.setAuth(false);
      this.setToken(null);
      localStorage.removeItem("accessToken");
   };
   setIsLoading = (value) => {
      this.isLoading = value;
   };
   setToken = (value) => {
      this.token = value;
   };

   signInUser = async (value) => {
      const { data } = await userService.signIn(value);
      this.setAuth(true);
      this.setUser(data.user);
      this.setToken(data.accessToken);
      localStorage.setItem("accessToken", this.token);
   };
   deleteImg = async () => {
      const { data } = await userService.deleteImg();
      this.setUser(data);
   };
   createImg = async (value) => {
      const { data } = await userService.createImg(value);
      this.setUser(data);
   };
   updateName = async (value) => {
      const { data } = await userService.updateName(value);
      this.setUser(data);
   };
   updateAddressMatic = async (value) => {
      const { data } = await userService.updateAddressMatic(value);
      this.setUser(data);
   };
   updateUsername = async (value) => {
      const { data } = await userService.updateUsername(value);
      this.setUser(data);
   };
   logOut = async () => {
      try {
         await userService.logOut();
      } finally {
         this.setUnauthorized();
      }
   };

   aboutUser = async () => {
      try {
         this.setIsLoading(true);
         const accessToken = localStorage.getItem("accessToken");
         if (!accessToken) throw { response: { status: 401 } };
         const { data } = await userService.aboutUser();
         this.setUser(data);
         this.setAuth(true);
         this.setToken(accessToken);
         this.setIsLoading(false);
      } catch (e) {
         console.log(e);
         if (e?.response?.status === 401) {
            this.setUnauthorized();
            return this.setIsLoading(false);
         }
         setTimeout(this.aboutUser, 5000);
      }
   };
}

export default User;
