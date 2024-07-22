import InCenterAuth from "../../component/general/wrappers/InCenterAuth";
import { StyledTextField } from "../../component/general/Form/StyledTextField";
import { StyledLoadingButton } from "../../component/general/StyledLoadingButton";
import { useForm } from "react-hook-form";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { Title } from "../../component/general/Title";
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
} from "../../validateConfig";
import { StyledNumberField } from "../../component/general/Form/StyledNumberField";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DragAndDrop from "../../component/general/Form/DragAndDrop";
import nftService from "../../services/NftService";
import { Container, Box, useTheme } from "@mui/material";
import { StyledAlert } from "../../component/general/StyledAlert";

const NftAdd = () => {
   const theme = useTheme();

   const {
      register,
      clearErrors,
      handleSubmit,
      setError,
      control,
      resetField,
      setValue,
      formState: { isValid, errors, isSubmitting },
   } = useForm({ mode: "all" });

   const onSubmit = async (data) => {
      try {
         const formData = new FormData();
         for(let key in data){
            formData.append(key,data[key])
         }
         await nftService.create(formData);
      } catch (error) {
         console.log(error);
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
      <InCenterAuth
         style={{
            background: theme.palette.background.dark,
            p: { xs: 1, sm: 4 },
         }}
         maxWidth="md"
      >
         <Title label={"Add new NFT"} isValid={isValid} />
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
                           message:
                              "value must be in the format - 999 or 999.09",
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
                           startAdornment={
                              <CalendarMonthIcon fontSize="small" />
                           }
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
               disabled={!isValid}
               type="submit"
               sx={{ mt: errors?.root?.server ? 0 : 3 }}
               variant="contained"
            >
               Submit
            </StyledLoadingButton>
         </form>
      </InCenterAuth>
   );
};

export default NftAdd;
