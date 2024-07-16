import { Box, Typography, Button } from "@mui/material"
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { REMEMBER_TOKEN_TIME } from "../../validateConfig";
import { NavLink } from "react-router-dom";


const PasswordSuccess = ({ mail, size = 'body2' }) => {
   return (
      <Box p={1} maxWidth={320} margin={'0 auto'} flex={1} gap={2} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
         <DoneAllIcon sx={{ width: 50, height: 50 }} color='primary' />
         <Typography textAlign={'center'} variant={size} color="initial">Посилання для підтвердження зміни паролю надіслано на пошту{mail && mail !== true ? `: "${mail}"`:null}</Typography>
         <Box>
            <Typography textAlign={'center'} variant={'body1'} color="text.secondary">Посилання буде активне протягом {REMEMBER_TOKEN_TIME} хвилин</Typography>
            <Typography textAlign={'center'} variant={'body1'} color="text.secondary">Перевірте папку Спам</Typography>
         </Box>
         <NavLink to={'/SignIn'}>
            <Button variant='contained'>Увійти</Button>
         </NavLink>
      </Box>
   )

}

export default PasswordSuccess