import { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import {
   TextField,
   Typography,
   Box,
   InputAdornment,
   colors,
   useTheme,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { Alert } from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
// import Success from "../../../components/Settings/Success"
// import { USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH } from "../../../validateConfig"
import { Context } from "../../../User";
import { StyledTextField } from "../../../component/general/Form/StyledTextField";
import { StyledLoadingButton } from "../../../component/general/StyledLoadingButton";
import {
   USERNAME_MAX_LENGTH,
   USERNAME_MIN_LENGTH,
} from "../../../validateConfig";
import { Title } from "../../../component/general/Title";
import { StyledAlert } from "../../../component/general/StyledAlert";
import { enqueueSnackbar } from "notistack";

const ChangeUsername = () => {
   const theme = useTheme();

   const { user, updateUsername } = useContext(Context);

   const { username } = user;

   const {
      handleSubmit,
      register,
      setError,
      clearErrors,
      reset,
      setValue,
      formState: { errors, isValid, isSubmitting, isDirty },
   } = useForm({ mode: "all", defaultValues: { username } });

   useEffect(() => {
      reset({ username });
   }, [username]);

   const onSubmit = async (data) => {
      try {
         await updateUsername(data);
         enqueueSnackbar(`Name change was a success!`, { variant: "success" });
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
            message: "Упс! виникла помилка, спробуйте пізніше",
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
               label={"Change username"}
            />
            <StyledTextField
               options={{
                  fullWidth: true,
                  InputProps: {
                     startAdornment: (
                        <InputAdornment sx={{ mr: "1px" }} position="start">
                           @
                        </InputAdornment>
                     ),
                  },
               }}
               errors={errors}
               register={register("username", {
                  required: "обов'язкове поле",
                  minLength: {
                     value: USERNAME_MIN_LENGTH,
                     message: `minimum ${USERNAME_MIN_LENGTH} characters`,
                  },
                  maxLength: {
                     value: USERNAME_MAX_LENGTH,
                     message: `maximunm ${USERNAME_MAX_LENGTH} characters`,
                  },
                  validate: (value) =>
                     value === user.login
                        ? "new login must be different"
                        : null,
               })}
               label="Username"
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

export default observer(ChangeUsername);
