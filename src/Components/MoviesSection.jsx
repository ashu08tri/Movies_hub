import { useState, useEffect } from "react";
import { Container, Grid, Card, CardContent, Typography, Box, styled } from "@mui/material";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Link } from "react-router-dom";



const CardImg = styled(Card)`
  ${({ theme }) => `
  transition: ${theme.transitions.create(['transform'], {
    duration: theme.transitions.duration.standard,
  })};
  &:hover {
    transform: scale(1.1);
  }
  `}
`;

const contentSX = {
    opacity: '0',
    transition: 'opacity .2s',
    backgroundImage: 'linear-gradient(rgb(0,0,0,0), rgb(0,0,0,1))',
    color: 'white',
    width: '100%', 
    height: '100%', 
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'end'
,
"&:hover": {
    opacity: '1'
}
}


function MoviesSection({ data }) {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1500)
    })
    return (
        <Container>
            <Grid container spacing={1.2} sx={{ justifyContent: { xs: 'center' } }}>
                {data.map((movie, i) => <Grid item key={i} xs={6} sm={4} md={3}>
                    <Link to={`movie/${movie.id}`}>
                        {isLoading ? <SkeletonTheme color="#202020" highlightColor="#444">
                            <Skeleton height={300} duration={0.5} count={3} />
                        </SkeletonTheme>
                            :
                            <CardImg sx={{ background: `url(https://www.themoviedb.org/t/p/original${movie.poster_path})`, height: { xs: '35vh', sm: '60vh' }, width: '100%', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                <CardContent sx={contentSX}>
                                    <Typography variant="h5">
                                        {movie.title}
                                    </Typography>
                                    <Box>
                                        <Typography>
                                            {movie.release_date}
                                        </Typography>
                                        <Typography>{movie.vote_average.toFixed(1)} <i className="fa fa-heart" style={{ fontSize: '24px', color: 'red' }}></i></Typography>
                                    </Box>
                                    <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>
                                        {movie.overview.slice(0, 110)}
                                    </Typography>
                                </CardContent>
                            </CardImg>}
                    </Link>
                </Grid>)}
            </Grid>
        </Container>
    )
}

export default MoviesSection