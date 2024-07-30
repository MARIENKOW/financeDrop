import { Box, Typography,Button } from "@mui/material"
import AccessTimeIcon from '@mui/icons-material/AccessTime';


const PasswordTime = ({time}) => {
   return (
      <Box p={1} maxWidth={300} margin={'0 auto'} flex={1} gap={2} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
         <AccessTimeIcon sx={{width:50,height:50}} color='error'/>
         <Typography textAlign={'center'} variant='h6' color="initial">Запит на зміну паролю вже було надіслано</Typography>
         <Typography textAlign={'center'} variant='body2' color='text.secondary'>Дочекайтесь коли сплине час, або перейдіть за посиланням на пошті, щоб підтвердити</Typography>
         {time !== false && time!== true ? <Typography textAlign={'center'} variant='body2' color='text.secondary'>Часу залишилось: {time} хвилини</Typography>:null}
      </Box>
   )

}

export default PasswordTime