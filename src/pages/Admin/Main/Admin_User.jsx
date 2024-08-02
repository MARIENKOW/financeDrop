import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import UserService from "../../../services/UserService";
import ErrorElement from "../../../component/general/ErrorElement";
import { ContainerComponent } from "../../../component/general/wrappers/ContainerComponent";
import { Title } from "../../../component/general/Title";
import { Box, Typography, useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import BreadcrumbsComponent from "../../../component/general/BreadcrumbsComponent";
import { UserFullInfoAdmin } from "../../../component/Admin/user/UserFullInfoAdmin";
import { useState } from "react";
import { NftSendAccordion } from "../../../component/Admin/nft/NftSendAccordion";
import { NftActiveAccordion } from "../../../component/Admin/nft/NftActiveAccordion";
import { NftInactiveAccordion } from "../../../component/Admin/nft/NftInactiveAccordion";
import { DepositAccordion } from "../../../component/general/deposit/DepositAccordion";
import { OtherDepositForm } from "../../../component/Admin/deposit/OtherDepositForm";
import { AdminUser_skeleton } from "../../../component/Admin/skeletons/AdminUser_skeleton";
import { CashOutForm } from "../../../component/Admin/deposit/CashOutForm";

export const Admin_User = () => {
   const theme = useTheme();

   const { id } = useParams();

   const [expanded, setExpanded] = useState();

   const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
   };
   const [expandedDeposit, setExpandedDeposit] = useState();

   const handleChangeDeposit = (panel) => (event, isExpanded) => {
      setExpandedDeposit(isExpanded ? panel : false);
   };

   const { data, isLoading, error } = useQuery({
      queryKey: ["user", id],
      queryFn: async () => UserService.getById(id),
      select: ({ data }) => data,
   });

   if (error) return <ErrorElement message={error?.message} />;

   return (
      <ContainerComponent>
         <BreadcrumbsComponent
            main={true}
            admin={true}
            options={[{ name: "@" + data?.username }]}
         />
         {isLoading ? (
            <AdminUser_skeleton />
         ) : (
            <Grid container mt={4} spacing={{ xs: 3, md: 2 }} columns={2}>
               <Grid
                  display={"flex"}
                  flexDirection={"column"}
                  gap={{ xs: 3, md: 2 }}
                  xs={2}
                  md={1}
               >
                  <UserFullInfoAdmin user={data} userMode={false} />
                  <Box
                     sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                     }}
                  >
                     <Box
                        mb={2}
                        ml={1}
                        mt={2}
                        display={"flex"}
                        gap={1}
                        alignItems={"center"}
                     >
                        <Typography
                           fontWeight={"600"}
                           variant="h6"
                           color={theme.palette.secondary.contrastText}
                        >
                           Total:
                        </Typography>
                        <Typography
                           fontWeight={"600"}
                           variant="h5"
                           color={theme.palette.secondary.contrastText}
                        >
                           $ {data?.totalDeposit || "0.00"}
                        </Typography>
                     </Box>
                     <DepositAccordion
                        deposit={data?.nftDepositEvents}
                        expanded={expanded}
                        handleChange={handleChange}
                        depositSum={data?.nftDeposit}
                        label={"NFT Deposit"}
                        expandedValue={6}
                     />
                     <DepositAccordion
                        deposit={data?.referralDepositEvents}
                        expanded={expanded}
                        handleChange={handleChange}
                        expandedValue={5}
                        depositSum={data?.referralDeposit}
                        label={"Referral Deposit"}
                     />
                     <DepositAccordion
                        deposit={data?.otherDepositEvents}
                        expanded={expanded}
                        expandedValue={4}
                        handleChange={handleChange}
                        depositSum={data?.otherDeposit}
                        label={"Other Deposit"}
                     />
                     <NftActiveAccordion
                        handleChange={handleChange}
                        nft={data?.nft}
                        expanded={expanded}
                     />
                     <NftInactiveAccordion
                        handleChange={handleChange}
                        nft={data?.nft}
                        expanded={expanded}
                     />
                  </Box>
               </Grid>
               <Grid
                  display={"flex"}
                  flexDirection={"column"}
                  gap={3}
                  // item
                  xs={2}
                  md={1}
               >
                  <OtherDepositForm id={id} />
                  <CashOutForm
                     nftDeposit={data?.nftDeposit}
                     referralDeposit={data?.referralDeposit}
                     otherDeposit={data?.otherDeposit}
                     id={id}
                  />
                  <NftSendAccordion
                     handleChange={handleChangeDeposit}
                     expanded={expandedDeposit}
                     id={id}
                  />
               </Grid>
            </Grid>
         )}
      </ContainerComponent>
   );
};
