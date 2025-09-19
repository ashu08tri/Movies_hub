import { Link } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import { Card, CardMedia, Typography, CardContent, Box, Skeleton, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import classes from './Header.module.css';
import { useState, useEffect } from 'react';
import Booking from './Booking';

const Responsive = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    top: '170px',
  }
}));

function Header({ data }) {
  const [isLoading, setIsLoading] = useState(true);
  const [ticketModal, setTicketModal] = useState(false);
  const [movieTitle, setMovieTitle] = useState(false);

  useEffect(() => {
    // simulate loading until data is ready
    if (data && data.length > 0) {
      setTimeout(() => setIsLoading(false), 1000);
    }
  }, [data]);

  return (
    <>
      <Carousel indicators={false} height={620} className={classes.carousel}>
        {isLoading
          ? Array.from(new Array(3)).map((_, i) => (
              <Card key={i} position="relative">
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={600}
                  sx={{ bgcolor: "grey.900" }}
                />
                <Responsive
                  sx={{
                    position: "absolute",
                    color: "white",
                    top: 380,
                    left: "35%",
                    transform: "translateX(-50%)",
                    width: "60%",
                  }}
                >
                  <Skeleton
                    variant="text"
                    width="80%"
                    height={60}
                    sx={{ bgcolor: "grey.800", mb: 1 }}
                  />
                  <Box
                    sx={{
                      display: { md: "flex", xs: "none" },
                      width: "35%",
                      justifyContent: "space-between",
                    }}
                  >
                    <Skeleton
                      variant="text"
                      width={120}
                      height={40}
                      sx={{ bgcolor: "grey.800" }}
                    />
                    <Skeleton
                      variant="text"
                      width={60}
                      height={40}
                      sx={{ bgcolor: "grey.800" }}
                    />
                  </Box>
                  <Skeleton
                    variant="text"
                    width="100%"
                    height={80}
                    sx={{ bgcolor: "grey.800", mt: 2 }}
                  />
                </Responsive>
              </Card>
            ))
          : data.slice(0, 8).map((item, i) => (
              <Card key={i} position="relative">
                <Booking title={movieTitle} open={ticketModal} banner={`https://www.themoviedb.org/t/p/original${item.backdrop_path}`} onClose={() => setTicketModal(false)} />
                <CardContent sx={{ p: 0 }}>
                  <Link to={`movie/${item.id}`} key={i}>
                    <CardMedia
                      component="img"
                      image={`https://www.themoviedb.org/t/p/original${item.backdrop_path}`}
                      sx={{ width: "100%", height: "100%" }}
                    />
                  </Link>
                </CardContent>
                <Responsive
                  sx={{
                    position: "absolute",
                    color: "white",
                    top: 380,
                    left: "35%",
                    transform: "translateX(-50%)",
                    width: "60%",
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: "600",
                      fontSize: { xs: "large", md: "45px" },
                      textAlign: { xs: "left" },
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Box
                    sx={{
                      display: { md: "flex", xs: "none" },
                      width: "35%",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="h4">{item.release_date}</Typography>
                    <Typography variant="h4">
                      {item.vote_average.toFixed(1)}{" "}
                      <i
                        className="fa fa-heart"
                        style={{ fontSize: "24px" }}
                      ></i>
                    </Typography>
                  </Box>
                  <Typography sx={{ display: { md: "block", xs: "none" } }}>
                    {item.overview}
                  </Typography>
                   <Box sx={{m: '3px 0'}}><Button sx={{color: 'white', bgcolor: "green"}} onClick={() => {
                      setMovieTitle(item.title)
                      setTicketModal(true)}}>Book Ticket</Button></Box>
                </Responsive>
              </Card>
            ))}
      </Carousel>
    </>
  );
}

export default Header;
