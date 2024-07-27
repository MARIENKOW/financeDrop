import { Card, CardContent, Skeleton, useTheme } from "@mui/material";

export const UserCard_skeleton = () => {
   const theme = useTheme();
   return (
      <Card
         sx={{
            display: "flex",
            background: theme.palette.secondary.light,
            borderRadius: "10px",
            p: 2,
            alignItems: "center",
            gap: 2,
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: theme.palette.background.light,
            cursor: "pointer",
            "&:hover": {
               background: theme.palette.background.main,
            },
         }}
      >
         <Skeleton
            sx={{
               width: "80px",
               height: "80px",
               bgcolor: theme.palette.secondary.main,
               transform: "none",
            }}
            variant="circular"
         />
         <CardContent
            sx={{
               p: "0px !important",
               display: "flex",
               flexDirection: "column",
               gap: "3px",
            }}
         >
            <Skeleton
               sx={{
                  width: "80px",
                  height: "20px",
                  bgcolor: theme.palette.secondary.main,
                  transform: "none",
               }}
               variant="rounded"
            />
            <Skeleton
               sx={{
                  width: "140px",
                  height: "20px",
                  bgcolor: theme.palette.secondary.main,
                  transform: "none",
               }}
               variant="rounded"
            />
         </CardContent>
      </Card>
   );
};
