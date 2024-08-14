import React, { useRef, useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
   Box,
   Button,
   Paper,
   Tooltip,
   Typography,
   useTheme,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";

export const CopyToClipboard = ({ text ,type='link'}) => {
   const theme = useTheme();
   const textRef = useRef();

   const handleCopy = async () => {
      try {
         {
            // textRef.current.focus();
            console.log(textRef);
            textRef.current.select();
            document.execCommand("copy");
            enqueueSnackbar(`${type} copy to clipboard`,{variant:'success'})
         }
      } catch (err) {
         console.error("Failed to copy text: ", err);
         enqueueSnackbar('failed to copy text',{variant:'error'})

      }
   };

   return (
      <Box
         sx={{
            display: "flex",
            // alignItems: "center",
            background: "transparent",
         }}
      >
         <Typography
            ref={textRef}
            sx={{
               borderWidth: "1px",
               borderStyle: "solid",
               borderColor: theme.palette.background.light,
               borderRadius: "10px",
               background: "transparent",
               color: theme.palette.secondary.contrastText,
               overflowX: "scroll",
               userSelect: "all",
               whiteSpace: "nowrap",
               // "&::-webkit-scrollbar": {
               //    display: "none",
               // },
            }}
            flex={1}
            component={"input"}
            type="text"
            pb={1}
            pt={1}
            pr={1.5}
            pl={1.5}
            value={text}
            readOnly
            rows={1}
         >
         </Typography>
         <Tooltip title="Copy to clipboard">
            <Button onClick={handleCopy} sx={{ minWidth: "40px" }}>
               <ContentCopyIcon
                  color="primary"
                  fontSize="large"
                  sx={{ height: "20px" }}
               />
            </Button>
         </Tooltip>
      </Box>
   );
};

export default CopyToClipboard;
