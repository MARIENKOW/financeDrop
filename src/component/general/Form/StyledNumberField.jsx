import { FilledInput, FormHelperText, InputLabel } from "@mui/material";
import { StyledFormControl } from "./StyledPassword";
import {InputAdornment} from "@mui/material";

export const StyledNumberField = ({ startAdornment, label,errors,register ,options,errMessage = 'incorrect data'}) => {
   return (
      <StyledFormControl sx={{width:'100%'}} error={!!errors[register.name]} variant="filled">
         <InputLabel htmlFor={`filled-adornment-amount-${register.name}`}>{label}</InputLabel>
         <FilledInput
            {...register}
            // type="number"
            id={`filled-adornment-amount-${register.name}`}
            startAdornment={startAdornment && <InputAdornment position="start">{startAdornment}</InputAdornment>}
         />
         <FormHelperText>
            {errors?.[register.name] &&
               (errors?.[register.name]?.message || errMessage)}
         </FormHelperText>
      </StyledFormControl>
   );
};
