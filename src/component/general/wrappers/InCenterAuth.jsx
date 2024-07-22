import { Container,Box } from "@mui/material"
import { grey } from "@mui/material/colors"
import { useTheme } from "@mui/material";


const InCenterAuth = ({ children ,style,maxWidth = 'xs'}) => {
   
   const theme = useTheme()

   const dopStyle = {
      position: 'relative',
      // boxShadow:24,
      p: {xs:3,sm:4},
      borderRadius: '10px',
      color: theme.palette.background.light,
      background:theme.palette.background.main,
      ...style
   };

   return (
      <Container maxWidth={maxWidth}  sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',p:{xs:1,sm:3} }}>
         <Box sx={dopStyle}>
            {children}
         </Box>
      </Container>)
}

export default InCenterAuth