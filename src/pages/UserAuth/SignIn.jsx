import { grey, blue } from '@mui/material/colors';
import { FilledInput, FormControl, FormHelperText, InputLabel, Container, InputAdornment, Box, Typography, IconButton, TextField, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { useContext, useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { NavLink } from 'react-router-dom';
import InCenterAuth from '../../component/general/wrappers/InCenterAuth';
import { Context } from '../../User';
import { Alert } from '@mui/material';
import { PASSWORD_MAX_LENGTH, EMAIL_MAX_LENGTH,EMAIL_PATTERN } from '../../validateConfig';
import { enqueueSnackbar } from 'notistack';


const SignIn = () => {

   const { signInUser } = useContext(Context);
   const [showPassword, setShowPassword] = useState({ password: false, rePassword: false });


   const handleClickShowPassword = (id) => setShowPassword((show) => {
      const showCopy = { ...show };
      showCopy[id] = !showCopy[id];
      return (showCopy)
   });

   const handleMouseDownPassword = (event) => {
      event.preventDefault();
   };

   const { handleSubmit, resetField, register, setError, clearErrors, formState: { errors, isValid, isSubmitting } } = useForm({ mode: 'onChange' },)

   const handleChange = () => {
      clearErrors('root')
   }

   const onSubmit = async (data) => {
      try {
         await signInUser(data);
         enqueueSnackbar(`SignIn is success!`, { variant: 'success' })
      } catch (e) {
         console.error(e);
         if (e?.response?.status === 400) {
          const errors = e?.response?.data || {};
          for (let key in errors) {
            setError(key, { type: 'server', message: errors[key] })
           }
           return
        }
         setError('root.server', { type: 'server', message: 'Oops! something went wrong, try again later' })
      }
   }

   return (
         <InCenterAuth>
            <Typography sx={{ textAlign: 'center', mb: 3 }} id="transition-modal-title" variant="h6" component="h2">
               Sign In
            </Typography>
            <form onChange={handleChange} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }} onSubmit={handleSubmit(onSubmit)}>
            <TextField
                  error={!!errors.email}
                  {...register('email', {
                     required: "required field",
                     maxLength: {
                        value: EMAIL_MAX_LENGTH,
                        message: `maximum ${EMAIL_MAX_LENGTH} characters`
                     },
                     pattern: {
                        value: EMAIL_PATTERN,
                        message: 'mail must be in the format - example@mail.com'
                     }
                  })}
                  label="Email"
                  sx={{ color: blue[700] }}
                  helperText={errors?.email && (errors?.email?.message || 'incorrect data')}
                  variant="filled"
               />
               <FormControl error={!!errors.password} variant='filled'>
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                  <FilledInput
                     {...register('password', {
                        required: "required",
                        maxLength: {
                           value: PASSWORD_MAX_LENGTH,
                           message: `maximunm ${PASSWORD_MAX_LENGTH} characters`
                        }
                     })}
                     type={showPassword['password'] ? 'text' : 'password'}
                     id="outlined-adornment-password"
                     endAdornment={
                        <InputAdornment position="end">
                           <IconButton
                              onClick={() => handleClickShowPassword('password')}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                           >
                              {showPassword['password'] ? <VisibilityOff /> : <Visibility />}
                           </IconButton>
                        </InputAdornment>
                     }
                  />
                  <FormHelperText>{errors?.password && (errors?.password?.message || 'incorrect data')}</FormHelperText>
               </FormControl>
               {errors?.root?.server && <Alert severity='error' hidden={true} >{errors?.root?.server?.message}</Alert>}
               <LoadingButton loading={isSubmitting} endIcon={<DoubleArrowIcon />} disabled={!isValid} type='submit' variant="contained">Submit</LoadingButton>
               <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <NavLink to={'/RememberSendMail'}>
                     <Typography sx={{ '&:hover': { color: blue[700] }, cursor: 'pointer', transition: '.2s', p: '1px' }} variant='body2' color={'text.secondary'}>
                        Forgot password?
                     </Typography>
                  </NavLink>
                  <NavLink to={'/SignUp'}>
                     <Typography sx={{ '&:hover': { color: blue[700] }, cursor: 'pointer', transition: '.2s', p: '1px' }} variant='body2' color={blue[900]} >
                        Sign Up
                     </Typography>
                  </NavLink>
               </Box>
            </form>
         </InCenterAuth>
   )
}

export default SignIn

