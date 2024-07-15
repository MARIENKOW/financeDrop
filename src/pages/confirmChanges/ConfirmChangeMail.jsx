import { useParams } from 'react-router';
import { useState } from 'react';
import { blue } from '@mui/material/colors';
import { useForm } from 'react-hook-form';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { LoadingButton } from '@mui/lab';
import { Box, Typography, TextField, Alert } from '@mui/material';
import { MAIL_PATTERN, MAIL_MAX_LENGTH } from '../../validateConfig';
import InCenterAuth from '../../components/wrappers/InCenterAuth';


const ConfirmChangeMail = () => {

   const { token } = useParams()
   const { handleSubmit, register, getValues, setError, clearErrors, formState: { errors, isValid, isSubmitting } } = useForm({ mode: 'onChange' })
   const [success, setSuccess] = useState(false)


   const onSubmit = async (data) => {
      try {
         // await userController.changePassword(data)
         setSuccess(true)
      } catch (error) {
         console.log(error);
         if (error?.response?.status === 400) {
            const errors = error?.response?.data?.error
            if (errors) for (let key in errors) setError(key, { type: 'server', message: errors[key][0] })
            return
         }
         if (error?.response?.status === 403) {
            return setError('root.server', { type: 'server', message: 'Запит на зміну паролю вже було надіслано. Дочекайтесь коли сплине час, або перейдіть за посиланням на пошті, щоб підтвердити' })
         }
         setError('root.server', { type: 'server', message: 'Упс! виникла помилка, спробуйте пізніше' })
      }
   }

   const handleChange = () => {
      clearErrors('root')
   }


   return (
      <InCenterAuth>
         <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography id="transition-modal-title" sx={{ mb: 1 }} variant="h5" component="h2">
               Зміна пошти
            </Typography>
            <Typography id="transition-modal-title" color={'text.secondary'} variant="body2" component="h2">
               Напишіть нову адресу електронної пошти
            </Typography>
            <Typography id="transition-modal-title" color={'text.secondary'} variant="body2" component="h2">
               ми надішлемо вам посилання для підтвердження
            </Typography>
         </Box>
         <form onChange={handleChange} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }} onSubmit={handleSubmit(onSubmit)}>
            <TextField
               error={!!errors.email}
               {...register('email', {
                  required: "обов'язкове поле",
                  pattern: {
                     value: MAIL_PATTERN,
                     message: 'пошта має бути формату - example@mail.com'
                  },
                  maxLength: {
                     value: MAIL_MAX_LENGTH,
                     message: `максимум ${MAIL_MAX_LENGTH} символів`
                  }
               })}
               label="Нова пошта"
               sx={{ color: blue[700] }}
               helperText={errors?.email && (errors?.email?.message || 'некоректні данні')}
               variant="filled"
            />
            {errors?.root?.server && <Alert severity='error' hidden={true} >{errors?.root?.server?.message}</Alert>}
            <LoadingButton loading={isSubmitting} endIcon={<DoubleArrowIcon />} disabled={!isValid} type='submit' variant="contained">Надіслати</LoadingButton>
         </form>
      </InCenterAuth>
   )
}

export default ConfirmChangeMail
