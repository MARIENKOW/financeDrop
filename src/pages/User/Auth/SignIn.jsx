import { Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import InCenterAuth from "../../../component/general/wrappers/InCenterAuth";
import { Context } from "../../../User";
import {
   PASSWORD_MAX_LENGTH,
   EMAIL_MAX_LENGTH,
   EMAIL_PATTERN,
} from "../../../validateConfig";
import { enqueueSnackbar } from "notistack";
import { StyledTextField } from "../../../component/general/Form/StyledTextField";
import { StyledPassword } from "../../../component/general/Form/StyledPassword";
import { useTheme } from "@mui/material";
import { StyledAlert } from "../../../component/general/StyledAlert";
import { StyledLoadingButton } from "../../../component/general/StyledLoadingButton";
import { USER_REMEMBER_PASSWORD_ROUTE, USER_SIGN_UP_ROUTE } from "../../../route/RouterConfig";

const SignIn = () => {
   const theme = useTheme();

   const { signInUser } = useContext(Context);

   const {
      handleSubmit,
      resetField,
      register,
      setError,
      clearErrors,
      formState: { errors, isValid, isSubmitting },
   } = useForm({ mode: "onChange" });

   const handleChange = () => {
      clearErrors("root");
   };

   const onSubmit = async (data) => {
      try {
         await signInUser(data);
         enqueueSnackbar(`SignIn is success!`, { variant: "success" });
      } catch (e) {
         console.error(e);
         if (e?.response?.status === 400) {
            const errors = e?.response?.data || {};
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

   return (
      <InCenterAuth>
         <Typography
            fontWeight={600}
            color={!isValid ? "secondary" : "primary"}
            sx={{ textAlign: "center", mb: 3 }}
            id="transition-modal-title"
            variant="h6"
            component="h2"
         >
            Sign In
         </Typography>
         <form
            onChange={handleChange}
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            onSubmit={handleSubmit(onSubmit)}
         >
            <StyledTextField
               register={register("email", {
                  required: "required field",
                  maxLength: {
                     value: EMAIL_MAX_LENGTH,
                     message: `maximum ${EMAIL_MAX_LENGTH} characters`,
                  },
                  pattern: {
                     value: EMAIL_PATTERN,
                     message: "mail must be in the format - example@mail.com",
                  },
               })}
               errors={errors}
               label="Email"
            />
            <StyledPassword
               label={"Password"}
               errors={errors}
               register={register("password", {
                  required: "required",
                  maxLength: {
                     value: PASSWORD_MAX_LENGTH,
                     message: `maximunm ${PASSWORD_MAX_LENGTH} characters`,
                  },
               })}
            />
            {errors?.root?.server && (
               <StyledAlert severity="error" variant="filled">
                  {errors?.root?.server?.message}
               </StyledAlert>
            )}
            <StyledLoadingButton
               loading={isSubmitting}
               endIcon={<DoubleArrowIcon />}
               disabled={!isValid}
               sx={{ mt: errors?.root?.server?0:3 }}
               type="submit"
               variant="contained"
            >
               Submit
            </StyledLoadingButton>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
               <NavLink to={USER_REMEMBER_PASSWORD_ROUTE}>
                  <Typography
                     sx={{
                        "&:hover": { color: theme.palette.primary.light },
                        color: theme.palette.secondary.main,
                        cursor: "pointer",
                        transition: ".2s",
                        p: "1px",
                     }}
                     variant="body2"
                     color={"text.secondary"}
                  >
                     Forgot password?
                  </Typography>
               </NavLink>
               <NavLink to={USER_SIGN_UP_ROUTE}>
                  <Typography
                     sx={{
                        "&:hover": { color: theme.palette.primary.light },
                        cursor: "pointer",
                        transition: ".2s",
                        p: "1px",
                     }}
                     variant="body2"
                     color={theme.palette.primary.main}
                  >
                     Sign Up
                  </Typography>
               </NavLink>
            </Box>
         </form>
      </InCenterAuth>
   );
};

export default SignIn;
