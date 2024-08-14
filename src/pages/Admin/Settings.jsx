import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PasswordIcon from "@mui/icons-material/Password";
import BadgeIcon from "@mui/icons-material/Badge";
import { ContainerComponent } from "../../component/general/wrappers/ContainerComponent";
import SettingsInner from "../../component/general/Settings/SettingsInner";
import PaymentsIcon from '@mui/icons-material/Payments';
import PercentIcon from '@mui/icons-material/Percent';

const changeArray = [
   {
      name: "Password",
      icon: <PasswordIcon />,
      selected: false,
   },
   {
      name: "Name",
      icon: <BadgeIcon />,
      link: "change-name",
      selected: false,
   },
   {
      name: "Cash Out",
      link: "change-cash-out-percent",
      icon: <PercentIcon />,
      selected: false,
   },
   {
      name: "Referral",
      link: "change-referral-percent",
      icon: <PercentIcon />,
      selected: false,
   },

   {
      name: "Wallet",
      link: "change-wallet",
      icon: <PaymentsIcon />,
      selected: false,
   },
];

const AdminSettings = () => {
   return (
      <ContainerComponent sx={{ p: { xs: 0, sm: 2 } }}>
         <SettingsInner links={[changeArray]} />
      </ContainerComponent>
   );
};

export default AdminSettings;
