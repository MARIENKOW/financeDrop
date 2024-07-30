import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import NftService from "../../../services/NftService";
import { $AdminApi } from "../../../http";
import NftCard from "../../general/nft/NftCard";
import { StyledLoadingButton } from "../../general/StyledLoadingButton";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
   AccordionSummary,
   Box,
   FormHelperText,
   Typography,
} from "@mui/material";
import { StyledAccordion } from "../../general/StyledAccordion";
import { useTheme } from "@emotion/react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AccordionDetails } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import NftCard_skeleton from "../../general/skeletons/NftCard_skeleton";
import { Empty } from "../../general/Empty";
import ErrorElement from "../../general/ErrorElement";

export const NftSendAccordion = ({ handleChange, expanded, id }) => {
   const theme = useTheme();

   const queryClient = useQueryClient();
   const nftServiceAdmin = new NftService($AdminApi);

   const {
      data,
      isLoading,
      error: queryError,
   } = useQuery({
      queryKey: ["getNotSoldAdmin"],
      queryFn: nftServiceAdmin.getNftNotSold,
      select: ({ data }) => data,
   });

   const {
      handleSubmit,
      getValues,
      getFieldState,

      formState: { isValid, errors, isSubmitting },
      control,
   } = useForm({ mode: "all", defaultValues: { nft: [] } });

   const onSubmit = async (data) => {
      try {
         await nftServiceAdmin.sendNft(data, id);
         await queryClient.invalidateQueries({ queryKey: ["user", id] });
         await queryClient.invalidateQueries({ queryKey: ["getNotSoldAdmin"] });
         enqueueSnackbar(`NFT successfully send`, { variant: "success" });
      } catch (error) {
         enqueueSnackbar(`"Oops! something went wrong, try again later"`, {
            variant: "error",
         });
      }
   };

   return (
      <StyledAccordion expanded={expanded === 3} onChange={handleChange(3)}>
         <AccordionSummary expandIcon={<ExpandMoreIcon color="secondary" />}>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
               <Typography color={theme.palette.secondary.main}>
                  Send NFT
               </Typography>
               {/* <Typography
                  fontWeight={600}
                  variant="body1"
                  color={theme.palette.secondary.contrastText}
               >
                  ({getValues('nft').length || 0})
               </Typography> */}
            </Box>
         </AccordionSummary>
         <AccordionDetails>
            <form onSubmit={handleSubmit(onSubmit)}>
               <Controller
                  control={control}
                  rules={{ required: "required field" }}
                  name="nft"
                  render={({
                     field: { onChange, value },
                     fieldState: { error },
                  }) => (
                     <Box>
                        <Box
                           sx={{ alignItems:'end',overflowX: "scroll", display: "flex", gap: 1 }}
                        >
                           {isLoading ? (
                              Array(4)
                                 .fill(4)
                                 .map((el, id) => (
                                    <NftCard_skeleton
                                       sx={{ minWidth: "200px" }}
                                       key={id}
                                    />
                                 ))
                           ) : queryError ? (
                              <ErrorElement
                                 buttons={false}
                                 message={queryError?.message}
                              />
                           ) : !data || data.length === 0 ? (
                              <Empty />
                           ) : (
                              data?.map((el) => (
                                 <NftCard
                                    key={el?.id}
                                    isChecked={
                                       !!value.find((val) => val === el.id)
                                    }
                                    onClick={() => {
                                       if (
                                          !!value.find((val) => val === el.id)
                                       ) {
                                          onChange(
                                             value.filter(
                                                (val) => val !== el.id
                                             )
                                          );
                                       } else {
                                          onChange([...value, el.id]);
                                       }
                                    }}
                                    sx={{
                                       width: "200px",
                                       minWidth: "200px",
                                       cursor: "pointer",
                                       "&:hover": !value.find(
                                          (val) => val === el.id
                                       ) && {
                                          background:
                                             theme.palette.background.main,
                                       },
                                    }}
                                    nft={el}
                                 />
                              ))
                           )}
                        </Box>

                        <FormHelperText error={!!error}>
                           {error?.message || error}
                        </FormHelperText>
                     </Box>
                  )}
               />
               <StyledLoadingButton
                  loading={isSubmitting}
                  endIcon={<DoubleArrowIcon />}
                  disabled={!isValid}
                  sx={{ mt: errors?.root?.server ? 0 : 3 }}
                  type="submit"
                  fullWidth
                  variant="contained"
               >
                  Send
               </StyledLoadingButton>
            </form>
         </AccordionDetails>
      </StyledAccordion>
   );
};
