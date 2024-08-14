import { Box, Button, useTheme } from "@mui/material";
import { ContainerComponent } from "../../../component/general/wrappers/ContainerComponent";
import InCenter from "../../../component/general/wrappers/InCenter";
import BreadcrumbsComponent from "../../../component/general/BreadcrumbsComponent";
import { useContext, useState } from "react";
import { StepperComponent } from "../../../component/User/StepperComponent";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import ScreenshotIcon from "@mui/icons-material/Screenshot";
import RecommendIcon from "@mui/icons-material/Recommend";
import { UserCashOutForm } from "../../../component/User/deposit/UserCashOutForm";
import { Context } from "../../../User";
import PaymentsIcon from "@mui/icons-material/Payments";
import AdressMatic from "../../../component/User/deposit/AdressMatic";
import { Screenshot } from "../../../component/User/deposit/Screenshot";
import { End } from "../../../component/User/deposit/End";
import { useQuery } from "@tanstack/react-query";
import UserService from "../../../services/UserService";
import { CashOutAccordion } from "../../../component/general/cashOut/CashOutAccordion";
import { UserCashOutPendingItem } from "../../../component/User/cashOut/UserCashOutPendingItem";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { CashOutHistoryItem } from "../../../component/general/cashOut/CashOutHistoryItem";
import { observer } from "mobx-react-lite";

const steps = [
   { name: "Create a request", icon: <RequestQuoteIcon fontSize="small" /> },
   { name: "Address Matic", icon: <PaymentsIcon fontSize="small" /> },
   { name: "Сommission", icon: <ScreenshotIcon fontSize="small" /> },
   { name: "End", icon: <RecommendIcon fontSize="small" /> },
];

export const User_CashOut = observer(() => {
   const theme = useTheme();

   const { user } = useContext(Context);

   const [activeStep, setActiveStep] = useState(0);
   const [cashOutData, setCashOutData] = useState({});

   const { isLoading: isLoadingPending, data: dataPending } = useQuery({
      queryKey: ["cashOutPending"],
      queryFn: UserService.getCashOutRequestPending,
      select: ({ data }) => data,
   });
   const { isLoading: isLoadingHistory, data: dataHistory } = useQuery({
      queryKey: ["cashOutHistory"],
      queryFn: UserService.getCashOutRequestHistory,
      select: ({ data }) => data,
   });

   console.log(dataPending);

   const [expandedPending, setExpandedPending] = useState(null);

   const handleChangePending = (panel) => (event, isExpanded) => {
      setExpandedPending(isExpanded ? panel : false);
   };
   const [expandedHistory, setExpandedHistory] = useState(null);

   const handleChangeHistory = (panel) => (event, isExpanded) => {
      setExpandedHistory(isExpanded ? panel : false);
   };

   const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
   };

   const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
   };
   const handleRefresh = () => {
      setActiveStep(0);
   };

   const { otherDeposit, referralDeposit, nftDeposit } = user;
   console.log(otherDeposit);

   const StepperBoxArray = [
      <UserCashOutForm
         handleNext={handleNext}
         otherDeposit={otherDeposit}
         referralDeposit={referralDeposit}
         nftDeposit={nftDeposit}
         setCashOutData={setCashOutData}
      />,
      <AdressMatic
         handleNext={handleNext}
         handleBack={handleBack}
         setCashOutData={setCashOutData}
      />,
      <Screenshot
         sum={cashOutData?.sum}
         handleBack={handleBack}
         handleNext={handleNext}
         setCashOutData={setCashOutData}
      />,
      <End cashOutData={cashOutData} handleRefresh={handleRefresh} />,
   ];

   return (
      <ContainerComponent>
         <Box mb={5}>
            <BreadcrumbsComponent
               main={true}
               options={[{ name: "Cash Out" }]}
            />
         </Box>

         <InCenter
            style={{
               p: { xs: 0 },
            }}
            maxWidth="md"
         >
            <Box display={"flex"} flexDirection={"column"} gap={2}>
               <Box
                  flex={1}
                  sx={{
                     borderRadius: { xs: "0px", sm: "10px" },
                     p: 2,
                     borderWidth: "1px",
                     borderStyle: "solid",
                     borderColor: theme.palette.background.light,
                     background: theme.palette.secondary.light,
                     display: "flex",
                     flexDirection: "column",
                     gap: 2,
                     ml: { xs: -2, sm: 0 },
                     mr: { xs: -2, sm: 0 },
                     // mb: 10,
                  }}
               >
                  <Box pb={6}>
                     <StepperComponent steps={steps} activeStep={activeStep} />
                  </Box>
                  {StepperBoxArray.find((el, i) => i === activeStep)}
               </Box>
               <Grid container spacing={2} columns={2}>
                  <Grid xs={2} sm={1}>
                     <CashOutAccordion
                        expanded={expandedPending}
                        expandedValue={1}
                        label={"Pending"}
                        data={dataPending}
                        handleChange={handleChangePending}
                        ItemComponent={UserCashOutPendingItem}
                        isLoading={isLoadingPending}
                     />
                  </Grid>
                  <Grid xs={2} sm={1}>
                     <CashOutAccordion
                        expanded={expandedHistory}
                        expandedValue={1}
                        label={"History"}
                        data={dataHistory}
                        handleChange={handleChangeHistory}
                        ItemComponent={CashOutHistoryItem}
                        isLoading={isLoadingHistory}
                     />
                  </Grid>
               </Grid>
            </Box>
         </InCenter>
      </ContainerComponent>
   );
});
