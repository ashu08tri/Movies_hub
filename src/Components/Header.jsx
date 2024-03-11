import { Link } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import { Card, CardMedia, Typography, CardContent,Box} from '@mui/material';
import { styled } from '@mui/material/styles';
import classes from './Header.module.css';

const Responsive = styled('div')(({theme}) => ({
    [theme.breakpoints.down('md')] : {
      top : '170px',
    }
}));

function Header({ data }) {
  return (
    <>
      <Carousel indicators={false} height={600} className={classes.carousel}>
        {
          data.slice(0,8).map((item, i) =>
            <Card key={i} position= 'relative'>
              <CardContent sx={{p: '0'}}>
                  <Link to={`movie/${item.id}`} key={i}>
                   <CardMedia
                    component='img'
                    image={`https://www.themoviedb.org/t/p/original${item.backdrop_path}`}
                    sx={{ width: '100%', height: '100%'}}
                    />
                  </Link>
                  </CardContent>
                  <Responsive sx={{position: 'absolute' ,color: "white",top: 380,left: "35%",transform: "translateX(-50%)", width: '60%'}}>
                  <Typography variant='h3' sx={{fontWeight: '600', fontSize: {xs: 'large', md: '45px'},textAlign: {xs: 'left'}}}>
                     {item.title}
                  </Typography>
                  <Box sx={{display:{ md: 'flex', xs: 'none' }, width: '35%', justifyContent: 'space-between'}}>
                  <Typography variant='h4'>
                     {item.release_date} 
                  </Typography>
                  <Typography variant='h4'>{item.vote_average.toFixed(1)} <i className="fa fa-heart" style={{fontSize: '24px'}}></i></Typography>
                  </Box>
                  <Typography sx={{display: {md:'block',xs: 'none'}}}>
                     {item.overview}
                  </Typography>
                  </Responsive>
            </Card>
            
          )
        }
      </Carousel>
    </>
  )
}

export default Header;