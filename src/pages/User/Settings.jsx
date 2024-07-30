import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PasswordIcon from "@mui/icons-material/Password";
import BadgeIcon from "@mui/icons-material/Badge";
import { ContainerComponent } from "../../component/general/wrappers/ContainerComponent";
import SettingsInner from "../../component/general/Settings/SettingsInner";

const changeArray = [
   {
      name: "Profile image",
      link: "",
      icon: <AccountCircleIcon />,
      selected: false,
   },
   {
      name: "Username",
      link: "change-username",
      icon: <BadgeIcon />,
      selected: false,
   },
   {
      name: "Name",
      link: "change-name",
      icon: <DriveFileRenameOutlineIcon />,
      selected: false,
   },
   {
      name: "Password",
      link: "change-password",
      icon: <PasswordIcon />,
      selected: false,
   },
];

const Settings = () => {
   return (
      <ContainerComponent>
         <SettingsInner links={[changeArray]} />
      </ContainerComponent>
   );
};

export default Settings;
