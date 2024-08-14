import { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Button, Box, useTheme } from "@mui/material";
import { useForm } from "react-hook-form";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { StyledAlert } from "../../../component/general/StyledAlert";
import { StyledLoadingButton } from "../../../component/general/StyledLoadingButton";
import { StyledTextField } from "../../../component/general/Form/StyledTextField";
import { Title } from "../../../component/general/Title";
import {
   ADDRESS_MATIC_MAX_LENGTH,
   NFT_PERCENT_PATTERN,
} from "../../../validateConfig";
import { enqueueSnackbar } from "notistack";
import { SiteContext } from "../../..";
import { StyledNumberField } from "../../../component/general/Form/StyledNumberField";

const ChangeCashOutPercent = () => {
   const theme = useTheme();

   const { data, changeCashOutPercent } = useContext(SiteContext);

   const { cashOutPercent } = data;

   const {
      handleSubmit,
      register,
      setError,
      clearErrors,
      reset,
      formState: { errors, isValid, isSubmitting, isDirty },
   } = useForm({ mode: "onChange", defaultValues: { cashOutPercent } });

   useEffect(() => {
      reset({ cashOutPercent });
   }, [cashOutPercent]);

   const onSubmit = async (data) => {
      try {
         await changeCashOutPercent(data);
         enqueueSnackbar(`Cash Out percent change was a success!`, {
            variant: "success",
         });
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
               label={"Change Cash Out percent"}
            />

            <StyledNumberField
               register={register("cashOutPercent", {
                  required: "required field",
                  pattern: {
                     value: NFT_PERCENT_PATTERN,
                     message: "value must be in the format - 99",
                  },
                  min: {
                     value: 1,
                     message: `minimum ${1}`,
                  },
                  max: {
                     value: 100,
                     message: `maximum ${100}`,
                  },
               })}
               label="Percent"
               errors={errors}
               startAdornment={"%"}
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

export default observer(ChangeCashOutPercent);
