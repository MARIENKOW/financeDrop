import { Box, useTheme, Typography, InputAdornment, Grid } from "@mui/material";
import { StyledTextField } from "../../general/Form/StyledTextField";
import { Controller, useForm } from "react-hook-form";
import {
   CASH_OUT_SUM_MAX_VALUE,
   CASH_OUT_SUM_MIN_VALUE,
   CASH_OUT_SUM_PATTERN,
   OTHER_DEPOSIT_DESCRIPTION_MAX_LENGTH,
} from "../../../validateConfig";
import { StyledAlert } from "../../general/StyledAlert";
import { StyledLoadingButton } from "../../general/StyledLoadingButton";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { StyledNumberField } from "../../general/Form/StyledNumberField";
import { enqueueSnackbar } from "notistack";
import { useQueryClient } from "@tanstack/react-query";
import UserService from "../../../services/UserService";
import { StyledSelect } from "../../general/Form/StyledSelect";
import { useEffect, useState } from "react";

export const CashOutForm = ({
   nftDeposit,
   otherDeposit,
   referralDeposit,
   id,
}) => {
   const [maxSum, setMaxSum] = useState("");

   const maxSums = {
      1: parseFloat(nftDeposit),
      2: parseFloat(referralDeposit),
      3: parseFloat(otherDeposit),
   };

   const queryClient = useQueryClient();

   const theme = useTheme();

   const {
      register,
      handleSubmit,
      setError,
      clearErrors,
      reset,
      control,
      resetField,
      trigger,
      formState: { errors, isSubmitting, isValid },
   } = useForm({ mode: "all", defaultValues: { deposit_type: "" } });

   useEffect(() => {
      if (maxSum !== "") {
         trigger();
      }
   }, [maxSum]);

   const handleChange = () => {
      clearErrors("root");
   };

   const onSubmit = async (data) => {
      try {
         await UserService.cashOut({ ...data, user_id: id });
         enqueueSnackbar(`money was successfully sent!`, {
            variant: "success",
         });
         await queryClient.invalidateQueries({ queryKey: ["user", id] });
         await queryClient.invalidateQueries({ queryKey: ["getNotSoldAdmin"] });
         // reset();
         resetField('sum')
         resetField('description')
      } catch (error) {
         console.log(error);
         if (error?.response?.status === 400) {
            const errors = error?.response?.data || {};
            for (let key in errors) {
               if (key === "sum")
                  await queryClient.invalidateQueries({
                     queryKey: ["user", id],
                  });
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
            Cash out
         </Typography>
         <form
            onChange={handleChange}
            onSubmit={handleSubmit(onSubmit)}
            action=""
         >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
               <Grid container spacing={2} columns={5}>
                  <Grid item xs={3}>
                     <Controller
                        control={control}
                        name="deposit_type"
                        rules={{ required: "required field" }}
                        render={({
                           field: { value, onChange, name },
                           formState: { errors },
                        }) => (
                           <StyledSelect
                              label={"Deposit"}
                              error={errors}
                              value={value}
                              handleChange={({ target }) => {
                                 onChange(target?.value);
                                 setMaxSum(maxSums[target?.value]);
                              }}
                              name={name}
                              arr={[
                                 [1, `Nft ($ ${nftDeposit})`],
                                 [2, `Referral ($ ${referralDeposit})`],
                                 [3, `Other ($ ${otherDeposit})`],
                              ]}
                           />
                        )}
                     />
                  </Grid>

                  <Grid item xs={2}>
                     <StyledNumberField
                        // sx={{ width: "200px" }}
                        options={{ fullWidth: true }}
                        register={register("sum", {
                           required: "required field",
                           pattern: {
                              value: CASH_OUT_SUM_PATTERN,
                              message:
                                 "value must be in the format - 99 or 99.99",
                           },
                           min: {
                              value: CASH_OUT_SUM_MIN_VALUE,
                              message: `minimum ${CASH_OUT_SUM_MIN_VALUE}`,
                           },
                           max: {
                              value: maxSum || CASH_OUT_SUM_MAX_VALUE,
                              message: `maximum ${
                                 maxSum || CASH_OUT_SUM_MAX_VALUE
                              }`,
                           },
                           validate: () => maxSum !== 0.0,
                        })}
                        label="Money"
                        errors={errors}
                        startAdornment={"$"}
                     />
                  </Grid>
                  <Grid item xs={5}>
                     <StyledTextField
                        options={{
                           InputProps: {
                              startAdornment: (
                                 <InputAdornment
                                    sx={{ mr: "3px" }}
                                    position="start"
                                 >
                                    cash out:
                                 </InputAdornment>
                              ),
                           },
                           fullWidth: true,
                        }}
                        register={register("description", {
                           maxLength: {
                              value: OTHER_DEPOSIT_DESCRIPTION_MAX_LENGTH,
                              message: `maximum ${OTHER_DEPOSIT_DESCRIPTION_MAX_LENGTH} characters`,
                           },
                        })}
                        label={"Description"}
                        errors={errors}
                        errMessage="*optional field"
                        helper={true}
                     />
                  </Grid>
               </Grid>
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
