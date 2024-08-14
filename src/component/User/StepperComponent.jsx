import DoneIcon from "@mui/icons-material/Done";
import StepConnector, {
   stepConnectorClasses,
} from "@mui/material/StepConnector";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import ScreenshotIcon from "@mui/icons-material/Screenshot";
import RecommendIcon from "@mui/icons-material/Recommend";
import {
   Box,
   Button,
   Step,
   StepLabel,
   Stepper,
   styled,
   Typography,
   useTheme,
} from "@mui/material";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
   [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 14,
   },
   [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
         backgroundImage:
            "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
      },
   },
   [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
         backgroundImage:
            "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
      },
   },
   [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor: theme.palette.secondary.main,
      borderRadius: 1,
   },
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
   backgroundColor: theme.palette.secondary.light,
   zIndex: 1,
   color: theme.palette.secondary.contrastText,
   width: 30,
   height: 30,
   display: "flex",
   borderRadius: "50%",
   justifyContent: "center",
   alignItems: "center",
   ...(ownerState.active && {
      backgroundImage:
         "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
      boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
   }),
   ...(ownerState.completed && {
      backgroundImage:
         "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
   }),
}));

export const StepperComponent = ({ steps, activeStep }) => {
   const theme = useTheme();

   function ColorlibStepIcon(props) {
      const { active, completed, className } = props;

      const icons = steps.map((el) => el.icon);

      return (
         <ColorlibStepIconRoot
            ownerState={{ completed, active }}
            className={className}
         >
            {completed ? (
               <DoneIcon fontSize="small" />
            ) : (
               icons[String(props.icon - 1)]
            )}
         </ColorlibStepIconRoot>
      );
   }

   return (
      <Stepper
         alternativeLabel
         connector={<ColorlibConnector />}
         activeStep={activeStep}
      >
         {steps.map((item, index) => (
            <Step color="primary" key={item.name}>
               <StepLabel StepIconComponent={ColorlibStepIcon}>
                  <Typography
                     color={
                        activeStep === index
                           ? theme.palette.secondary.contrastText
                           : theme.palette.secondary.main
                     }
                     variant="body1"
                  >
                     {item.name}
                  </Typography>
               </StepLabel>
            </Step>
         ))}
      </Stepper>
   );
};
