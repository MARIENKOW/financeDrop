import {
   Box,
   Button,
   CircularProgress,
   Typography,
   useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import Loading from "../../general/Loading/Loading";
import ErrorElement from "../../general/ErrorElement";
import UserService from "../../../services/UserService";
import DoneAll from "@mui/icons-material/DoneAll";
import { useQueryClient } from "@tanstack/react-query";

export const End = ({ cashOutData, handleRefresh }) => {

   const queryClient = useQueryClient()

   useEffect(() => {
      const sendCashOut = async () => {
         try {
            const formData = new FormData();
            for (let key in cashOutData) {
               formData.append(key, cashOutData[key]);
            }
            await UserService.cashOutRequest(formData);
            await queryClient.invalidateQueries({queryKey:['cashOutPending']})
            await queryClient.invalidateQueries({queryKey:['cashOutHistory']})
         } catch (error) {
            console.log(error?.response?.data || error?.message);
            setIsError(error?.response?.data || error?.message);
         } finally {
            setIsLoading(false);
         }
      };
      sendCashOut();
   }, []);

   const [isLoading, setIsLoading] = useState(true);
   const [isError, setIsError] = useState(false);

   if (isLoading)
      return (
         <Box flex={1} display={'flex'} justifyContent={'center'} alignItems={'center'} >
            <CircularProgress />
         </Box>
      );

   if (isError) return <ErrorElement buttons={false} message={isError} />;

   return (
      <Box
         p={1}
         gap={2}
         flex={1}
         display={"flex"}
         flexDirection={"column"}
         alignItems={"center"}
         justifyContent={"center"}
      >
         <DoneAll sx={{ width: 70, height: 70 }} color="primary" />
         <Typography
            color={"secondary.contrastText"}
            sx={{ mb: 1 }}
            variant="h5"
            maxWidth={"350px"}
            component="h2"
         >
            Deposit request successfully created please wait for administrator's
            reply
         </Typography>
         <Button onClick={handleRefresh} variant="contained">
            create a request for another deposit
         </Button>
      </Box>
   );
};
