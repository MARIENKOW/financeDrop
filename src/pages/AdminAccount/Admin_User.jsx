import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import UserService from "../../services/UserService";
import ErrorElement from "../../component/general/ErrorElement";
import { ContainerComponent } from "../../component/general/wrappers/ContainerComponent";
import { Title } from "../../component/general/Title";
import { Box, Typography, useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import BreadcrumbsComponent from "../../component/general/BreadcrumbsComponent";
import { UserFullInfoAdmin } from "../../component/Admin/user/UserFullInfoAdmin";
import { useState } from "react";
import { NftSendAccordion } from "../../component/Admin/nft/NftSendAccordion";
import { NftActiveAccordion } from "../../component/Admin/nft/NftActiveAccordion";
import { NftInactiveAccordion } from "../../component/Admin/nft/NftInactiveAccordion";
import { UserDepositAccordion } from "../../component/Admin/deposit/UserDepositAccordion";
import { OtherDepositForm } from "../../component/Admin/deposit/OtherDepositForm";

export const Admin_User = () => {
   const theme = useTheme();

   const { id } = useParams();
   const [expanded, setExpanded] = useState(3);

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

   // console.log(theme.breakpoints.down('sm'));

   if (error) return <ErrorElement message={error?.message} />;

   return (
      <ContainerComponent>
         <BreadcrumbsComponent
            main={true}
            admin={true}
            options={[{ name: "@" + data?.username }]}
         />
         <Title label={"@" + data?.username} />
         <Grid
            direction={{ xs: "column-reverse", md: "row" }}
            container
            spacing={{ xs: 3, md: 2 }}
            columns={2}
         >
            <Grid
               display={"flex"}
               flexDirection={"column"}
               gap={{ xs: 3, md: 2 }}
               // item
               xs={2}
               md={1}
            >
               <UserFullInfoAdmin
                  sx={{ display: { xs: "none", md: "flex" } }}
                  user={data}
               />
               <Box
                  sx={{
                     display: "flex",
                     flexDirection: "column",
                     gap: 1,
                  }}
               >
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
                  <NftSendAccordion
                     handleChange={handleChange}
                     expanded={expanded}
                     id={id}
                  />
               </Box>
            </Grid>
            <Grid
               display={"flex"}
               flexDirection={"column"}
               gap={{ xs: 3, md: 2 }}
               // item
               xs={2}
               md={1}
            >
               <Box>
                  <UserFullInfoAdmin
                     sx={{ display: { xs: "flex", md: "none" } }}
                     user={data}
                  />

                  <Box display={"flex"} gap={1} alignItems={"center"}>
                     <Typography
                        mb={2}
                        ml={1}
                        mt={{ xs: 3, md: 0 }}
                        fontWeight={"600"}
                        variant="h6"
                        color={theme.palette.secondary.contrastText}
                     >
                        Total:
                     </Typography>
                     <Typography
                        mb={2}
                        ml={1}
                        mt={{ xs: 3, md: 0 }}
                        fontWeight={"600"}
                        variant="h5"
                        color={theme.palette.secondary.contrastText}
                     >
                        $ {data?.totalDepositSum}
                     </Typography>
                  </Box>
                  <Box display={"flex"} flexDirection={"column"} gap={1}>
                     <UserDepositAccordion
                        deposit={data?.nftDeposit}
                        expanded={expandedDeposit}
                        handleChange={handleChangeDeposit}
                        depositSum={data?.nftDepositSum}
                        label={"NFT Deposit"}
                        expandedValue={1}
                     />
                     <UserDepositAccordion
                        deposit={data?.referralDeposit}
                        expanded={expandedDeposit}
                        handleChange={handleChangeDeposit}
                        expandedValue={2}
                        depositSum={data?.referralDepositSum}
                        label={"Referral Deposit"}
                     />
                     <UserDepositAccordion
                        deposit={data?.otherDeposit}
                        expanded={expandedDeposit}
                        expandedValue={3}
                        handleChange={handleChangeDeposit}
                        depositSum={data?.otherDepositSum}
                        label={"Other Deposit"}
                     />
                     <OtherDepositForm id={id} />
                  </Box>
               </Box>
            </Grid>
         </Grid>
      </ContainerComponent>
   );
};
