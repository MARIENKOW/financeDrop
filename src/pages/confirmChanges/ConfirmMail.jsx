import { FormControl, Box, Typography, TextField, Button, Container, LinearProgress } from '@mui/material';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import userController from '../../controllers/user-controller';
import ErrorElement from '../../components/ErrorElement';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { NavLink } from 'react-router-dom';



const ConfirmMail = () => {

   const { token } = useParams()
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState(false)

   useEffect(() => {
      const fetchConfirmPassword = async () => {
         try {
            await userController.confirmMail(token)
         } catch (error) {
            console.log(error);
            if (error?.response?.status === 403) return setError('Час дії токену сплив')
            if (error?.response?.status === 404) return setError('Токен не знайдено')
            setError(error?.message)
         } finally {
            setLoading(false)
         }
      }

      fetchConfirmPassword()
   }, [])

   if (loading) return <LinearProgress />

   if (error) return <ErrorElement message={error} />

   return (
      <Box p={1} gap={2} flex={1} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
         <DoneAllIcon sx={{ width: 70, height: 70 }} color='primary' />

         <Typography id="transition-modal-title" sx={{ mb: 1 }} variant="h5" component="h2">
            Пошту підтверджено
         </Typography>
         <NavLink to={'/login'}>
            <Button variant='contained'>Увійти</Button>
         </NavLink>

      </Box>
   )
}

export default ConfirmMail
