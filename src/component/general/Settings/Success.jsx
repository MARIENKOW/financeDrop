import { Box, Typography,Button } from "@mui/material"
import DoneAllIcon from '@mui/icons-material/DoneAll';


const Success = ({handleCLick}) => {
   return (
      <Box flex={1} gap={2} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
         <DoneAllIcon sx={{width:50,height:50}} color='primary'/>
         <Typography variant="h6" color="initial">Дані успішно змінено</Typography>
         <Button variant='contained' onClick={handleCLick}>Повторити</Button>
      </Box>
   )

}

export default Success