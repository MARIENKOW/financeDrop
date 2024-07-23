import InCenterAuth from "../../general/wrappers/InCenterAuth";
import { StyledTextField } from "../../general/Form/StyledTextField";
import { StyledLoadingButton } from "../../general/StyledLoadingButton";
import { useForm } from "react-hook-form";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { Title } from "../../general/Title";
import {
   NFT_DAYS_MAX_VALUE,
   NFT_DAYS_MIN_VALUE,
   NFT_DAYS_PATTERN,
   NFT_DESCRIPTION_MAX_LENGTH,
   NFT_LINK_MAX_LENGTH,
   NFT_NAME_MAX_LENGTH,
   NFT_NAME_MIN_LENGTH,
   NFT_PERCENT_MAX_VALUE,
   NFT_PERCENT_MIN_VALUE,
   NFT_PERCENT_PATTERN,
   NFT_PRICE_MAX_VALUE,
   NFT_PRICE_MIN_VALUE,
   NFT_PRICE_PATTERN,
} from "../../../validateConfig";
import { StyledNumberField } from "../../general/Form/StyledNumberField";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DragAndDrop from "../../../component/general/Form/DragAndDrop";
import { Box, useTheme } from "@mui/material";
import { StyledAlert } from "../../general/StyledAlert";

export const NftForm = ({ submit, nft }) => {
   const theme = useTheme();

   const defaultValues = nft
      ? {
           name: nft?.name,
           link: nft?.link,
           price: nft?.price,
           percent: nft?.percent,
           description: nft?.description,
           days: nft?.days,
           img: !!nft?.img?.path,
           imgPreview: nft?.img?.path,
        }
      : {
           name: null,
           link: null,
           price: null,
           percent: null,
           description: null,
           days: null,
           img: null,
           imgPreview: null,
        };

   const {
      register,
      clearErrors,
      handleSubmit,
      setError,
      control,
      resetField,
      setValue,
      formState: { isValid, errors, isSubmitting, isDirty, dirtyFields },
   } = useForm({
      mode: "all",
      defaultValues,
   });

   const onSubmit = submit(setError, dirtyFields);

   const handleChange = () => {
      clearErrors("root");
   };
   return (
      <form
         onChange={handleChange}
         style={{ display: "flex", flexDirection: "column", gap: "15px" }}
         onSubmit={handleSubmit(onSubmit)}
      >
         <Box
            sx={{
               display: "flex",
               flexDirection: { sm: "row", xs: "column" },
               gap: 2,
            }}
         >
            <Box
               sx={{
                  flex: "50% 0 1",
               }}
            >
               <DragAndDrop
                  clearErrors={clearErrors}
                  setError={setError}
                  control={control}
                  name={"img"}
                  rules={{
                     required: "required field",
                  }}
                  sx={{ borderRadius: "10px" }}
                  resetField={resetField}
                  setValue={setValue}
                  imgdefault={defaultValues.imgPreview}
               />
            </Box>
            <Box
               sx={{
                  display: "flex",
                  flex: "50% 0 1",
                  flexDirection: "column",
                  gap: "15px",
               }}
            >
               <StyledTextField
                  errors={errors}
                  register={register("name", {
                     required: "required field",
                     minLength: {
                        value: NFT_NAME_MIN_LENGTH,
                        message: `minimum ${NFT_NAME_MIN_LENGTH} characters`,
                     },
                     maxLength: {
                        value: NFT_NAME_MAX_LENGTH,
                        message: `maximum ${NFT_NAME_MAX_LENGTH} characters`,
                     },
                  })}
                  label="Name"
               />
               <StyledNumberField
                  label="Price"
                  register={register("price", {
                     required: "required field",
                     pattern: {
                        value: NFT_PRICE_PATTERN,
                        message: "value must be in the format - 999 or 999.09",
                     },
                     min: {
                        value: NFT_PRICE_MIN_VALUE,
                        message: `minimum ${NFT_PRICE_MIN_VALUE}`,
                     },
                     max: {
                        value: NFT_PRICE_MAX_VALUE,
                        message: `maximum ${NFT_PRICE_MAX_VALUE}`,
                     },
                  })}
                  startAdornment={"$"}
                  errors={errors}
               />
               <Box sx={{ display: "flex", gap: 2 }}>
                  <Box sx={{ flex: "50% 0 1" }}>
                     <StyledNumberField
                        register={register("days", {
                           required: "required field",
                           pattern: {
                              value: NFT_DAYS_PATTERN,
                              message: "value must be in the format - 99",
                           },
                           min: {
                              value: NFT_DAYS_MIN_VALUE,
                              message: `minimum ${NFT_DAYS_MIN_VALUE}`,
                           },
                           max: {
                              value: NFT_DAYS_MAX_VALUE,
                              message: `maximum ${NFT_DAYS_MAX_VALUE}`,
                           },
                        })}
                        options={{ fullwidth: true }}
                        label="Days"
                        errors={errors}
                        startAdornment={<CalendarMonthIcon fontSize="small" />}
                     />
                  </Box>
                  <Box sx={{ flex: "50% 0 1" }}>
                     <StyledNumberField
                        register={register("percent", {
                           required: "required field",
                           pattern: {
                              value: NFT_PERCENT_PATTERN,
                              message: "value must be in the format - 99",
                           },
                           min: {
                              value: NFT_PERCENT_MIN_VALUE,
                              message: `minimum ${NFT_PERCENT_MIN_VALUE}`,
                           },
                           max: {
                              value: NFT_PERCENT_MAX_VALUE,
                              message: `maximum ${NFT_PERCENT_MAX_VALUE}`,
                           },
                        })}
                        label="Percent"
                        errors={errors}
                        startAdornment={"%"}
                     />
                  </Box>
               </Box>
               <StyledTextField
                  errors={errors}
                  register={register("description", {
                     required: "required field",
                     maxLength: {
                        value: NFT_DESCRIPTION_MAX_LENGTH,
                        message: `maximum ${NFT_DESCRIPTION_MAX_LENGTH} characters`,
                     },
                  })}
                  options={{
                     multiline: true,
                     rows: 3,
                  }}
                  label="Description"
               />
               <StyledTextField
                  errors={errors}
                  register={register("link", {
                     required: "required field",
                     maxLength: {
                        value: NFT_LINK_MAX_LENGTH,
                        message: `maximum ${NFT_LINK_MAX_LENGTH} characters`,
                     },
                  })}
                  label="Link"
               />
            </Box>
         </Box>
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
            sx={{ mt: errors?.root?.server ? 0 : 3 }}
            variant="contained"
         >
            Submit
         </StyledLoadingButton>
      </form>
   );
};
