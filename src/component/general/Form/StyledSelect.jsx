import { FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import { StyledFormControl } from "./StyledPassword";

export const StyledSelect = ({
   label,
   error,
   options,
   errMessage = "incorrect data",
   sx,
   handleChange,
   value,
   name,
   arr,
}) => {
   console.log(error);
   return (
      <StyledFormControl error={!!error?.[name]} sx={sx} fullWidth>
         <InputLabel id={`demo-simple-select-standard-label-${name}`}>
            {label}
         </InputLabel>
         <Select
            labelId={`demo-simple-select-standard-label-${name}`}
            id={`demo-simple-select-standard-${name}`}
            value={value}
            onChange={handleChange}
            {...options}
            label={label}
         >
            {arr?.map((el) => (
               <MenuItem key={el[1]} value={el[0]}>{el[1]}</MenuItem>
            ))}
         </Select>
         <FormHelperText>
            {error?.[name] && (error?.[name]?.message || errMessage)}
         </FormHelperText>
      </StyledFormControl>
   );
};
