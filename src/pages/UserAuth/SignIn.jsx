import { grey, blue } from "@mui/material/colors";
import {
   FilledInput,
   FormControl,
   FormHelperText,
   InputLabel,
   Container,
   InputAdornment,
   Box,
   Typography,
   IconButton,
   TextField,
   Button,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { useContext, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { NavLink } from "react-router-dom";
import InCenterAuth from "../../component/general/wrappers/InCenterAuth";
import { Context } from "../../User";
import { Alert } from "@mui/material";
import {
   PASSWORD_MAX_LENGTH,
   EMAIL_MAX_LENGTH,
   EMAIL_PATTERN,
} from "../../validateConfig";
import { enqueueSnackbar } from "notistack";
import { StyledTextField } from "../../component/general/Form/StyledTextField";
import { StyledPassword } from "../../component/general/Form/StyledPassword";
import { useTheme } from "@mui/material";

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
               <Alert severity="error" variant="filled" hidden={true}>
                  {errors?.root?.server?.message}
               </Alert>
            )}
            <LoadingButton
               loading={isSubmitting}
               endIcon={<DoubleArrowIcon />}
               disabled={!isValid}
               type="submit"
               variant="contained"
            >
               Submit
            </LoadingButton>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
               <NavLink to={"/RememberSendMail"}>
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
               <NavLink to={"/SignUp"}>
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
