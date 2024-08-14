import {
   Box,
   useTheme,
   Typography,
   LinearProgress,
   Chip,
   Backdrop,
   IconButton,
} from "@mui/material";
import config from "../../../config";
import DoneAll from "@mui/icons-material/DoneAll";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import CopyToClipboard from "../CopyToClipboard";
import ImageIcon from "@mui/icons-material/Image";

export const CashOutHistoryItem = ({ item, admin,handleOpenImg }) => {
   const theme = useTheme();
   console.log(admin);

   return (
      <Box
         sx={{
            overflow: "hidden",
            borderRadius: "10px",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor:
               item?.type == 2
                  ? theme.palette.success.light
                  : theme.palette.alert.dark,
            background:
               item?.type == 2
                  ? theme.palette.success.dark
                  : theme.palette.alert.main,
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
            <Box display={"flex"} gap={1} justifyContent={"start"}>
               <Chip
                  icon={item?.type == 2 ? <DoneAll /> : <DoDisturbIcon />}
                  size="small"
                  color={item?.type == 2 ? "success" : "error"}
                  label={config.cashOutTypes[item?.type]}
               />
            </Box>
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
               {admin ? (
                  <CopyToClipboard type={"wallet"} text={item?.addressMatic} />
               ) : (
                  <Typography
                     fontWeight={"600"}
                     variant="body2"
                     sx={{
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                     }}
                     color={theme.palette.secondary.contrastText}
                  >
                     {item?.addressMatic}
                  </Typography>
               )}
            </Box>
            {item?.adminMessage && (
               <Box display={"flex"} gap={1} alignItems={"center"}>
                  <Typography
                     fontWeight={"600"}
                     variant="body2"
                     sx={{ whiteSpace: "nowrap" }}
                     color={theme.palette.secondary.main}
                  >
                     {"message:"}
                  </Typography>
                  <Typography
                     fontWeight={"600"}
                     variant="body2"
                     sx={{ whiteSpace: "wrap" }}
                     color={theme.palette.alert.contrastText}
                  >
                     {item?.adminMessage}
                  </Typography>
               </Box>
            )}
            {admin && item?.img && (
               <Box display={"flex"} gap={1} alignItems={"center"}>
                  <Typography
                     fontWeight={"600"}
                     variant="body2"
                     sx={{ whiteSpace: "nowrap" }}
                     color={theme.palette.secondary.main}
                  >
                     {"screenshot:"}
                  </Typography>
                  <IconButton onClick={()=>handleOpenImg(item?.img?.path)} color="primary">
                     <ImageIcon />
                  </IconButton>
               </Box>
            )}
         </Box>
      </Box>
   );
};
