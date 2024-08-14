import { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { useForm } from "react-hook-form";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import {
   PASSWORD_MAX_LENGTH,
   PASSWORD_MIN_LENGTH,
} from "../../../validateConfig";
import { StyledPassword } from "../../../component/general/Form/StyledPassword";
import { Title } from "../../../component/general/Title";
import { StyledLoadingButton } from "../../../component/general/StyledLoadingButton";
import { StyledAlert } from "../../../component/general/StyledAlert";
import UserService from "../../../services/UserService";
import { enqueueSnackbar } from "notistack";
import AdminService from "../../../services/AdminService";

const AdminChangePassword = () => {
   const theme = useTheme();

   const {
      handleSubmit,
      register,
      getValues,
      setError,
      reset,
      clearErrors,
      formState: { errors, isValid, isSubmitting },
   } = useForm({ mode: "all" });

   const onSubmit = async (obj) => {
      try {
         await AdminService.changePassword(obj);
         reset()
         enqueueSnackbar(`Password change was a success!`, {
            variant: "success",
         });
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
               label={"Change password"}
            />
            <StyledPassword
               label={"Current Password"}
               register={register("currentPassword", {
                  required: "required field",
                  maxLength: {
                     value: PASSWORD_MAX_LENGTH,
                     message: `maximum ${PASSWORD_MAX_LENGTH} characters`,
                  },
               })}
               errors={errors}
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
               <StyledAlert variant="filled" severity="error" hidden={true}>
                  {errors?.root?.server?.message}
               </StyledAlert>
            )}
            <StyledLoadingButton
               loading={isSubmitting}
               endIcon={<DoubleArrowIcon />}
               disabled={!isValid}
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

export default AdminChangePassword;
