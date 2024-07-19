import { InputLabel,FormControl,InputAdornment,FormHelperText,IconButton } from "@mui/material"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { useState } from "react"
import Visibility from "@mui/icons-material/Visibility"
import { useTheme } from "@mui/material"
import {  styled } from "@mui/material";
import {TextField} from "@mui/material";
import {FilledInput} from "@mui/material";

const StyledFormControl = styled(FormControl)(({theme,error}) => ({
   ...theme,
   "& label": {
      color: theme.palette.secondary.main
   },
   '& .MuiFilledInput-root':{
      background:theme.palette.secondary.light,
      borderBottomColor:theme.palette.secondary.main
   },
   '& .MuiFilledInput-root:before':{
      borderBottomColor:error?theme.palette.error:theme.palette.secondary.main
   },
   "& .MuiFilledInput-input": {
      color:theme.palette.secondary.contrastText
   },
}));


export const StyledPassword = ({label,errors,register,errMessage = 'incorrect data'})=>{

   const theme = useTheme()

   const [showPassword, setShowPassword] = useState(false);

   const handleMouseDownPassword = (event) => {
      event.preventDefault();
   };
   return <StyledFormControl error={!!errors[register.name]} variant='filled'>
   <InputLabel  htmlFor={`outlined-adornment-password-${register.name}`}>{label}</InputLabel>
   <FilledInput
      {...register}
      type={showPassword ? 'text' : 'password'}
      id={`outlined-adornment-password-${register.name}`}
      endAdornment={
         <InputAdornment position="end">
            <IconButton
               onClick={() => setShowPassword(state => !state)}
               onMouseDown={handleMouseDownPassword}
               edge="end"
            >
               {showPassword ? <VisibilityOff color="secondary" /> : <Visibility color="secondary" />}
            </IconButton>
         </InputAdornment>
      }
   />
   <FormHelperText>{errors?.[register.name] && (errors?.[register.name]?.message || errMessage)}</FormHelperText>
</StyledFormControl>
}