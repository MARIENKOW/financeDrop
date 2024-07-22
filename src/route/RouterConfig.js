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
import Admin_Main from "../pages/AdminAccount/Admin_Main.jsx";
import SignInAdmin from "../pages/AdminAuth/SignInAdmin.jsx";
import OnlyLoginAdmin from "../component/Admin/wrappers/OnlyLoginAdmin.jsx";
import OnlyLogoutAdmin from "../component/Admin/wrappers/OnlyLogoutAdmin.jsx";
import User_Nft from "../pages/UserAccount/User_Nft.jsx";
import NftAdd from "../pages/AdminAccount/NftAdd.jsx";
import NftNotSold from "../pages/AdminAccount/NftNotSold.jsx";

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
               // {
               //    element: <User_Main/>,
               //    index:true,
               // },
               {
                  element: <User_Nft />,
                  index: true,
                  // path:'/Nft'
               },
            ],
         },
         {
            element: (
               <OnlyLogoutUser>
                  <SignIn />
               </OnlyLogoutUser>
            ),
            path: "/SignIn",
            errorElement: <ErrorPage />,
         },
         {
            element: (
               <OnlyLogoutUser>
                  <SignUp />
               </OnlyLogoutUser>
            ),
            path: "/SignUp",
            errorElement: <ErrorPage />,
         },
         {
            element: (
               <OnlyLogoutUser>
                  <Remember />
               </OnlyLogoutUser>
            ),
            path: "/RememberSendMail",
            errorElement: <ErrorPage />,
         },
         {
            element: (
               <OnlyLogoutUser>
                  <ChangePass />
               </OnlyLogoutUser>
            ),
            path: "/ChangePass/:link",
            errorElement: <ErrorPage />,
         },
         {
            element: <Activate />,
            path: "/Activate/:token",
            errorElement: <ErrorPage />,
         },
      ],
   },
   {
      path: "/Admin",
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
            path: "/Admin",
            children: [
               {
                  element: <Admin_Main />,
                  index: true,
               },
               {
                  element: <NftAdd />,
                  path: '/Admin/NftAdd',
               },
               {
                  element: <NftNotSold />,
                  path: '/Admin/NftNotSold',
               },
            ],
         },
         {
            element: (
               <OnlyLogoutAdmin>
                  <SignInAdmin />
               </OnlyLogoutAdmin>
            ),
            path: "/Admin/SignIn",
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
