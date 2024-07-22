import { makeAutoObservable } from "mobx";
import userService from "../services/UserService";

class User {
   isAuth = null;
   token = null;
   user = {};
   isLoading = false;
   constructor() {
      makeAutoObservable(this);
   }
   setAuth(value) {
      this.isAuth = value;
   }
   setUser(value) {
      this.user = value;
   }
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
         if (e?.response?.status === 500) return setTimeout(this.aboutUser, 5000);
         this.setUnauthorized();
         this.setIsLoading(false);
      }
   };
}

export default User;
