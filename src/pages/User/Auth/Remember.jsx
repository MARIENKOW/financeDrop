import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { Box, Typography } from "@mui/material";
import { EMAIL_PATTERN, EMAIL_MAX_LENGTH } from "../../../validateConfig";
import InCenterAuth from "../../../component/general/wrappers/InCenterAuth";
import userService from "../../../services/UserService";
import PasswordEmailSendSuccess from "../../../component/User/Success/PasswordEmailSendSuccess";
import { StyledTextField } from "../../../component/general/Form/StyledTextField";
import { useTheme } from "@mui/material";
import { StyledAlert } from "../../../component/general/StyledAlert";
import { StyledLoadingButton } from "../../../component/general/StyledLoadingButton";
import { USER_SIGN_IN_ROUTE, USER_SIGN_UP_ROUTE } from "../../../route/RouterConfig";

const Remember = () => {
   const theme = useTheme();

   const {
      handleSubmit,
      register,
      getValues,
      setError,
      clearErrors,
      formState: { errors, isValid, isSubmitting },
   } = useForm({ mode: "onChange" });
   const [success, setSuccess] = useState(false);

   const onSubmit = async ({ email }) => {
      try {
         const { data } = await userService.rememberPassword({ email });
         setSuccess(data || true);
      } catch (error) {
         console.log(error);
         if (error?.response?.status === 400) {
            const errors = error?.response?.data;
            if (errors)
               for (let key in errors)
                  setError(key, { type: "server", message: errors[key] });
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

   if (success) return <PasswordEmailSendSuccess mail={success} size="h6" />;

   return (
      <InCenterAuth>
         <Box sx={{ textAlign: "center", mb: 3 }}>
            <Typography
               fontWeight={600}
               color={!isValid ? "secondary" : "primary"}
               sx={{ mb: 1 }}
               variant="h5"
               component="h2"
            >
               Forgot your password?
            </Typography>
            <Typography
               // fontWeight={600}
               color={"secondary"}
               variant="body2"
               component="h2"
            >
               Write your email
            </Typography>
            <Typography
               // fontWeight={600}
               color={"secondary"}
               variant="body2"
               component="h2"
            >
               we will send you a link to change your password
            </Typography>
         </Box>
         <form
            onChange={handleChange}
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            onSubmit={handleSubmit(onSubmit)}
         >
            <StyledTextField
               errors={errors}
               register={register("email", {
                  required: "required field",
                  pattern: {
                     value: EMAIL_PATTERN,
                     message: "mail must be in the format - example@mail.com",
                  },
                  maxLength: {
                     value: EMAIL_MAX_LENGTH,
                     message: `maximum ${EMAIL_MAX_LENGTH} characters`,
                  },
               })}
               label="Email"
            />
            {errors?.root?.server && (
               <StyledAlert severity="error" variant="filled" hidden={true}>
                  {errors?.root?.server?.message}
               </StyledAlert>
            )}
            <StyledLoadingButton
               loading={isSubmitting}
               endIcon={<DoubleArrowIcon />}
               disabled={!isValid}
               type="submit"
               sx={{ mt: errors?.root?.server ? 0 : 3 }}
               variant="contained"
            >
               Send
            </StyledLoadingButton>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
               <NavLink to={USER_SIGN_IN_ROUTE}>
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
                     Sign In
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

export default Remember;
