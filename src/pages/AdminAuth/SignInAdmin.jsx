import { grey, blue } from '@mui/material/colors';
import { FilledInput, FormControl, FormHelperText, InputLabel, Container, InputAdornment, Box, Typography, IconButton, TextField, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { useContext, useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InCenterAuth from '../../component/general/wrappers/InCenterAuth';
import { AdminContext } from '../../Admin';
import { Alert } from '@mui/material';
import { ADMIN_PASSWORD_MAX_LENGTH, ADMIN_NAME_MAX_LENGTH,ADMIN_NAME_MIN_LENGTH } from '../../validateConfig';
import { enqueueSnackbar } from 'notistack';


const SignInAdmin = () => {

   const { signInAdmin } = useContext(AdminContext);
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
         await signInAdmin(data);
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
               Admin Sign In
            </Typography>
            <form onChange={handleChange} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }} onSubmit={handleSubmit(onSubmit)}>
            <TextField
                  error={!!errors.name}
                  {...register('name', {
                     required: "required field",
                     minLength: {
                        value: ADMIN_NAME_MIN_LENGTH,
                        message: `minimum ${ADMIN_NAME_MIN_LENGTH} characters`
                     },
                     maxLength: {
                        value: ADMIN_NAME_MAX_LENGTH,
                        message: `maximum ${ADMIN_NAME_MAX_LENGTH} characters`
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
                        required: "required",
                        maxLength: {
                           value: ADMIN_PASSWORD_MAX_LENGTH,
                           message: `maximunm ${ADMIN_PASSWORD_MAX_LENGTH} characters`
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
            </form>
         </InCenterAuth>
   )
}

export default SignInAdmin

