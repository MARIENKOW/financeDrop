import { blue } from '@mui/material/colors';
import { FilledInput, FormControl, FormHelperText, InputLabel, InputAdornment, Box, Typography, IconButton, TextField, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import userService from '../../services/UserService';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { NavLink } from 'react-router-dom';
import InCenterAuth from '../../component/wrappers/InCenterAuth';
import { Context } from '../../index';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { LoadingButton } from '@mui/lab';
import { Alert } from '@mui/material';
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from '../../validateConfig';
import { USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH } from '../../validateConfig';
import { NAME_MAX_LENGTH, NAME_MIN_LENGTH } from '../../validateConfig';
import { EMAIL_PATTERN, EMAIL_MAX_LENGTH } from '../../validateConfig';
import RegisterSuccess from '../../component/Success/RegisterSuccess';




const SignUp = () => {
   const { handleSubmit, register, getValues, setError, clearErrors, formState: { errors, isValid, isSubmitting } } = useForm({ mode: 'onChange' })
   const [showPassword, setShowPassword] = useState({ password: false, rePassword: false });
   const [success, setSuccess] = useState(false)


   const handleClickShowPassword = (id) => setShowPassword((show) => {
      const showCopy = { ...show };
      showCopy[id] = !showCopy[id];
      return (showCopy)
   });

   const handleMouseDownPassword = (event) => {
      event.preventDefault();
   };

   const handleChange = () => {
      clearErrors('root')
   }


   const onSubmit = async (values) => {
      try {
        const {data} = await userService.signUp(values);
        setSuccess(data)
      } catch (e) {
         console.error(e);
         if (e?.response?.status === 400) {
          const errors = e?.response?.data || {};
          for (let key in errors) {
            setError(key, { type: 'server', message: errors[key] })
           }
           return
        }
         setError('root.server', { type: 'server', message: 'Упс! виникла помилка, спробуйте пізніше' })
      }
   }
   if (success) return <RegisterSuccess mail={success} />

   return (
         <InCenterAuth>
            <Typography sx={{ textAlign: 'center', mb: 3 }} id="transition-modal-title" variant="h6" component="h2">
               Реєстрація
            </Typography>
            <form onChange={handleChange} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }} onSubmit={handleSubmit(onSubmit)}>
               <TextField
                  error={!!errors.username}
                  {...register('username', {
                     required: "обов'язкове поле",
                     minLength: {
                        value: USERNAME_MIN_LENGTH,
                        message: `мінімум ${USERNAME_MIN_LENGTH} символи`
                     },
                     maxLength: {
                        value: USERNAME_MAX_LENGTH,
                        message: `максимум ${USERNAME_MAX_LENGTH} символів`
                     }
                  })}
                  label="Логін"
                  sx={{ color: blue[700] }}
                  helperText={errors?.username && (errors?.username?.message || 'некоректні данні')}
                  variant="filled"
               />
               <TextField
                  error={!!errors.email}
                  {...register('email', {
                     required: "обов'язкове поле",
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
               <TextField
                  error={!!errors.name}
                  {...register('name', {
                     required: "обов'язкове поле",
                     minLength: {
                        value: NAME_MIN_LENGTH,
                        message: `мінімум ${NAME_MIN_LENGTH} символи`
                     },
                     maxLength: {
                        value: NAME_MAX_LENGTH,
                        message: `максимум ${NAME_MAX_LENGTH} символів`
                     }
                  })}
                  label="Ім'я"
                  sx={{ color: blue[700] }}
                  helperText={errors?.name && (errors?.name?.message || 'некоректні данні')}
                  variant="filled"
               />
               <FormControl error={!!errors.password} variant='filled'>
                  <InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
                  <FilledInput
                     {...register('password', {
                        required: "обов'язкове поле",
                        minLength: {
                           value: PASSWORD_MIN_LENGTH,
                           message: `мінімум ${PASSWORD_MIN_LENGTH} символи`
                        },
                        deps: ['rePassword'],
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
               <FormControl error={!!errors.rePassword} variant='filled'>
                  <InputLabel htmlFor="outlined-adornment-rePassword">Введіть пароль ще раз</InputLabel>
                  <FilledInput
                     {...register('rePassword', {
                        required: "обов'язкове поле",
                        maxLength: {
                           value: PASSWORD_MAX_LENGTH,
                           message: `максимум ${PASSWORD_MAX_LENGTH} символів`
                        },
                        validate: v => getValues('password') === v
                     })}
                     type={showPassword['rePassword'] ? 'text' : 'password'}
                     id="outlined-adornment-rePassword"
                     endAdornment={
                        <InputAdornment position="end">
                           <IconButton
                              onClick={() => handleClickShowPassword('rePassword')}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                           >
                              {showPassword['rePassword'] ? <VisibilityOff /> : <Visibility />}
                           </IconButton>
                        </InputAdornment>
                     }
                  />
                  <FormHelperText>{errors?.rePassword && (errors?.rePassword?.message || 'паролі не співпадають')}</FormHelperText>
               </FormControl>
               {errors?.root?.server && <Alert severity='error' hidden={true} >{errors?.root?.server?.message}</Alert>}
               <LoadingButton loading={isSubmitting} endIcon={<DoubleArrowIcon />} disabled={!isValid} type='submit' variant="contained">Надіслати</LoadingButton>
               <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <NavLink to={'/SignIn'}>
                     <Typography sx={{ '&:hover': { color: blue[700] }, cursor: 'pointer', transition: '.2s', p: '1px' }} variant='body2' color={blue[900]} >
                        Авторизуватися
                     </Typography>
                  </NavLink>
               </Box>
            </form>
         </InCenterAuth>
   )
}

export default SignUp

