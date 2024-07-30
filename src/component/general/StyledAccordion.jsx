import { styled } from "@mui/material";
import {Accordion} from "@mui/material";

export const StyledAccordion = styled(Accordion)(({ theme }) => ({
   ...theme,
   background: theme.palette.secondary.dark,
   borderRadius: "10px !important",
   borderWidth: "1px",
   borderStyle: "solid",
   borderColor: theme.palette.background.light,
   "&.Mui-expanded": {
      margin: "0px !important",
   },
   // border-right: 3px solid $color4;
   ".MuiAccordionDetails-root": {
      "&::-webkit-scrollbar": {
         borderRadius: "99px",
         height: "4px",
         width: "4px",
         overflow: "hidden",
      },
      "&::-webkit-scrollbar-button": {
         display: "none",
      },
      "&::-webkit-scrollbar-thumb": {
         backgroundColor: theme.palette.background.light,
         borderRadius: "99px",
      },
      "&::-webkit-scrollbar-track-piece": {
         margin: "0 5px",
      },
   },
   ".MuiBox-root": {
      "&::-webkit-scrollbar": {
         borderRadius: "99px",
         height: "4px",
         width: "4px",
         overflow: "hidden",
      },
      "&::-webkit-scrollbar-button": {
         display: "none",
      },
      "&::-webkit-scrollbar-thumb": {
         backgroundColor: theme.palette.background.light,
         borderRadius: "99px",
      },
      "&::-webkit-scrollbar-track-piece": {
         margin: "0 5px",
      },
   },
}));
