import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { AdminContext } from "../../Admin";

const Admin_Main = () => {
   const { admin } = useContext(AdminContext);
   return admin.name;
};

export default observer(Admin_Main);
