import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import UserService from "../../services/UserService";
import ErrorElement from "../../component/general/ErrorElement";
import { ContainerComponent } from "../../component/general/wrappers/ContainerComponent";
import { Title } from "../../component/general/Title";
import { Box, Grid } from "@mui/material";
import BreadcrumbsComponent from "../../component/general/BreadcrumbsComponent";
import { UserFullInfoAdmin } from "../../component/Admin/user/UserFullInfoAdmin";
import { useState } from "react";
import { NftSendAccordion } from "../../component/Admin/nft/NftSendAccordion";
import { NftActiveAccordion } from "../../component/Admin/nft/NftActiveAccordion";
import { NftInactiveAccordion } from "../../component/Admin/nft/NftInactiveAccordion";

export const Admin_User = () => {
   const { id } = useParams();
   const [expanded, setExpanded] = useState(3);

   const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
   };

   const { data, isLoading, error } = useQuery({
      queryKey: ["user", id],
      queryFn: async () => UserService.getById(id),
      select: ({ data }) => data,
   });

   if (error) return <ErrorElement message={error?.message} />;

   return (
      <ContainerComponent>
         <BreadcrumbsComponent main={true} admin={true} options={[{ name: "@" + data?.username }]} />
         <Title label={"@" + data?.username} />
         <Grid container spacing={1} columns={2}>
            <Grid xs={2} sm={1} item>
               <UserFullInfoAdmin user={data} />;
            </Grid>
            <Grid xs={2} sm={1} item>
               <Box
                  sx={{
                     // flex: "50% 0 1",
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
         </Grid>
      </ContainerComponent>
   );
};
