import { Box, useTheme, Typography } from "@mui/material";
import { StyledTextField } from "../../general/Form/StyledTextField";
import { useForm } from "react-hook-form";
import {
   OTHER_DEPOSIT_DESCRIPTION_MAX_LENGTH,
   OTHER_DEPOSIT_SUM_MAX_VALUE,
   OTHER_DEPOSIT_SUM_MIN_VALUE,
   OTHER_DEPOSIT_SUM_PATTERN,
} from "../../../validateConfig";
import { StyledAlert } from "../../general/StyledAlert";
import { StyledLoadingButton } from "../../general/StyledLoadingButton";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { StyledNumberField } from "../../general/Form/StyledNumberField";
import { enqueueSnackbar } from "notistack";
import { useQueryClient } from "@tanstack/react-query";
import UserService from "../../../services/UserService";

export const OtherDepositForm = ({ id }) => {
   const queryClient = useQueryClient();

   const theme = useTheme();

   const {
      register,
      handleSubmit,
      setError,
      clearErrors,
      reset,
      formState: { errors, isSubmitting, isValid },
   } = useForm({ mode: "all" });

   const handleChange = () => {
      clearErrors("root");
   };

   const onSubmit = async (data) => {
      try {
         await UserService.createOtherDepositEvent({ ...data, user_id: id });
         enqueueSnackbar(`money was successfully sent!`, {
            variant: "success",
         });
         await queryClient.invalidateQueries({ queryKey: ["user", id] });
         await queryClient.invalidateQueries({ queryKey: ["getNotSoldAdmin"] });
         reset();
      } catch (error) {
         console.log(error);
         setError("root.server", {
            type: "server",
            message: "Oops! something went wrong, try again later",
         });
      }
   };

   return (
      <Box
         sx={{
            borderRadius: "10px",
            p: 2,
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: theme.palette.background.light,
            background: theme.palette.secondary.light,
         }}
      >
         {" "}
         <Typography mb={2} color={"secondary"} variant="body1">
            Send money
         </Typography>
         <form
            onChange={handleChange}
            onSubmit={handleSubmit(onSubmit)}
            action=""
         >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
               <Box gap={2} display={"flex"}>
                  <StyledTextField
                     register={register("description", {
                        required: "required field",
                        maxLength: {
                           value: OTHER_DEPOSIT_DESCRIPTION_MAX_LENGTH,
                           message: `maximum ${OTHER_DEPOSIT_DESCRIPTION_MAX_LENGTH} characters`,
                        },
                     })}
                     options={{ fullWidth: true }}
                     label={"Description"}
                     errors={errors}
                  />
                  <StyledNumberField
                     sx={{ width: "200px" }}
                     register={register("sum", {
                        required: "required field",
                        pattern: {
                           value: OTHER_DEPOSIT_SUM_PATTERN,
                           message: "value must be in the format - 99 or 99.99",
                        },
                        min: {
                           value: OTHER_DEPOSIT_SUM_MIN_VALUE,
                           message: `minimum ${OTHER_DEPOSIT_SUM_MIN_VALUE}`,
                        },
                        max: {
                           value: OTHER_DEPOSIT_SUM_MAX_VALUE,
                           message: `maximum ${OTHER_DEPOSIT_SUM_MAX_VALUE}`,
                        },
                     })}
                     label="Money"
                     errors={errors}
                     startAdornment={"$"}
                  />
               </Box>
               {errors?.root?.server && (
                  <StyledAlert severity="error" variant="filled" hidden={true}>
                     {errors?.root?.server?.message}
                  </StyledAlert>
               )}
               <StyledLoadingButton
                  fullWidth
                  loading={isSubmitting}
                  endIcon={<DoubleArrowIcon />}
                  disabled={!isValid}
                  type="submit"
                  sx={{ mt: errors?.root?.server ? 0 : 3 }}
                  variant="contained"
               >
                  Send
               </StyledLoadingButton>
            </Box>
         </form>
      </Box>
   );
};
