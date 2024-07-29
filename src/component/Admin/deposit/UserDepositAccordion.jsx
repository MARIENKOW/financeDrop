import {
   AccordionSummary,
   Box,
   Typography,
   useTheme,
   Grid,
} from "@mui/material";
import { StyledAccordion } from "../StyledAccordion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Empty } from "../../general/Empty";
import { formatDate } from "../../../helper";
import { DepositItem } from "./DepositItem";

export const UserDepositAccordion = ({
   expanded,
   handleChange,
   deposit,
   depositSum,
   label,
   expandedValue,
}) => {
   const theme = useTheme();

   return (
      <StyledAccordion
         expanded={expanded === expandedValue}
         onChange={handleChange(expandedValue)}
      >
         <AccordionSummary expandIcon={<ExpandMoreIcon color="secondary" />}>
            {/* <Grid container alignItems={"center"} columns={3} spacing={1}>
               <Grid item xs={1}>
                  <Typography
                     sx={{ flex: "50% 0 1" }}
                     color={theme.palette.secondary.main}
                  >
                     {label}
                  </Typography>
               </Grid>
               <Grid item xs={1}>
                  <Typography
                     textAlign={"center"}
                     variant="h6"
                     sx={{ flex: "50% 0 1" }}
                     color={theme.palette.secondary.contrastText}
                  >
                     $ {depositSum}
                  </Typography>
               </Grid>
            </Grid> */}
            <Box display={"flex"} flexDirection={"column"} gap={'5px'}>
               <Typography
                  sx={{ flex: "50% 0 1" }}
                  color={theme.palette.secondary.main}
               >
                  {label}
               </Typography>
               <Typography
                  variant="h6"
                  sx={{ flex: "50% 0 1" }}
                  color={theme.palette.secondary.contrastText}
               >
                  $ {depositSum}
               </Typography>
            </Box>
         </AccordionSummary>
         <AccordionDetails
            sx={{
               overflowY: "scroll",
               display: "flex",
               gap: 3,
               flexDirection: "column",
               maxHeight: "400px",
            }}
         >
            {deposit && deposit?.length !== 0 ? (
               deposit?.map((el) => (
                  <Box>
                     <Typography
                        variant="body1"
                        mb={2}
                        ml={1}
                        color={theme.palette.secondary.contrastText}
                     >
                        {formatDate(el[0])}
                     </Typography>
                     <Box display={"flex"} flexDirection={"column"} gap={1}>
                        {el[1]?.map((item) => (
                           <DepositItem depositUp={item} />
                        ))}
                     </Box>
                  </Box>
               ))
            ) : (
               <Empty />
            )}
         </AccordionDetails>
      </StyledAccordion>
   );
};
