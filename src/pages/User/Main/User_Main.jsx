import { ContainerComponent } from "../../../component/general/wrappers/ContainerComponent";
import { Box, Button, Typography, useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import BreadcrumbsComponent from "../../../component/general/BreadcrumbsComponent";
import { UserFullInfoAdmin } from "../../../component/Admin/user/UserFullInfoAdmin";
import { useContext, useState } from "react";
import { NftActiveAccordion } from "../../../component/Admin/nft/NftActiveAccordion";
import { NftInactiveAccordion } from "../../../component/Admin/nft/NftInactiveAccordion";
import { DepositAccordion } from "../../../component/general/deposit/DepositAccordion";
import { Context } from "../../../User";
import { Title } from "../../../component/general/Title";
import { SiteContext } from "../../..";
import CopyToClipboard from "../../../component/general/CopyToClipboard";
import config from "../../../config";
import {
   USER_CASH_OUT_ROUTE,
   USER_SIGN_IN_ROUTE,
   USER_SIGN_UP_ROUTE,
} from "../../../route/RouterConfig";
import { NavLink } from "react-router-dom";

const User_Main = () => {
   const { user } = useContext(Context);
   const { data } = useContext(SiteContext);

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
                  {/* <Box display={'flex'} flexDirection={'column'} alignItems={'center'} mt={4}>
                     <Title
                        sx={{ color: theme.palette.secondary.contrastText }}
                        label={"Referral program"}
                     />
                     <Typography
                        color="secondary"
                        variant="h6"
                        textAlign={"center"}
                     >
                        you can get{" "}
                        <Typography
                           ml={"3px"}
                           mr={"3px"}
                           component={"span"}
                           color={theme.palette.secondary.contrastText}
                           variant="h6"
                        >
                           {data?.referralPercent || 15}%
                        </Typography>{" "}
                        of every person who registers through your link.
                     </Typography>
                     <Box pr={2} pl={2} m={3} maxWidth={'400px'} >
                        
                        <CopyToClipboard
                           text={
                              "https://github.com/MARIENKOW/financeDrop-server"
                           }
                        />
                     </Box>
                  </Box> */}
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
                     mt={{ xs: 3, md: 0 }}
                     mb={3}
                     display={"flex"}
                     justifyContent={"space-between"}
                     gap={2}
                     alignItems={"center"}
                  >
                     <Box ml={1} display={"flex"} gap={1} alignItems={"center"}>
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
                           $ {user?.totalDeposit || "0.00"}
                        </Typography>
                     </Box>
                     <NavLink to={USER_CASH_OUT_ROUTE}>
                        <Button variant={"contained"}>cash out</Button>
                     </NavLink>
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
               <Box
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  flex={1}
                  mt={4}
               >
                  <Title
                     sx={{ color: theme.palette.secondary.contrastText }}
                     label={"Referral program"}
                  />
                  <Typography
                     color="secondary"
                     variant="h6"
                     textAlign={"center"}
                  >
                     you can get{" "}
                     <Typography
                        ml={"3px"}
                        mr={"3px"}
                        component={"span"}
                        color={theme.palette.secondary.contrastText}
                        variant="h6"
                     >
                        {data?.referralPercent || 15}%
                     </Typography>{" "}
                     of every person who registers through your link.
                  </Typography>
                  <Box m={3} width={"100%"} maxWidth={"400px"}>
                     <CopyToClipboard
                        text={
                           config.CLIENT_API +
                           USER_SIGN_UP_ROUTE +
                           "/" +
                           user?.uuid
                        }
                     />
                  </Box>
               </Box>
            </Grid>
         </Grid>
      </ContainerComponent>
   );
};

export default User_Main;
