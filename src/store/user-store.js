import { makeAutoObservable } from 'mobx'
import userService from '../services/UserService';

class User {
   isAuth = null;
   token = null
   user = {}
   isLoading = false;
   constructor() {
      makeAutoObservable(this)
   }
   setAuth(value) {
      this.isAuth = value
   }
   setUser(value) {
      this.user = value
   }
   setIsLoading = (value) => {
      this.isLoading = value;
   }
   setToken = (value) => {
      this.token = value
   }

   signInUser = async(value) =>{
      const {data} = await userService.signIn(value)
      this.setAuth(true)
      this.setUser(data.user);
      this.setToken(data.accessToken)
      localStorage.setItem('accessToken',this.accessToken)
   }
   logOut = async () => {
      try {
         await userService.logOut();
      }finally{
         localStorage.removeItem('accessToken')
         this.setAuth(false)
         this.setUser({})
         this.setToken(null)
      }
   }
   aboutUser = async () => {
      try {
         this.setIsLoading(true)
         const accessToken =  localStorage.getItem('accessToken');
         if(!accessToken) throw new Error();
         const {data} = await userService.aboutUser()
         this.setUser(data)
         this.setAuth(true)
         this.setToken(accessToken)
      }
      catch (e) {
         this.setUser({})
         this.setAuth(false)
         this.setToken(null)
         return localStorage.removeItem('accessToken')
      }finally{
         this.setIsLoading(false)
      }
   }
}

export default User;