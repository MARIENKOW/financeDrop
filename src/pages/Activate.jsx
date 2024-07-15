import { FormControl, Box, Typography, TextField, Button, Container, LinearProgress } from '@mui/material';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import ErrorElement from '../component/ErrorElement';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { NavLink } from 'react-router-dom';
import Loading from "../component/Loading/Loading";
import userService from '../services/UserService';




const Activate = () => {

   const { token } = useParams()
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState(false)

   useEffect(() => {
      const fetchConfirmPassword = async () => {
         try {
            await userService.activate({token})
         } catch (error) {
            console.log(error);
            if (error?.status === 400) return setError(error?.data || true)
            setError(true)
         } finally {
            setLoading(false)
         }
      }

      fetchConfirmPassword()
   }, [])

   if (loading) return <Loading />

   if (error) return <ErrorElement message={error} />

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

export default Activate
