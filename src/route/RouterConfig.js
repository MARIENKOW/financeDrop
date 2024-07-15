import { createBrowserRouter } from "react-router-dom"
import OnlyLogoutUser from '../component/wrappers/OnlyLogoutUser.jsx';
import OnlyLoginUser from '../component/wrappers/OnlyLoginUser.jsx';
import Remember from '../pages/Remember.jsx'
import UndefinedPage from '../pages/404/undefinedPage.jsx'
import ChangePass from '../pages/ChangePass.jsx'
import Wrapper from "./Wrapper"
import SignUp from '../pages/SignUp';
import Account from '../pages/Account.jsx';
import SignIn from '../pages/SignIn.jsx';
import ErrorPage from '../pages/ErrorPage';
import Activate from "../pages/Activate.jsx";


const RouterConfig = createBrowserRouter([
   {
      path: '/',
      element:<OnlyLoginUser> <Wrapper /></OnlyLoginUser>,
      errorElement: <ErrorPage />,
      children: [
         {
            element: <Account/>,
            path: "/Account"
         },
      ]
   },
   {
      element: <OnlyLogoutUser><SignIn /></OnlyLogoutUser>,
      path: '/SignIn',
      errorElement: <ErrorPage />,
   },
   {
      element: <OnlyLogoutUser><SignUp /></OnlyLogoutUser>,
      path: '/SignUp',
      errorElement: <ErrorPage />,
   },
   {
      element:<OnlyLogoutUser><Remember /></OnlyLogoutUser>,
      path: '/RememberSendMail',
      errorElement: <ErrorPage />,

   },
   {
      element: <OnlyLogoutUser><ChangePass /></OnlyLogoutUser>,
      path: "/ChangePass/:link",
      errorElement: <ErrorPage />,
   },
   {
      element: <Activate/>,
      path: "/Activate/:token",
      errorElement: <ErrorPage />,
   },
   {
      element: <UndefinedPage />,
      path: '*',
   },
])

export default RouterConfig
