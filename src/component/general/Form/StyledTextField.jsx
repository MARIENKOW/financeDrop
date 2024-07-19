import {  styled } from "@mui/material";
import {TextField} from "@mui/material";

export const STF = styled(TextField)(({theme,error}) => ({
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

export const StyledTextField = ({errors,register,label,errMessage='incorrect data'})=>{
   return <STF
      error={!!errors[register.name]}
      {...register}
      label={label}
      helperText={errors?.[register.name] && (errors?.[register.name]?.message || errMessage)}
      variant="filled"
   />
}


