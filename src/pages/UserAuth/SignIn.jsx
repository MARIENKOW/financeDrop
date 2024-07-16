import { grey, blue } from '@mui/material/colors';
import { FilledInput, FormControl, FormHelperText, InputLabel, Container, InputAdornment, Box, Typography, IconButton, TextField, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { useContext, useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { NavLink } from 'react-router-dom';
import InCenterAuth from '../../component/wrappers/InCenterAuth';
import { Context } from '../..';
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
         setError('root.server', { type: 'server', message: 'Oops! something gone wrong, спробуйте пізніше' })
      }
   }

   return (
         <InCenterAuth>
            <Typography sx={{ textAlign: 'center', mb: 3 }} id="transition-modal-title" variant="h6" component="h2">
               SignIn
            </Typography>
            <form onChange={handleChange} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }} onSubmit={handleSubmit(onSubmit)}>
            <TextField
                  error={!!errors.email}
                  {...register('email', {
                     required: "required",
                     maxLength: {
                        value: EMAIL_MAX_LENGTH,
                        message: `максимум ${EMAIL_MAX_LENGTH} символів`
                     },
                     pattern: {
                        value: EMAIL_PATTERN,
                        message: 'пошта має бути формату - example@mail.com'
                     }
                  })}
                  label="Пошта"
                  sx={{ color: blue[700] }}
                  helperText={errors?.email && (errors?.email?.message || 'некоректні данні')}
                  variant="filled"
               />
               <FormControl error={!!errors.password} variant='filled'>
                  <InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
                  <FilledInput
                     {...register('password', {
                        required: "required",
                        maxLength: {
                           value: PASSWORD_MAX_LENGTH,
                           message: `максимум ${PASSWORD_MAX_LENGTH} символів`
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
                  <FormHelperText>{errors?.password && (errors?.password?.message || 'некоректні данні')}</FormHelperText>
               </FormControl>
               {errors?.root?.server && <Alert severity='error' hidden={true} >{errors?.root?.server?.message}</Alert>}
               <LoadingButton loading={isSubmitting} endIcon={<DoubleArrowIcon />} disabled={!isValid} type='submit' variant="contained">Підтвердити</LoadingButton>
               <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <NavLink to={'/RememberSendMail'}>
                     <Typography sx={{ '&:hover': { color: blue[700] }, cursor: 'pointer', transition: '.2s', p: '1px' }} variant='body2' color={'text.secondary'}>
                        Забули пароль?
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

export default SignIn

