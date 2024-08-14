import { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import {
   Button,
   Box,
   useTheme,
   Checkbox,
   FormControlLabel,
} from "@mui/material";
import { useForm } from "react-hook-form";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { Context } from "../../../User";
import { StyledAlert } from "../../general/StyledAlert";
import { StyledLoadingButton } from "../../general/StyledLoadingButton";
import { StyledTextField } from "../../general/Form/StyledTextField";
import { Title } from "../../general/Title";
import { ADDRESS_MATIC_MAX_LENGTH } from "../../../validateConfig";
import ReplyIcon from "@mui/icons-material/Reply";
import { enqueueSnackbar } from "notistack";

const AdressMatic = ({ handleBack, handleNext, setCashOutData }) => {
   const theme = useTheme();

   const { user, setUser, updateAddressMatic } = useContext(Context);
   const [saveAddressMatic, setSaveAddressMatic] = useState(true);

   const { addressMatic } = user;

   const {
      handleSubmit,
      register,
      clearErrors,
      setError,
      reset,
      getValues,
      formState: { errors, isValid, isSubmitting, isDirty },
   } = useForm({ mode: "onChange", defaultValues: { addressMatic } });

   useEffect(() => {
      reset({ addressMatic });
   }, [addressMatic]);

   // console.log(getValues().addressMatic, addressMatic);

   const onSubmit = async (data) => {
      try {
         if (
            (!addressMatic || getValues().addressMatic !== addressMatic) &&
            saveAddressMatic
         ) {
            await updateAddressMatic(data);
         }
         setCashOutData((prev) => ({ ...prev, ...data }));
         handleNext();
         // enqueueSnackbar(`Address Matic change was a success!`, {
         //    variant: "success",
         // });
      } catch (error) {
         console.log(error);
         if (error?.response?.status === 400) {
            const errors = error?.response?.data || {};
            for (let key in errors) {
               setError(key, { type: "server", message: errors[key] });
            }
            return;
         }
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
      <Box
         flex={1}
         onChange={handleChange}
         component={"form"}
         onSubmit={handleSubmit(onSubmit)}
         sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 1,
         }}
      >
         <Box flex={1} display={'flex'} flexDirection={'column'} >
            <Box display={"flex"} justifyContent={"center"}>
               <Title
                  sx={{
                     mb: 3,
                     color: theme.palette.secondary.contrastText,
                     maxWidth: "350px",
                  }}
                  label={
                     "Specify the Address Matik to which you want to cash out"
                  }
               />
            </Box>

            <StyledTextField
               errors={errors}
               label="Address Matic"
               register={register("addressMatic", {
                  required: "required field",
                  maxLength: {
                     value: ADDRESS_MATIC_MAX_LENGTH,
                     message: `maximunm ${ADDRESS_MATIC_MAX_LENGTH} characters`,
                  },
               })}
            />
            {!addressMatic || getValues().addressMatic !== addressMatic ? (
               <Box sx={{ display: "flex", justifyContent: "start" }}>
                  <FormControlLabel
                     sx={{
                        "& .MuiFormControlLabel-label": {
                           color: theme.palette.secondary.contrastText,
                        },
                     }}
                     control={
                        <Checkbox
                           checked={saveAddressMatic}
                           onChange={() => setSaveAddressMatic((prev) => !prev)}
                           sx={{ color: theme.palette.secondary.contrastText }}
                        />
                     }
                     label="Save as my Address Matic"
                  />
               </Box>
            ) : (
               ""
            )}
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
      </Box>
   );
};

export default observer(AdressMatic);
