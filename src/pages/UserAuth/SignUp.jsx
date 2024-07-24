import { blue } from "@mui/material/colors";
import { Box, Typography, useTheme } from "@mui/material";
import { useForm } from "react-hook-form";
import { useState } from "react";
import userService from "../../services/UserService";
import { NavLink } from "react-router-dom";
import InCenterAuth from "../../component/general/wrappers/InCenterAuth";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { LoadingButton } from "@mui/lab";
import { Alert } from "@mui/material";
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from "../../validateConfig";
import { USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH } from "../../validateConfig";
import { NAME_MAX_LENGTH, NAME_MIN_LENGTH } from "../../validateConfig";
import { EMAIL_PATTERN, EMAIL_MAX_LENGTH } from "../../validateConfig";
import RegisterSuccess from "../../component/User/Success/RegisterSuccess";
import { StyledTextField } from "../../component/general/Form/StyledTextField";
import { StyledPassword } from "../../component/general/Form/StyledPassword";
import { StyledAlert } from "../../component/general/StyledAlert";
import { StyledLoadingButton } from "../../component/general/StyledLoadingButton";
import { USER_SIGN_IN_ROUTE } from "../../route/RouterConfig";

const SignUp = () => {
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

   const handleChange = () => {
      clearErrors("root");
   };

   const onSubmit = async (values) => {
      try {
         const { data } = await userService.signUp(values);
         setSuccess(data);
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
   if (success) return <RegisterSuccess mail={success} />;

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
            Sign Up
         </Typography>
         <form
            onChange={handleChange}
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            onSubmit={handleSubmit(onSubmit)}
         >
            <StyledTextField
               errors={errors}
               register={register("username", {
                  required: "required field",
                  minLength: {
                     value: USERNAME_MIN_LENGTH,
                     message: `minimum ${USERNAME_MIN_LENGTH} characters`,
                  },
                  maxLength: {
                     value: USERNAME_MAX_LENGTH,
                     message: `maximum ${USERNAME_MAX_LENGTH} characters`,
                  },
               })}
               label="Username"
            />
            <StyledTextField
               errors={errors}
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
               label="Email"
            />
            <StyledTextField
               errors={errors}
               register={register("name", {
                  required: "required field",
                  minLength: {
                     value: NAME_MIN_LENGTH,
                     message: `minimum ${NAME_MIN_LENGTH} characters`,
                  },
                  maxLength: {
                     value: NAME_MAX_LENGTH,
                     message: `maximum ${NAME_MAX_LENGTH} characters`,
                  },
               })}
               label="Name"
            />
            <StyledPassword
               label={"Password"}
               register={register("password", {
                  required: "required field",
                  minLength: {
                     value: PASSWORD_MIN_LENGTH,
                     message: `minimum ${PASSWORD_MIN_LENGTH} characters`,
                  },
                  deps: ["rePassword"],
                  maxLength: {
                     value: PASSWORD_MAX_LENGTH,
                     message: `maximum ${PASSWORD_MAX_LENGTH} characters`,
                  },
               })}
               errors={errors}
            />
            <StyledPassword
               label={"Enter your password again"}
               errors={errors}
               register={register("rePassword", {
                  required: "required field",
                  maxLength: {
                     value: PASSWORD_MAX_LENGTH,
                     message: `maximum ${PASSWORD_MAX_LENGTH} characters`,
                  },
                  validate: (v) => getValues("password") === v,
               })}
               errMessage="passwords do not match"
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
               sx={{mt:errors?.root?.server?0:3,}}
               variant="contained"
            >
               Надіслати
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
            </Box>
         </form>
      </InCenterAuth>
   );
};

export default SignUp;
