import { createBrowserRouter } from "react-router-dom";
import OnlyLogoutUser from "../component/User/wrappers/OnlyLogoutUser.jsx";
import OnlyLoginUser from "../component/User/wrappers/OnlyLoginUser.jsx";
import Remember from "../pages/User/Auth/Remember.jsx";
import UndefinedPage from "../pages/404/undefinedPage.jsx";
import ChangePass from "../pages/User/Auth/ChangePass.jsx";
import UserAccountWrapper from "../component/User/wrappers/UserAccountWrapper.jsx";
import SignUp from "../pages/User/Auth/SignUp.jsx";
import User_Main from "../pages/User/Main/User_Main.jsx";
import SignIn from "../pages/User/Auth/SignIn.jsx";
import ErrorPage from "../pages/ErrorPage";
import Activate from "../pages/User/Auth/Activate.jsx";
import User from "../User.jsx";
import Admin from "../Admin.jsx";
import AdminAccountWrapper from "../component/Admin/wrappers/AdminAccountWrapper.jsx";
import SignInAdmin from "../pages/Admin/Auth/SignInAdmin.jsx";
import OnlyLoginAdmin from "../component/Admin/wrappers/OnlyLoginAdmin.jsx";
import OnlyLogoutAdmin from "../component/Admin/wrappers/OnlyLogoutAdmin.jsx";
import { User_Nft_NotSold } from "../pages/User/Nft/User_Nft_NotSold.jsx";
import { Admin_Nft_Add } from "../pages/Admin/Nft/Admin_Nft_Add.jsx";
import { Admin_Nft_NotSold } from "../pages/Admin/Nft/Admin_Nft_NotSold.jsx";
import { Admin_Nft } from "../pages/Admin/Nft/Admin_Nft.jsx";
import { Admin_Nft_Edit } from "../pages/Admin/Nft/Admin_Nft_Edit.jsx";
import { User_Nft } from "../pages/User/Nft/User_Nft.jsx";
import { Admin_Main } from "../pages/Admin/Main/Admin_Main.jsx";
import { Admin_User } from "../pages/Admin/Main/Admin_User.jsx";
import Settings from "../pages/User/Settings.jsx";
import ChangeUsername from "../pages/User/Settings/ChangeUsername.jsx";
import ChangeName from "../pages/User/Settings/ChangeName.jsx";
import ChangePassword from "../pages/User/Settings/ChangePassword.jsx";
import ChangeImage from "../pages/User/Settings/ChangeImage.jsx";
import ConfirmChangePassword from "../pages/User/Settings/ConfirmChangePassword.jsx";
import ChangeAdressMatic from "../pages/User/Settings/ChangeAdressMatic.jsx";
import { User_CashOut } from "../pages/User/Main/User_CashOut.jsx";
import AdminSettings from "../pages/Admin/Settings.jsx";
import AdminChangePassword from "../pages/Admin/Settings/ChangePassword.jsx";
import AdminChangeName from "../pages/Admin/Settings/ChangeName.jsx";
import ChangeWallet from "../pages/Admin/Settings/ChangeWallet.jsx";
import ChangeReferralPercent from "../pages/Admin/Settings/ChangeReferralPercent.jsx";
import ChangeCashOutPercent from "../pages/Admin/Settings/ChangeCashOutPercent.jsx";

export const USER_ROUTE = "/";
export const USER_NFT_ROUTE = "/nft";
export const USER_CASH_OUT_ROUTE = "/cash-out";
export const USER_SETTINGS_ROUTE = "/settings";
export const USER_SETTINGS_NAME_ROUTE = USER_SETTINGS_ROUTE + "/change-name";
export const USER_SETTINGS_IMG_ROUTE = USER_SETTINGS_ROUTE + "/change-img";
export const USER_SETTINGS_USERNAME_ROUTE =
   USER_SETTINGS_ROUTE + "/change-username";
export const USER_SETTINGS_PASSWORD_ROUTE =
   USER_SETTINGS_ROUTE + "/change-password";
export const USER_SETTINGS_ADDRESS_MATTIC_ROUTE =
   USER_SETTINGS_ROUTE + "/change-address-matic";
