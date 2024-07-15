import { Container,Box } from "@mui/material"
import { grey } from "@mui/material/colors"

const style = {
   position: 'relative',
   boxShadow:24,
   p: 4,
   bgcolor: grey[50],
   borderRadius: '10px',
   color: grey[900],
};

const InCenterAuth = ({ children }) => {

   return (
      <Container maxWidth={'xs'} sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',p:'25px 0' }}>
         <Box sx={style}>
            {children}
         </Box>
      </Container>)
}

export default InCenterAuth