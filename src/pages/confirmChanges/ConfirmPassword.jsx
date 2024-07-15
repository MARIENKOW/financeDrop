import { LinearProgress } from '@mui/material';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import userController from '../../controllers/user-controller';
import ErrorElement from '../../components/ErrorElement';
import PasswordWasChanged from '../../components/PasswordWasChanged';

const ConfirmPassword = () => {

   const { token } = useParams()
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState(false)

   useEffect(() => {
      const fetchConfirmPassword = async () => {
         try {
            await userController.confirmPassword(token)
         } catch (error) {
            console.log(error);
            if (error?.response?.status === 403) return setError('Час дії токену сплив')
            if (error?.response?.status === 404) return setError('Токен не знайдено')
            setError(error?.message)
         } finally {
            setLoading(false)
         }
      }

      fetchConfirmPassword()
   }, [])

   if (loading) return <LinearProgress />

   if (error) return <ErrorElement message={error} />

   return <PasswordWasChanged />
}

export default ConfirmPassword
