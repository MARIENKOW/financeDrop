import { AccordionSummary, Box, Typography, useTheme } from "@mui/material";
import { StyledAccordion } from "../StyledAccordion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Empty } from "../Empty";
import { formatDate } from "../../../helper";
import { DepositItem } from "./DepositItem";
import { v4 } from "uuid";

export const DepositAccordion = ({
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
            <Box display={"flex"} flexDirection={"column"} gap={"5px"}>
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
                  $ {depositSum || "0.00"}
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
            {deposit && Array.isArray(deposit) && deposit?.length !== 0 ? (
               deposit?.map((el) => (
                  <Box key={v4()}>
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
                           <DepositItem key={v4()} depositUp={item} />
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
