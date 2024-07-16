import { useEffect, useState } from 'react';
import { blue } from '@mui/material/colors';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { LoadingButton } from '@mui/lab';
import { FilledInput, FormHelperText, InputLabel, IconButton, FormControl, Box, Typography, TextField, InputAdornment, Alert } from '@mui/material';
import { EMAIL_PATTERN, EMAIL_MAX_LENGTH } from '../../validateConfig';
import InCenterAuth from '../../component/general/wrappers/InCenterAuth';
import userService from '../../services/UserService';
import PasswordEmailSendSuccess from '../../component/User/Success/PasswordEmailSendSuccess';


const Remember = () => {

   const { handleSubmit, register, getValues, setError, clearErrors, formState: { errors, isValid, isSubmitting } } = useForm({ mode: 'onChange' })
   const [success, setSuccess] = useState(false)

   const onSubmit = async ({ email }) => {
      try {
         const { data } = await userService.rememberPassword({ email })
         setSuccess(data?.email || true)
      } catch (error) {
         console.log(error);
         if (error?.response?.status === 400) {
            const errors = error?.response?.data
            if (errors) for (let key in errors) setError(key, { type: 'server', message: errors[key] })
            return
         }
         setError('root.server', { type: 'server', message: 'Oops! something went wrong, try again later' })
      }
   }

   const handleChange = () => {
      clearErrors('root')
   }

   if (success) return <PasswordEmailSendSuccess mail={success} size='h6' />

   return (
         <InCenterAuth>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
               <Typography id="transition-modal-title" sx={{ mb: 1 }} variant="h5" component="h2">
                  Forgot your password?
               </Typography>
               <Typography id="transition-modal-title" color={'text.secondary'} variant="body2" component="h2">
                  Write your email
               </Typography>
               <Typography id="transition-modal-title" color={'text.secondary'} variant="body2" component="h2">
                  we will send you a link to change your password
               </Typography>

            </Box>
            <form onChange={handleChange} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }} onSubmit={handleSubmit(onSubmit)}>
               <TextField
                  error={!!errors.email}
                  {...register('email', {
                     required: "required field",
                     pattern: {
                        value: EMAIL_PATTERN,
                        message: 'mail must be in the format - example@mail.com'
                     },
                     maxLength: {
                        value: EMAIL_MAX_LENGTH,
                        message: `maximum ${EMAIL_MAX_LENGTH} characters`
                     }
                  })}
                  label="Пошта"
                  sx={{ color: blue[700] }}
                  helperText={errors?.email && (errors?.email?.message || 'incorrect data')}
                  variant="filled"
               />
               {errors?.root?.server && <Alert severity='error' hidden={true} >{errors?.root?.server?.message}</Alert>}
               <LoadingButton loading={isSubmitting} endIcon={<DoubleArrowIcon />} disabled={!isValid} type='submit' variant="contained">Надіслати</LoadingButton>
               <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <NavLink to={'/SignIn'}>
                     <Typography sx={{ '&:hover': { color: blue[700] }, cursor: 'pointer', transition: '.2s', p: '1px' }} variant='body2' color={blue[900]}>
                        Авторизуватися
                     </Typography>
                  </NavLink>
                  <NavLink to={'/SignUp'}>
                     <Typography sx={{ '&:hover': { color: blue[700] }, cursor: 'pointer', transition: '.2s', p: '1px' }} variant='body2' color={blue[900]} >
                        Зареєструватися
                     </Typography>
                  </NavLink>
               </Box>
            </form>
         </InCenterAuth>
   )
}

export default Remember
