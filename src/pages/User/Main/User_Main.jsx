import { ContainerComponent } from "../../../component/general/wrappers/ContainerComponent";
import { Box, Typography, useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import BreadcrumbsComponent from "../../../component/general/BreadcrumbsComponent";
import { UserFullInfoAdmin } from "../../../component/Admin/user/UserFullInfoAdmin";
import { useContext, useState } from "react";
import { NftActiveAccordion } from "../../../component/Admin/nft/NftActiveAccordion";
import { NftInactiveAccordion } from "../../../component/Admin/nft/NftInactiveAccordion";
import { DepositAccordion } from "../../../component/general/deposit/DepositAccordion";
import { Context } from "../../../User";

const User_Main = () => {

   const {user} = useContext(Context)

   console.log(user);

   const theme = useTheme();

   const [expanded, setExpanded] = useState(1);

   const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
   };
   const [expandedDeposit, setExpandedDeposit] = useState();

   const handleChangeDeposit = (panel) => (event, isExpanded) => {
      setExpandedDeposit(isExpanded ? panel : false);
   };

   return (
      <ContainerComponent>
         <Grid
            direction={{ xs: "column-reverse", md: "row" }}
            container
            mt={4}
            spacing={{ xs: 3, md: 2 }}
            columns={2}
         >
            <Grid
               display={"flex"}
               flexDirection={"column"}
               gap={{ xs: 3, md: 2 }}
               xs={2}
               md={1}
            >
               <UserFullInfoAdmin
                  sx={{ display: { xs: "none", md: "flex" } }}
                  user={user}
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
                     nft={user?.nft}
                     expanded={expanded}
                  />
                  <NftInactiveAccordion
                     handleChange={handleChange}
                     nft={user?.nft}
                     expanded={expanded}
                  />
               </Box>
            </Grid>
            <Grid
               display={"flex"}
               flexDirection={"column"}
               gap={{ xs: 3, md: 2 }}
               xs={2}
               md={1}
            >
               <Box>
                  <UserFullInfoAdmin
                     sx={{ display: { xs: "flex", md: "none" } }}
                     user={user}
                  />

                  <Box
                     mb={2}
                     ml={1}
                     mt={{ xs: 3, md: 0 }}
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
                        $ {user?.totalDeposit || '0.00'}
                     </Typography>
                  </Box>
                  <Box display={"flex"} flexDirection={"column"} gap={1}>
                     <DepositAccordion
                        deposit={user?.nftDepositEvents}
                        expanded={expandedDeposit}
                        handleChange={handleChangeDeposit}
                        depositSum={user?.nftDeposit}
                        label={"NFT Deposit"}
                        expandedValue={1}
                     />
                     <DepositAccordion
                        deposit={user?.referralDepositEvents}
                        expanded={expandedDeposit}
                        handleChange={handleChangeDeposit}
                        expandedValue={2}
                        depositSum={user?.referralDeposit}
                        label={"Referral Deposit"}
                     />
                     <DepositAccordion
                        deposit={user?.otherDepositEvents}
                        expanded={expandedDeposit}
                        expandedValue={3}
                        handleChange={handleChangeDeposit}
                        depositSum={user?.otherDeposit}
                        label={"Other Deposit"}
                     />
                  </Box>
               </Box>
            </Grid>
         </Grid>
      </ContainerComponent>
   );
};


export default User_Main