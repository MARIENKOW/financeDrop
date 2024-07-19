import { Container,Box } from "@mui/material"
import { grey } from "@mui/material/colors"
import { useTheme } from "@mui/material";


const InCenterAuth = ({ children }) => {
   
   const theme = useTheme()

   const style = {
      position: 'relative',
      boxShadow:24,
      p: {xs:3,sm:4},
      borderRadius: '10px',
      color: theme.palette.background.light,
      bgcolor:theme.palette.background.main
   };

   return (
      <Container maxWidth={'xs'}  sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',p:{xs:1,sm:3} }}>
         <Box sx={style}>
            {children}
         </Box>
      </Container>)
}

export default InCenterAuth