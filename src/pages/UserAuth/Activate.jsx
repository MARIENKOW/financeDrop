import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import ErrorElement from '../../component/ErrorElement';
import Loading from "../../component/Loading/Loading";
import userService from '../../services/UserService';
import AccountActivateSuccess from '../../component/Success/AccountActivateSuccess';




const Activate = () => {

   const { token } = useParams()
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState(false)

   useEffect(() => {
      const fetchConfirmPassword = async () => {
         try {
            await userService.activate({token})
         } catch (error) {
            console.log(error);
            if (error?.response?.status === 400) return setError(error?.response?.data || true)
            setError(true)
         } finally {
            setLoading(false)
         }
      }

      fetchConfirmPassword()
   }, [])

   if (loading) return <Loading />

   if (error) return <ErrorElement message={error} />

   return <AccountActivateSuccess/>
}

export default Activate
