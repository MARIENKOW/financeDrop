import { Box, useTheme, Grid } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import {
   CASH_OUT_SUM_MAX_VALUE,
   CASH_OUT_SUM_MIN_VALUE,
   CASH_OUT_SUM_PATTERN,
} from "../../../validateConfig";
import { StyledAlert } from "../../general/StyledAlert";
import { StyledLoadingButton } from "../../general/StyledLoadingButton";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { StyledNumberField } from "../../general/Form/StyledNumberField";
import UserService from "../../../services/UserService";
import { StyledSelect } from "../../general/Form/StyledSelect";
import { useEffect, useState } from "react";
import { Title } from "../../general/Title";

export const UserCashOutForm = ({
   nftDeposit,
   otherDeposit,
   referralDeposit,
   handleNext,
   setCashOutData,
}) => {
   const [maxSum, setMaxSum] = useState("");

   const maxSums = {
      1: parseFloat(nftDeposit),
      2: parseFloat(referralDeposit),
      3: parseFloat(otherDeposit),
   };

   const theme = useTheme();

   const {
      register,
      handleSubmit,
      setError,
      clearErrors,
      control,
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
         await UserService.checkCashOutRequest(data);

         setCashOutData((prev) => ({ ...prev, ...data }));

         handleNext();
      } catch (error) {
         console.log(error);
         if (
            error?.response?.status === 400 ||
            error?.response?.status === 403
         ) {
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

   return (
      <Box flex={1} display={"flex"} flexDirection={"column"}>
         <form
            style={{ flex: "1", display: "flex", flexDirection: "column" }}
            onChange={handleChange}
            onSubmit={handleSubmit(onSubmit)}
            action=""
         >
            <Box
               flex={1}
               sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
               <Box flex={1} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Box display={"flex"} justifyContent={"center"}>
                     <Title
                        sx={{
                           color: theme.palette.secondary.contrastText,
                           maxWidth: "350px",
                        }}
                        label={
                           "Choose the deposit and how much money you want to cash out"
                        }
                     />
                  </Box>

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
                  </Grid>
               </Box>
                  {errors?.root?.server && (
                     <StyledAlert
                        severity="error"
                        variant="filled"
                        hidden={true}
                     >
                        {errors?.root?.server?.message}
                     </StyledAlert>
                  )}
               <Box display={"flex"} justifyContent={"end"}>
                  <StyledLoadingButton
                     // fullWidth
                     loading={isSubmitting}
                     endIcon={<DoubleArrowIcon />}
                     disabled={!isValid}
                     type="submit"
                     sx={{ mt: errors?.root?.server ? 0 : 3 }}
                     variant="contained"
                  >
                     next
                  </StyledLoadingButton>
               </Box>
            </Box>
         </form>
      </Box>
   );
};
