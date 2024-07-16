import  {$UserApi} from '../http/index.js';

export default class UserService {
   static async signIn(value){
      const res = await $UserApi.post('/signIn',value)
      return res
   }
   static async signUp(value){
      const ans =await $UserApi.post('/signUp',value)
      return ans
   }
   static async rememberPassword(value){
      const ans =await $UserApi.post('/rememberPassword',value)
      return ans
   }
   static async logOut(){
      const rez = await $UserApi.post('/logOut');
      return rez;
   }
   static async refresh(){
      return await $UserApi.post('/refresh');
   }
   static async checkAuthUser(){
      if(!localStorage.getItem('accessToken')) return {status:401}
      const response = await $UserApi.get('/checkAuthUser');
      return response
   }
   static async checkChangePassLink(value){
      const response = await $UserApi.post('/checkChangePassLink',value);
      return response
   }
   static async activate(value){
      const response = await $UserApi.post('/activate',value);
      return response
   }
   static async aboutUser(){
      const ans = await $UserApi.get('/aboutUser');
      return ans
   }
   static async changePassword(value){
      const ans =await $UserApi.post('/changePass',value)
      return ans
   }
}