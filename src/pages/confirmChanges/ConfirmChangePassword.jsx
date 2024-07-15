import { useParams } from 'react-router';
import { useState } from 'react';
import { blue } from '@mui/material/colors';
import { useForm } from 'react-hook-form';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { LoadingButton } from '@mui/lab';
import { Box, Typography, TextField, Alert } from '@mui/material';
import InCenterAuth from '../../components/wrappers/InCenterAuth';
import { FilledInput, FormHelperText, InputLabel, IconButton, FormControl, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from "../../validateConfig"
import OnlyLogout from '../../components/wrappers/OnlyLogout';
import userController from '../../controllers/user-controller';
import PasswordSuccess from '../../components/PasswordSuccess';
import PasswordWasChanged from '../../components/PasswordWasChanged';


const ConfirmChangePassword = () => {

   const { token } = useParams()
   const { handleSubmit, register, getValues, setError, clearErrors, formState: { errors, isValid, isSubmitting } } = useForm({ mode: 'onChange' })
   const [success, setSuccess] = useState(false)
   const [showPassword, setShowPassword] = useState({ password: false, repeatPassword: false });


   const handleClickShowPassword = (id) => setShowPassword((show) => {
      const showCopy = { ...show };
      showCopy[id] = !showCopy[id];
      return (showCopy)
   });

   const handleMouseDownPassword = (event) => {
      event.preventDefault();
   };


   const onSubmit = async (data) => {
      try {
         await userController.confirmResetPassword({...data,token})
         setSuccess(true)
      } catch (error) {
         console.log(error);
         if (error?.response?.status === 400) {
            const errors = error?.response?.data?.error
            if (errors) for (let key in errors) setError(key, { type: 'server', message: errors[key][0] })
            return
         }
         if (error?.response?.status === 404) {
            return setError('root.server', { type: 'server', message: 'Невірний токен запиту' })
         }
         setError('root.server', { type: 'server', message: 'Упс! виникла помилка, спробуйте пізніше' })
      }
   }

   const handleChange = () => {
      clearErrors('root')
   }

   if(success) return <PasswordWasChanged/>

   return (
      <OnlyLogout>
         <InCenterAuth>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
               <Typography id="transition-modal-title" sx={{ mb: 1 }} variant="h5" component="h2">
                  Зміна паролю
               </Typography>
            </Box>
            <form onChange={handleChange} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }} onSubmit={handleSubmit(onSubmit)}>
               <FormControl error={!!errors.password} variant='filled'>
                  <InputLabel htmlFor="outlined-adornment-password">Новий пароль</InputLabel>
                  <FilledInput
                     {...register('password', {
                        required: "обов'язкове поле",
                        minLength: {
                           value: PASSWORD_MIN_LENGTH,
                           message: `мінімум ${PASSWORD_MIN_LENGTH} символи`
                        },
                        deps: ['repeatPassword'],
                        maxLength: {
                           value: PASSWORD_MAX_LENGTH,
                           message: `максимум ${PASSWORD_MAX_LENGTH} символів`
                        },
                        validate: v => getValues('currentPassword') !== v ? null : 'Новий пароль повинен відрізнятись'
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
               <FormControl error={!!errors.repeatPassword} variant='filled'>
                  <InputLabel htmlFor="outlined-adornment-rePassword">Введіть пароль ще раз</InputLabel>
                  <FilledInput
                     {...register('repeatPassword', {
                        required: "обов'язкове поле",
                        maxLength: {
                           value: PASSWORD_MAX_LENGTH,
                           message: `максимум ${PASSWORD_MAX_LENGTH} символів`
                        },
                        validate: v => getValues('password') === v
                     })}
                     type={showPassword['repeatPassword'] ? 'text' : 'password'}
                     id="outlined-adornment-rePassword"
                     endAdornment={
                        <InputAdornment position="end">
                           <IconButton
                              onClick={() => handleClickShowPassword('repeatPassword')}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                           >
                              {showPassword['repeatPassword'] ? <VisibilityOff /> : <Visibility />}
                           </IconButton>
                        </InputAdornment>
                     }
                  />
                  <FormHelperText>{errors?.repeatPassword && (errors?.repeatPassword?.message || 'паролі не співпадають')}</FormHelperText>
               </FormControl>
               {errors?.root?.server && <Alert severity='error' hidden={true} >{errors?.root?.server?.message}</Alert>}
               <LoadingButton loading={isSubmitting} endIcon={<DoubleArrowIcon />} disabled={!isValid} type='submit' variant="contained">Надіслати</LoadingButton>
            </form>
         </InCenterAuth>
      </OnlyLogout>
   )
}

export default ConfirmChangePassword