export const USER_SIGN_IN_ROUTE = "/sign-in";
export const USER_SIGN_UP_ROUTE = "/sign-up";
export const USER_REMEMBER_PASSWORD_ROUTE = "/remember-password";
export const USER_CHANGE_PASSWORD_ROUTE = "/change-password";
export const USER_CONFIRM_SETTINGS_PASSWORD_ROUTE =
   "/change-password-settings/confirm";
export const USER_ACTIVATE_ROUTE = "/activate";
export const ADMIN_ROUTE = "/Admin";
export const ADMIN_SETTINGS_ROUTE = ADMIN_ROUTE + "/settings";
export const ADMIN_SETTINGS_NAME_ROUTE = ADMIN_SETTINGS_ROUTE + "/change-name";
export const ADMIN_SETTINGS_WALLET_ROUTE = ADMIN_SETTINGS_ROUTE + "/change-wallet";
export const ADMIN_SETTINGS_REFERRAL_ROUTE = ADMIN_SETTINGS_ROUTE + "/change-referral-percent";
export const ADMIN_SETTINGS_CASH_OUT_ROUTE = ADMIN_SETTINGS_ROUTE + "/change-cash-out-percent";
export const ADMIN_SIGN_IN_ROUTE = ADMIN_ROUTE + "/sign-in";
export const ADMIN_NFT_ROUTE = ADMIN_ROUTE + "/nft";
export const ADMIN_USER_ROUTE = ADMIN_ROUTE + "/user";
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
                  element: <User_CashOut />,
                  path: USER_CASH_OUT_ROUTE,
               },
               {
                  element: <User_Nft_NotSold />,
                  path: USER_NFT_ROUTE,
               },
               {
                  element: <User_Nft />,
                  path: USER_NFT_ROUTE + "/:id",
               },
               {
                  element: <Settings />,
                  path: USER_SETTINGS_ROUTE,
                  children: [
                     {
                        element: <ChangeImage />,
                        index: true,
                        // path: USER_SETTINGS_IMG_ROUTE,
                     },
                     {
                        element: <ChangeUsername />,
                        // index: true,
                        path: USER_SETTINGS_USERNAME_ROUTE,
                     },
                     {
                        element: <ChangeName />,
                        path: USER_SETTINGS_NAME_ROUTE,
                     },
                     {
                        element: <ChangePassword />,
                        path: USER_SETTINGS_PASSWORD_ROUTE,
                     },
                     {
                        element: <ChangeAdressMatic />,
                        path: USER_SETTINGS_ADDRESS_MATTIC_ROUTE,
                     },
                  ],
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
                  <SignUp />
               </OnlyLogoutUser>
            ),
            path: USER_SIGN_UP_ROUTE + "/:token",
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
         {
            element: (
               <OnlyLoginUser>
                  <ConfirmChangePassword />
               </OnlyLoginUser>
            ),
            path: USER_CONFIRM_SETTINGS_PASSWORD_ROUTE + "/:link",
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
                  element: <Admin_Main />,
                  index: true,
               },
               {
                  element: <AdminSettings />,
                  path: ADMIN_SETTINGS_ROUTE,
                  children: [
                     {
                        element: <AdminChangePassword />,
                        index: true,
                        // path: USER_SETTINGS_IMG_ROUTE,
                     },
                     {
                        element: <AdminChangeName />,
                        path: ADMIN_SETTINGS_NAME_ROUTE,
                     },
                     {
                        element: <ChangeReferralPercent />,
                        path: ADMIN_SETTINGS_REFERRAL_ROUTE,
                     },
                     {
                        element: <ChangeCashOutPercent />,
                        path: ADMIN_SETTINGS_CASH_OUT_ROUTE,
                     },
                     {
                        element: <ChangeWallet />,
                        path: ADMIN_SETTINGS_WALLET_ROUTE,
                     },
                  ],
               },
               {
                  element: <Admin_User />,
                  path: ADMIN_USER_ROUTE + "/:id",
               },
               {
                  element: <Admin_Nft_NotSold />,
                  path: ADMIN_NFT_ROUTE,
               },
               {
                  element: <Admin_Nft_Add />,
                  path: ADMIN_NFT_ADD_ROUTE,
               },
               {
                  element: <Admin_Nft />,
                  path: ADMIN_NFT_ROUTE + "/:id",
               },
               {
                  element: <Admin_Nft_Edit />,
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
