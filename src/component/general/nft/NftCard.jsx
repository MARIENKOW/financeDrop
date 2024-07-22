import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material';

export default function NftCard({nft}) {
   const theme = useTheme()
  return (
    <Card sx={{ width: 145,borderRadius:'10px',overflow:'hidden',display:'flex',flexDirection:'column' }}>
      <CardMedia
        component="img"
        alt={nft?.img?.name}
        width={'100%'}
        image={nft?.img?.path}
      />
      <CardContent sx={{bgcolor:theme.palette.secondary.light,flex:1,p:1}}>
        <Typography sx={{whiteSpace:'nowrap',textOverflow:'ellipsis',overflow:'hidden'}} color={theme.palette.secondary.contrastText} variant="h5">
          {nft?.name}
        </Typography>
        {/* <Typography sx={{whiteSpace:" pre-wrap"}} variant="body2" color={theme.palette.secondary.contrastText}>
          {nft?.description}
        </Typography> */}
        <Typography variant="body2" color={theme.palette.secondary.contrastText}>
          {nft?.price}
        </Typography>
        <Typography variant="body2" color={theme.palette.secondary.contrastText}>
          {nft?.days}
        </Typography>
        <Typography variant="body2" color={theme.palette.secondary.contrastText}>
          {nft?.percent}
        </Typography>
      </CardContent>
      {/* <CardActions> */}
        <Button sx={{borderRadius:0}} target="_blank" fullWidth variant="contained" href={nft?.link} >Open</Button>
      {/* </CardActions> */}
    </Card>
  );
}