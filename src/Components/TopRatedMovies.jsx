import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';

function TopRatedMovies({data}) {

    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 6
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 4
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 2
        }
      };
  return (
   <>
   <Typography variant="h4" sx={{textAlign: 'center', color: 'white', m: '5px'}}>Top-Rated</Typography>
   <Carousel responsive={responsive} infinite={true} autoPlay={true} rtl={true}>
    {data.slice(11,20).map(item => <Link to={`movie/${item.id}`} key={item.id}><img src={`https://www.themoviedb.org/t/p/original${item.poster_path}`} alt="popular" key={item.id} style={{width: '200px', height: '200px'}}/></Link>)}
    </Carousel>
   </>
  )
}

export default TopRatedMovies;