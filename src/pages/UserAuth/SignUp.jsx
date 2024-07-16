import { blue } from '@mui/material/colors';
import { FilledInput, FormControl, FormHelperText, InputLabel, InputAdornment, Box, Typography, IconButton, TextField, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import userService from '../../services/UserService';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { NavLink } from 'react-router-dom';
import InCenterAuth from '../../component/general/wrappers/InCenterAuth';
import { Context } from '../../index';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { LoadingButton } from '@mui/lab';
import { Alert } from '@mui/material';
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from '../../validateConfig';
import { USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH } from '../../validateConfig';
import { NAME_MAX_LENGTH, NAME_MIN_LENGTH } from '../../validateConfig';
import { EMAIL_PATTERN, EMAIL_MAX_LENGTH } from '../../validateConfig';
import RegisterSuccess from '../../component/User/Success/RegisterSuccess';




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
         setError('root.server', { type: 'server', message: 'Oops! something went wrong, try again later' })
      }
   }
   if (success) return <RegisterSuccess mail={success} />

   return (
         <InCenterAuth>
            <Typography sx={{ textAlign: 'center', mb: 3 }} id="transition-modal-title" variant="h6" component="h2">
               Sign Up
            </Typography>
            <form onChange={handleChange} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }} onSubmit={handleSubmit(onSubmit)}>
               <TextField
                  error={!!errors.username}
                  {...register('username', {
                     required: "required field",
                     minLength: {
                        value: USERNAME_MIN_LENGTH,
                        message: `minimum ${USERNAME_MIN_LENGTH} characters`
                     },
                     maxLength: {
                        value: USERNAME_MAX_LENGTH,
                        message: `maximum ${USERNAME_MAX_LENGTH} characters`
                     }
                  })}
                  label="Username"
                  sx={{ color: blue[700] }}
                  helperText={errors?.username && (errors?.username?.message || 'incorrect data')}
                  variant="filled"
               />
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
               <TextField
                  error={!!errors.name}
                  {...register('name', {
                     required: "required field",
                     minLength: {
                        value: NAME_MIN_LENGTH,
                        message: `minimum ${NAME_MIN_LENGTH} characters`
                     },
                     maxLength: {
                        value: NAME_MAX_LENGTH,
                        message: `maximum ${NAME_MAX_LENGTH} characters`
                     }
                  })}
                  label="Name"
                  sx={{ color: blue[700] }}
                  helperText={errors?.name && (errors?.name?.message || 'incorrect data')}
                  variant="filled"
               />
               <FormControl error={!!errors.password} variant='filled'>
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                  <FilledInput
                     {...register('password', {
                        required: "required field",
                        minLength: {
                           value: PASSWORD_MIN_LENGTH,
                           message: `minimum ${PASSWORD_MIN_LENGTH} characters`
                        },
                        deps: ['rePassword'],
                        maxLength: {
                           value: PASSWORD_MAX_LENGTH,
                           message: `maximum ${PASSWORD_MAX_LENGTH} characters`
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
               <FormControl error={!!errors.rePassword} variant='filled'>
                  <InputLabel htmlFor="outlined-adornment-rePassword">Enter your password again</InputLabel>
                  <FilledInput
                     {...register('rePassword', {
                        required: "required field",
                        maxLength: {
                           value: PASSWORD_MAX_LENGTH,
                           message: `maximum ${PASSWORD_MAX_LENGTH} characters`
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
                  <FormHelperText>{errors?.rePassword && (errors?.rePassword?.message || 'passwords do not match')}</FormHelperText>
               </FormControl>
               {errors?.root?.server && <Alert severity='error' hidden={true} >{errors?.root?.server?.message}</Alert>}
               <LoadingButton loading={isSubmitting} endIcon={<DoubleArrowIcon />} disabled={!isValid} type='submit' variant="contained">Надіслати</LoadingButton>
               <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <NavLink to={'/SignIn'}>
                     <Typography sx={{ '&:hover': { color: blue[700] }, cursor: 'pointer', transition: '.2s', p: '1px' }} variant='body2' color={blue[900]} >
                        Sign In
                     </Typography>
                  </NavLink>
               </Box>
            </form>
         </InCenterAuth>
   )
}

export default SignUp

