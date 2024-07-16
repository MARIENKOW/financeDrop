import DoneAllIcon from '@mui/icons-material/DoneAll';
import { NavLink } from 'react-router-dom';
import { Box, Typography, Button,} from '@mui/material';

const AccountActivateSuccess = ()=>{
   return (
      <Box p={1} gap={2} flex={1} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
         <DoneAllIcon sx={{ width: 70, height: 70 }} color='primary' />
         <Typography id="transition-modal-title" sx={{ mb: 1 }} variant="h5" component="h2">
            Пошту підтверджено
         </Typography>
         <NavLink to={'/SignIn'}>
            <Button variant='contained'>Увійти</Button>
         </NavLink>
      </Box>
   )
}

export default AccountActivateSuccess;