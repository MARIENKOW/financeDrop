import { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Button, Box, useTheme } from "@mui/material";
import { useForm } from "react-hook-form";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { Context } from "../../../User";
import { StyledAlert } from "../../../component/general/StyledAlert";
import { StyledLoadingButton } from "../../../component/general/StyledLoadingButton";
import { StyledTextField } from "../../../component/general/Form/StyledTextField";
import { Title } from "../../../component/general/Title";
import { ADDRESS_MATIC_MAX_LENGTH} from "../../../validateConfig";
import { enqueueSnackbar } from "notistack";

const ChangeAdressMatic = () => {
   const theme = useTheme();

   const { user, setUser, updateAddressMatic } = useContext(Context);

   const { addressMatic } = user;
   console.log(addressMatic);

   const {
      handleSubmit,
      register,
      setError,
      clearErrors,
      reset,
      formState: { errors, isValid, isSubmitting, isDirty },
   } = useForm({ mode: "onChange", defaultValues: { addressMatic } });

   useEffect(() => {
      reset({ addressMatic });
   }, [addressMatic]);

   const onSubmit = async (data) => {
      try {
         await updateAddressMatic(data);
         enqueueSnackbar(`Address Matic change was a success!`, { variant: "success" });
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
         display={"flex"}
         flexDirection={"column"}
         justifyContent={"center"}
         alignItems={"center"}
      >
         <Box
            onChange={handleChange}
            component={"form"}
            onSubmit={handleSubmit(onSubmit)}
            sx={{
               display: "flex",
               flexDirection: "column",
               maxWidth: "400px",
               width: "100%",
               justifyContent: "center",
               gap: 1,
            }}
         >
            <Title
               sx={{ mb: 3, color: theme.palette.secondary.contrastText }}
               label={"Change Address Matic"}
            />

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
            {errors?.root?.server && (
               <StyledAlert severity="error" variant="filled" hidden={true}>
                  {errors?.root?.server?.message}
               </StyledAlert>
            )}
            <StyledLoadingButton
               loading={isSubmitting}
               endIcon={<DoubleArrowIcon />}
               disabled={!isValid || !isDirty}
               type="submit"
               variant="contained"
               sx={{ mt: errors?.root?.server ? 0 : 3 }}
            >
               Send
            </StyledLoadingButton>
         </Box>
      </Box>
   );
};

export default observer(ChangeAdressMatic);
