import { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { Button, Box, useTheme } from "@mui/material";
import { useForm } from "react-hook-form";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { Context } from "../../../User";
import { StyledAlert } from "../../../component/general/StyledAlert";
import { StyledLoadingButton } from "../../../component/general/StyledLoadingButton";
import { StyledTextField } from "../../../component/general/Form/StyledTextField";
import { Title } from "../../../component/general/Title";
import { NAME_MAX_LENGTH, NAME_MIN_LENGTH } from "../../../validateConfig";
// import Success from "../../../components/Settings/Success"

const ChangeName = () => {
   const theme = useTheme();

   const {
      user: { name },
   } = useContext(Context);
   const [success, setSuccess] = useState(false);
   const {
      handleSubmit,
      register,
      setError,
      clearErrors,
      setValue,
      formState: { errors, isValid, isSubmitting, isDirty },
   } = useForm({ mode: "onChange" });

   const onSubmit = async (data) => {
      try {
         // await changeFullName(data)
         setSuccess(true);
         setError("root.server", {
            type: "server",
            message: "Упс! виникла помилка, спробуйте пізніше",
         });
      } catch (error) {
         console.log(error);
         if (error?.response?.status === 400) {
            const errors = error?.response?.data?.error;
            if (errors)
               for (let key in errors)
                  setError(key, { type: "server", message: errors[key][0] });
            return;
         }
         setError("root.server", {
            type: "server",
            message: "Упс! виникла помилка, спробуйте пізніше",
         });
      }
   };

   // const handleRepeat = () => {
   //    setValue('family_name', familia)
   //    setValue('given_name', name)
   //    setValue('patronymic_name', otchestvo)
   //    setSuccess(false)
   // }

   // if (success) return <Success handleCLick={handleRepeat} />

   const handleChange = () => {
      clearErrors("root");
   };

   return (
      <Box
         flex={1}
         display={"flex"}
         flexDirection={"column"}
         justifyContent={"center"}
         alignItems={"center"}
      >
         <Box
            onChange={handleChange}
            component={"form"}
            onSubmit={handleSubmit(onSubmit)}
            sx={{
               display: "flex",
               flexDirection: "column",
               maxWidth: "400px",
               width: "100%",
               justifyContent: "center",
               gap: 1,
            }}
         >
            <Title
               sx={{ mb: 3, color: theme.palette.secondary.contrastText }}
               label={"Change name"}
            />

            <StyledTextField
               errors={errors}
               label="Name"
               options={{
                  defaultValue: name,
                  helperText:
                     errors?.given_name &&
                     (errors?.given_name?.message || "некоректні данні"),
               }}
               register={register("given_name", {
                  required: "обов'язкове поле",
                  minLength: {
                     value: NAME_MIN_LENGTH,
                     message: `мінімум ${NAME_MIN_LENGTH} символи`,
                  },
                  maxLength: {
                     value: NAME_MAX_LENGTH,
                     message: `максимум ${NAME_MAX_LENGTH} символів`,
                  },
               })}
            />
            {errors?.root?.server && (
               <StyledAlert severity="error" variant="filled" hidden={true}>
                  {errors?.root?.server?.message}
               </StyledAlert>
            )}
            <StyledLoadingButton
               loading={isSubmitting}
               endIcon={<DoubleArrowIcon />}
               disabled={!isValid || !isDirty}
               type="submit"
               variant="contained"
               sx={{ mt: errors?.root?.server ? 0 : 3 }}
            >
               Send
            </StyledLoadingButton>
         </Box>
      </Box>
   );
};

export default observer(ChangeName);
