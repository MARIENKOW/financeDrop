import { Button, styled } from "@mui/material";

export const StyledSmallBtn = styled(Button)(({theme})=>({
   ...theme,
      'MuiButton-root':{
         p:1
      }
}))