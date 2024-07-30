import { useTheme } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { NavLink } from 'react-router-dom'

const LinkItem = ({list:{name,link,icon},selected,open,click}) => {

   const theme = useTheme()

   return (
      <NavLink onClick={()=>click(link)} to={link} >
         <ListItem selected={link === selected} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
               sx={{
                  minHeight: 40,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2,
               }}
            >
               <ListItemIcon
                  sx={{
                     minWidth: 0,
                     mr: open ? 2 : 'auto',
                     justifyContent: 'center',
                     color:theme.palette.secondary.main
                  }}
               >
                  {icon}
               </ListItemIcon>
               <ListItemText primary={name} sx={{ display: open ? 'block' : 'none',color:theme.palette.secondary.contrastText }} />
            </ListItemButton>
         </ListItem>
      </NavLink >
   )
}
export default LinkItem