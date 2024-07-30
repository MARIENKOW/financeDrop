import { Typography } from "@mui/material";

export const Title = ({isValid,label,sx}) => {
   return (
      <Typography
         fontWeight={600}
         color={!isValid ? "secondary" : "primary"}
         sx={{ textAlign: "center", mb: 3,...sx }}
         id="transition-modal-title"
         variant="h6"
         component="h2"
      >
         {label}
      </Typography>
   );
};
