import {
   Box,
   useTheme,
   Typography,
   LinearProgress,
   IconButton,
} from "@mui/material";
import config from "../../../config";
import ImageIcon from "@mui/icons-material/Image";
import CopyToClipboard from "../../general/CopyToClipboard";
import { StyledLoadingButton } from "../../general/StyledLoadingButton";
import DoneAll from "@mui/icons-material/DoneAll";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import { useContext, useState } from "react";
import UserService from "../../../services/UserService";
import { useQueryClient } from "@tanstack/react-query";
import { UserIdContext } from "../../../pages/Admin/Main/Admin_User";
import { enqueueSnackbar } from "notistack";

export const AdminCashOutPendingItem = ({ item, admin, handleOpenImg }) => {
   const theme = useTheme();

   const [isLoadingConfirm, setIsLoadingConfirm] = useState(false);
   const [isLoadingReject, setIsLoadingReject] = useState(false);
   const user_id = useContext(UserIdContext);
   console.log(user_id);

   const queryClient = useQueryClient();

   const handleClickConfirm = async () => {
      try {
         setIsLoadingConfirm(true);
         if (window.confirm("Realy confirm?")) {
            await UserService.confirmCashOut(item?.id);
            await queryClient.invalidateQueries({
               queryKey: ["cashOutPending", user_id],
            });
            await queryClient.invalidateQueries({
               queryKey: ["cashOutHistory", user_id],
            });
            await queryClient.invalidateQueries({
               queryKey: ["user", user_id],
            });
         }
      } catch (error) {
         console.log(error);
         if (error?.response?.status === 403) {
            await queryClient.invalidateQueries({
               queryKey: ["cashOutPending", user_id],
            });
            await queryClient.invalidateQueries({
               queryKey: ["cashOutHistory", user_id],
            });
            await queryClient.invalidateQueries({
               queryKey: ["user", user_id],
            });
            return enqueueSnackbar(
               error?.response?.data ||
                  `Oops! something went wrong, try again later`,
               {
                  variant: "error",
               }
            );
         }
         enqueueSnackbar(`"Oops! something went wrong, try again later"`, {
            variant: "error",
         });
      } finally {
         setIsLoadingConfirm(false);
      }
   };
   const handleClickReject = async () => {
      try {
         setIsLoadingReject(true);
         const promptMessage = prompt("Reject reason:");
         if (promptMessage !== null) {
            await UserService.rejectCashOut(item?.id, {
               adminMessage: promptMessage,
            });
            await queryClient.invalidateQueries({
               queryKey: ["cashOutPending", user_id],
            });
            await queryClient.invalidateQueries({
               queryKey: ["cashOutHistory", user_id],
            });
         }
      } catch (error) {
         console.log(error);
         enqueueSnackbar(`"Oops! something went wrong, try again later"`, {
            variant: "error",
         });
      } finally {
         setIsLoadingReject(false);
      }
   };

   return (
      <Box
         sx={{
            overflow: "hidden",
            borderRadius: "10px",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: theme.palette.background.light,
            background: theme.palette.background.main,
         }}
      >
         <Box
            sx={{
               p: 1,
               display: "flex",
               flexDirection: "column",
               gap: 1,
            }}
         >
            <Box
               sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
               }}
            >
               <Box display={"flex"} gap={1} alignItems={"center"}>
                  <Typography
                     fontWeight={"600"}
                     variant="body2"
                     color={theme.palette.secondary.main}
                  >
                     {"deposit:"}
                  </Typography>
                  <Typography
                     fontWeight={"600"}
                     variant="body2"
                     color={theme.palette.secondary.contrastText}
                  >
                     {config.depositTypes[item?.deposit_type]}
                  </Typography>
               </Box>
               <Typography
                  variant="body2"
                  fontWeight={600}
                  color={theme.palette.secondary.contrastText}
               >
                  - $ {item?.sum}
               </Typography>
            </Box>
            <Box
               display={"flex"}
               flexWrap={"wrap"}
               gap={1}
               alignItems={"center"}
            >
               <Typography
                  fontWeight={"600"}
                  variant="body2"
                  sx={{ whiteSpace: "nowrap" }}
                  color={theme.palette.secondary.main}
               >
                  {"address Matic:"}
               </Typography>

               <CopyToClipboard type={"wallet"} text={item?.addressMatic} />
            </Box>
            {item?.img && (
               <Box display={"flex"} gap={1} alignItems={"center"}>
                  <Typography
                     fontWeight={"600"}
                     variant="body2"
                     sx={{ whiteSpace: "nowrap" }}
                     color={theme.palette.secondary.main}
                  >
                     {"screenshot:"}
                  </Typography>
                  <IconButton
                     onClick={() => handleOpenImg(item?.img?.path)}
                     color="primary"
                  >
                     <ImageIcon />
                  </IconButton>
               </Box>
            )}
            <Box mt={1} display={"flex"} justifyContent={"space-between"}>
               <StyledLoadingButton
                  loading={isLoadingReject}
                  endIcon={<DoDisturbIcon />}
                  variant="outlined"
                  color="error"
                  onClick={handleClickReject}
               >
                  reject
               </StyledLoadingButton>
               <StyledLoadingButton
                  endIcon={<DoneAll />}
                  variant="contained"
                  color="success"
                  loading={isLoadingConfirm}
                  onClick={handleClickConfirm}
               >
                  confirm
               </StyledLoadingButton>
            </Box>
         </Box>
      </Box>
   );
};
