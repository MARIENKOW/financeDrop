import {
   AccordionSummary,
   Box,
   Skeleton,
   Typography,
   useTheme,
} from "@mui/material";
import { StyledAccordion } from "../StyledAccordion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Empty } from "../Empty";
import { formatDate } from "../../../helper";
// import { DepositItem } from "./DepositItem";
import { v4 } from "uuid";

export const CashOutAccordion = ({
   expanded,
   handleChange,
   data,
   label,
   expandedValue,
   ItemComponent,
   isLoading,
   admin = false,
   handleOpenImg,
}) => {
   const dataLength = data?.reduce((acc, el) => acc + (el[1]?.length || 0), 0);

   const theme = useTheme();

   return (
      <StyledAccordion
         expanded={expanded === expandedValue}
         onChange={handleChange(expandedValue)}
      >
         <AccordionSummary expandIcon={<ExpandMoreIcon color="secondary" />}>
            <Box display={"flex"} gap={"5px"}>
               <Typography
                  sx={{ flex: "50% 0 1" }}
                  color={theme.palette.secondary.main}
               >
                  {label}
               </Typography>
               <Typography
                  // variant="h6"
                  sx={{ flex: "50% 0 1" }}
                  color={theme.palette.secondary.contrastText}
               >
                  ({dataLength || 0})
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
            {isLoading ? (
               <Skeleton
                  sx={{
                     bgcolor: theme.palette.secondary.main,
                     transform: "none",
                     width: "100%",

                     height: "80px ",
                     minHeight: "80px ",
                  }}
               />
            ) : data && Array.isArray(data) && data?.length !== 0 ? (
               data?.map((el) => (
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
                           <ItemComponent
                              admin={admin}
                              key={v4()}
                              item={item}
                              handleOpenImg={handleOpenImg}
                           />
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
