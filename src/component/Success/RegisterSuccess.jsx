import { Box, Typography, Button } from "@mui/material"
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { NavLink } from "react-router-dom"
import { ACTIVATE_TOKEN_TIME } from "../../validateConfig";


const RegisterSuccess = ({ mail }) => {
   return (
      <Box maxWidth={450} p={1} margin={'0 auto'} flex={1} gap={2} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
         <DoneAllIcon sx={{ width: 70, height: 70 }} color='primary' />
         <Typography textAlign={'center'} variant='h5' color="initial">Ми надіслали посилання на пошту{mail && `: "${mail}"`} для активації облікового запису.</Typography>
         <Box>
            <Typography textAlign={'center'} variant='body1' color="text.secondary">Посилання буде активне протягом {ACTIVATE_TOKEN_TIME} хвилин</Typography>
            <Typography textAlign={'center'} variant='body1' color="text.secondary">Перевірте папку Спам</Typography>
         </Box>
         <NavLink to={'/SignIn'}>
            <Button variant='contained'>Увійти</Button>
         </NavLink>
      </Box>
   )

}

export default RegisterSuccess