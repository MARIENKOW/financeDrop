import { StyledLoadingButton } from "../../general/StyledLoadingButton";
import { useForm } from "react-hook-form";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { Title } from "../../general/Title";
import DragAndDrop from "../../general/Form/DragAndDrop";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { StyledAlert } from "../../general/StyledAlert";
import ReplyIcon from "@mui/icons-material/Reply";
import { useContext } from "react";
import { SiteContext } from "../../..";
import CopyToClipboard from "../../general/CopyToClipboard";

export const Screenshot = ({ handleBack, sum, setCashOutData, handleNext }) => {
   const theme = useTheme();

   const { data } = useContext(SiteContext);

   const {
      clearErrors,
      handleSubmit,
      setError,
      control,
      resetField,
      setValue,
      formState: { isValid, errors, isSubmitting },
   } = useForm({
      mode: "all",
   });

   const onSubmit = async (data) => {
      try {
         setCashOutData((prev) => ({ ...prev, ...data }));
         handleNext();
         // const formData = new FormData();
         // for (let key in data) {
         //    formData.append(key, data[key]);
         // }
      } catch (error) {
         console.log(error);
         setError("root.server", {
            type: "server",
            message: "Oops! something went wrong, try again later",
         });
      }
   };

   const handleChange = () => {
      clearErrors("root");
   };
   return (
      <form
         onChange={handleChange}
         style={{
            display: "flex",
            flexDirection: "column",
            flex: "1",
            gap: "15px",
         }}
         onSubmit={handleSubmit(onSubmit)}
      >
         <Box flex={1} display={"flex"} flexDirection={"column"}>
            <Box display={"flex"} justifyContent={"center"}>
               <Title
                  sx={{
                     mb: 3,
                     color: theme.palette.secondary.contrastText,
                     maxWidth: "350px",
                  }}
                  label={`Pay a commission of ${data?.cashOutPercent}% to wallet`}
               />
            </Box>
            <Box
               display={"flex"}
               flexDirection={{ xs: "column", sm: "row" }}
               gap={2}
            >
               <Box
                  flex={"50% 0 1"}
                  display={"flex"}
                  flexDirection={"column"}
                  gap={2}
               >
                  <Box display={"flex"} gap={1} alignItems={"center"}>
                     <Typography color="secondary" variant="body1">
                        Matic Address:
                     </Typography>
                     <CopyToClipboard type={"wallet"} text={data?.wallet} />
                  </Box>
                  <Box display={"flex"} gap={1} alignItems={"center"}>
                     <Typography color="secondary" variant="body1">
                        Matic:
                     </Typography>
                     <Typography
                        color={theme.palette.secondary.contrastText}
                        variant="body1"
                     >
                        Polygon
                     </Typography>
                  </Box>
                  <Box display={"flex"} gap={1} alignItems={"center"}>
                     <Typography color="secondary" variant="body1">
                        Money to send:
                     </Typography>
                     <Typography
                        color={theme.palette.secondary.contrastText}
                        variant="body1"
                     >
                        {(sum * (data?.cashOutPercent / 100)).toFixed(2)} $
                     </Typography>
                  </Box>
               </Box>
               <Box
                  flex={"50% 0 1"}
                  display={"flex"}
                  flexDirection={"column"}
                  gap={1}
               >
                  <Typography
                     textAlign={{ xs: "left", sm: "center" }}
                     color="secondary"
                     variant="body1"
                  >
                     Payment Screenshot:
                  </Typography>
                  <DragAndDrop
                     clearErrors={clearErrors}
                     setError={setError}
                     control={control}
                     name={"img"}
                     sx={{ borderRadius: "10px" }}
                     resetField={resetField}
                     setValue={setValue}
                     // imgdefault={defaultValues.imgPreview}>
                  />
               </Box>
            </Box>
         </Box>

         {errors?.root?.server && (
            <StyledAlert severity="error" variant="filled" hidden={true}>
               {errors?.root?.server?.message}
            </StyledAlert>
         )}
         <Box
            sx={{ mt: errors?.root?.server ? 0 : 3 }}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
         >
            <Button
               onClick={handleBack}
               startIcon={<ReplyIcon />}
               variant="outlined"
            >
               previous step
            </Button>
            <StyledLoadingButton
               loading={isSubmitting}
               endIcon={<DoubleArrowIcon />}
               disabled={!isValid}
               type="submit"
               variant="contained"
            >
               next
            </StyledLoadingButton>
         </Box>
      </form>
   );
};
