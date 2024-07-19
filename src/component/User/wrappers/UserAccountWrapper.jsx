import { Outlet, useNavigation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../Account/Header/Header';
import { LinearProgress, Box } from '@mui/material';
import { grey } from '@mui/material/colors';




function UserAccountWrapper() {

   const { state } = useNavigation()

   return (
      <div style={{ background: grey[800], minHeight: '100vh', display: 'flex', flexDirection: 'column',flex:1 }}>

            <Header />
            <Box sx={{ flex: "1", position: 'relative', display: 'flex', flexDirection: 'column' }}><Outlet /></Box>
      </div>
   );
}

export default UserAccountWrapper;
