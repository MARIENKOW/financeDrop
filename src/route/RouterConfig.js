import { createBrowserRouter } from "react-router-dom";
import OnlyLogoutUser from "../component/User/wrappers/OnlyLogoutUser.jsx";
import OnlyLoginUser from "../component/User/wrappers/OnlyLoginUser.jsx";
import Remember from "../pages/UserAuth/Remember.jsx";
import UndefinedPage from "../pages/404/undefinedPage.jsx";
import ChangePass from "../pages/UserAuth/ChangePass.jsx";
import UserAccountWrapper from "../component/User/wrappers/UserAccountWrapper.jsx";
import SignUp from "../pages/UserAuth/SignUp.jsx";
import User_Main from "../pages/UserAccount/User_Main.jsx";
import SignIn from "../pages/UserAuth/SignIn.jsx";
import ErrorPage from "../pages/ErrorPage";
import Activate from "../pages/UserAuth/Activate.jsx";
import User from "../User.jsx";
import Admin from "../Admin.jsx";
import AdminAccountWrapper from "../component/Admin/wrappers/AdminAccountWrapper.jsx";
import SignInAdmin from "../pages/AdminAuth/SignInAdmin.jsx";
import OnlyLoginAdmin from "../component/Admin/wrappers/OnlyLoginAdmin.jsx";
import OnlyLogoutAdmin from "../component/Admin/wrappers/OnlyLogoutAdmin.jsx";
import { User_Nft_NotSold } from "../pages/UserAccount/User_Nft_NotSold.jsx";
import NftAdd from "../pages/AdminAccount/NftAdd.jsx";
import NftNotSold from "../pages/AdminAccount/NftNotSold.jsx";
import Nft from "../pages/AdminAccount/Nft.jsx";
import NftEdit from "../pages/AdminAccount/NftEdit.jsx";
import { User_Nft } from "../pages/UserAccount/User_Nft.jsx";

export const USER_ROUTE = "/";
export const USER_NFT_ROUTE = "/nft";
export const USER_SIGN_IN_ROUTE = "/sign-in";
export const USER_SIGN_UP_ROUTE = "/sign-up";
export const USER_REMEMBER_PASSWORD_ROUTE = "/remember-password";
export const USER_CHANGE_PASSWORD_ROUTE = "/change-password";
export const USER_ACTIVATE_ROUTE = "/activate";
export const ADMIN_ROUTE = "/Admin";
export const ADMIN_SIGN_IN_ROUTE = ADMIN_ROUTE + "/sign-in";
export const ADMIN_NFT_ROUTE = ADMIN_ROUTE + "/nft";
export const ADMIN_NFT_ADD_ROUTE = ADMIN_NFT_ROUTE + "/add";
export const ADMIN_NFT_EDIT_ROUTE = ADMIN_NFT_ROUTE + "/edit";

const RouterConfig = createBrowserRouter([
   {
      path: "/",
      element: <User />,
      errorElement: <ErrorPage />,
      children: [
         {
            element: (
               <OnlyLoginUser>
                  <UserAccountWrapper />
               </OnlyLoginUser>
            ),
            errorElement: <ErrorPage />,
            path: "/",
            children: [
               {
                  element: <User_Main />,
                  index: true,
               },
               {
                  element: <User_Nft_NotSold />,
                  path: USER_NFT_ROUTE,
               },
               {
                  element: <User_Nft />,
                  path: USER_NFT_ROUTE + "/:id",
               },
            ],
         },
         {
            element: (
               <OnlyLogoutUser>
                  <SignIn />
               </OnlyLogoutUser>
            ),
            path: USER_SIGN_IN_ROUTE,
            errorElement: <ErrorPage />,
         },
         {
            element: (
               <OnlyLogoutUser>
                  <SignUp />
               </OnlyLogoutUser>
            ),
            path: USER_SIGN_UP_ROUTE,
            errorElement: <ErrorPage />,
         },
         {
            element: (
               <OnlyLogoutUser>
                  <Remember />
               </OnlyLogoutUser>
            ),
            path: USER_REMEMBER_PASSWORD_ROUTE,
            errorElement: <ErrorPage />,
         },
         {
            element: (
               <OnlyLogoutUser>
                  <ChangePass />
               </OnlyLogoutUser>
            ),
            path: USER_CHANGE_PASSWORD_ROUTE + "/:link",
            errorElement: <ErrorPage />,
         },
         {
            element: <Activate />,
            path: USER_ACTIVATE_ROUTE + "/:token",
            errorElement: <ErrorPage />,
         },
      ],
   },
   {
      path: ADMIN_ROUTE,
      element: <Admin />,
      errorElement: <ErrorPage />,
      children: [
         {
            element: (
               <OnlyLoginAdmin>
                  <AdminAccountWrapper />
               </OnlyLoginAdmin>
            ),
            errorElement: <ErrorPage />,
            path: ADMIN_ROUTE,
            children: [
               {
                  element: <NftNotSold />,
                  // index:true,
                  path: ADMIN_NFT_ROUTE,
               },
               {
                  element: <NftAdd />,
                  path: ADMIN_NFT_ADD_ROUTE,
               },
               {
                  element: <Nft />,
                  path: ADMIN_NFT_ROUTE + "/:id",
               },
               {
                  element: <NftEdit />,
                  path: ADMIN_NFT_EDIT_ROUTE + "/:id",
               },
            ],
         },
         {
            element: (
               <OnlyLogoutAdmin>
                  <SignInAdmin />
               </OnlyLogoutAdmin>
            ),
            path: ADMIN_SIGN_IN_ROUTE,
            errorElement: <ErrorPage />,
         },
      ],
   },
   {
      element: <UndefinedPage />,
      path: "*",
   },
]);

export default RouterConfig;
