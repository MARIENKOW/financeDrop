import { createBrowserRouter } from "react-router-dom"
import OnlyLogoutUser from '../component/wrappers/OnlyLogoutUser.jsx';
import OnlyLoginUser from '../component/wrappers/OnlyLoginUser.jsx';
import Remember from '../pages/UserAuth/Remember.jsx'
import UndefinedPage from '../pages/404/undefinedPage.jsx'
import ChangePass from '../pages/UserAuth/ChangePass.jsx'
import Wrapper from "../component/wrappers/AccountWrapper.jsx"
import SignUp from '../pages/UserAuth/SignUp.jsx';
import Main from '../pages/Account/Main.jsx';
import SignIn from '../pages/UserAuth/SignIn.jsx';
import ErrorPage from '../pages/ErrorPage';
import Activate from "../pages/UserAuth/Activate.jsx";


const RouterConfig = createBrowserRouter([
   {
      path: '/',
      element:<OnlyLoginUser> <Wrapper /></OnlyLoginUser>,
      errorElement: <ErrorPage />,
      children: [
         {
            element: <Main/>,
            index:true,
            // path: "/Account"
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
