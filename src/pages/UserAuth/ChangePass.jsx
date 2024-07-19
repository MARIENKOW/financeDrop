

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
import { StyledPassword } from '../../component/general/Form/StyledPassword';



const ChangePass = () => {

   const { link } = useParams()
   const { handleSubmit, register, getValues, setError, clearErrors, formState: { errors, isValid, isSubmitting } } = useForm({ mode: 'onChange' })
   const [success, setSuccess] = useState(false)
   const [isLoading, setIsLoading] = useState(true);
   const [errorElement, setErrorElement] = useState(null);

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
         setError('root.server', { type: 'server', message: 'Oops! something went wrong, try again later' })
      }
   }

   const handleChange = () => {
      clearErrors('root')
   }

   if(success) return <PasswordWasChangedSuccess/>

   return (
         <InCenterAuth>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
               <Typography fontWeight={600} color={!isValid?'secondary':'primary'} sx={{ mb: 1 }} variant="h5" component="h2">
                  Change password
               </Typography>
            </Box>
            <form onChange={handleChange} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }} onSubmit={handleSubmit(onSubmit)}>
               <StyledPassword 
                  errors={errors}
                  register={register('password', {
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
                  label={'New password'}
               />
               <StyledPassword 
                  errors={errors}
                  register={register('rePassword', {
                     required: "required field",
                     maxLength: {
                        value: PASSWORD_MAX_LENGTH,
                        message: `maximum ${PASSWORD_MAX_LENGTH} characters`
                     },
                     validate: v => getValues('password') === v
                  })}
                  label={'Enter your password again'}
                  errMessage='passwords do not match'
               />
               {errors?.root?.server && <Alert severity='error' variant='filled' hidden={true} >{errors?.root?.server?.message}</Alert>}
               <LoadingButton loading={isSubmitting} endIcon={<DoubleArrowIcon />} disabled={!isValid} type='submit' variant="contained">Send</LoadingButton>
            </form>
         </InCenterAuth>
   )
}

export default ChangePass


