

import { useParams } from 'react-router';
import { useState ,useEffect} from 'react';
import { blue } from '@mui/material/colors';
import { useForm } from 'react-hook-form';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { LoadingButton } from '@mui/lab';
import { Box, Typography, TextField, Alert } from '@mui/material';
import InCenterAuth from '../../component/general/wrappers/InCenterAuth';
import { FilledInput, FormHelperText, InputLabel, IconButton, FormControl, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from "../../validateConfig"
import Loading from '../../component/general/Loading/Loading';
import userService from '../../services/UserService';
import ErrorElement from '../../component/general/ErrorElement';
import PasswordWasChangedSuccess from '../../component/User/Success/PasswordWasChangedSuccess';


const ChangePass = () => {

   const { link } = useParams()
   const { handleSubmit, register, getValues, setError, clearErrors, formState: { errors, isValid, isSubmitting } } = useForm({ mode: 'onChange' })
   const [success, setSuccess] = useState(false)
   const [showPassword, setShowPassword] = useState({ password: false, rePassword: false });
   const [isLoading, setIsLoading] = useState(true);
   const [errorElement, setErrorElement] = useState(null);



   const handleClickShowPassword = (id) => setShowPassword((show) => {
      const showCopy = { ...show };
      showCopy[id] = !showCopy[id];
      return (showCopy)
   });

   const handleMouseDownPassword = (event) => {
      event.preventDefault();
   };

   useEffect(() => {
    const checkLink = async () => {

      try {
        await userService.checkChangePassLink({ rememberPassLink: link });
      } catch (error) {
        if(error?.response?.status === 403) return setErrorElement(error?.response?.data || true)
        setErrorElement(true)
      }finally{
        setIsLoading(false)
      }
    }
    checkLink()
  }, [])

  if (isLoading) return <Loading />

  if(errorElement) return <ErrorElement message={errorElement}/>


   const onSubmit = async (data) => {
      try {
         await userService.changePassword({...data,rememberPassLink: link})
         setSuccess(true)
         throw {}
      } catch (error) {
         console.log(error);
         if (error?.response?.status === 400) {
            const errors = error?.response?.data
            if (errors) for (let key in errors) setError(key, { type: 'server', message: errors[key] })
            return
         }
         if (error?.response?.status === 403) {
            const message = error?.response?.data
            return setErrorElement(message || true)
         }
         setErrorElement(true)
      }
   }

   const handleChange = () => {
      clearErrors('root')
   }

   if(success) return <PasswordWasChangedSuccess/>

   return (
         <InCenterAuth>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
               <Typography id="transition-modal-title" sx={{ mb: 1 }} variant="h5" component="h2">
                  Change password
               </Typography>
            </Box>
            <form onChange={handleChange} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }} onSubmit={handleSubmit(onSubmit)}>
               <FormControl error={!!errors.password} variant='filled'>
                  <InputLabel htmlFor="outlined-adornment-password">New password</InputLabel>
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
               <LoadingButton loading={isSubmitting} endIcon={<DoubleArrowIcon />} disabled={!isValid} type='submit' variant="contained">Send</LoadingButton>
            </form>
         </InCenterAuth>
   )
}

export default ChangePass


