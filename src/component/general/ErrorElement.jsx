import { Typography, Button, ButtonGroup, Container } from "@mui/material"
import { NavLink } from "react-router-dom"
import BungalowIcon from '@mui/icons-material/Bungalow';
import ReplyIcon from '@mui/icons-material/Reply';
import { useRouteError } from "react-router-dom";

const ErrorElement = ({message}) => {
   const error = useRouteError()


   return (
      <Container sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2, alignItems: 'center', textAlign: 'center' }} gap={2}>
         <Typography variant={'h1'}>Oops!</Typography>
         <Typography variant={'h4'}>Something went wrong</Typography>
         <Typography variant={'body1'} color="text.secondary">{error?.message || message}</Typography>
         <ButtonGroup
            sx={{ gap: 1 }}
            size='large'
         >
            <NavLink to={-1}>
               <Button startIcon={<ReplyIcon />} variant="contained">
                  back
               </Button>
            </NavLink>
            <NavLink to={'/'}>
               <Button endIcon={<BungalowIcon />} variant="contained">
                  home
               </Button>
            </NavLink>
         </ButtonGroup>
      </Container>
   )
}

export default ErrorElement