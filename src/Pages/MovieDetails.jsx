import { Box, Container, CardMedia, Grid, Typography, Button } from "@mui/material";
import { useState } from "react";
import { Link, json } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useLoaderData } from "react-router-dom";
import Booking from "../Components/Booking";

function MovieDetails() {
  const data = useLoaderData();
  const Image = 'https://www.themoviedb.org/t/p/original';

  const [ticketModal, setTicketModal] = useState(false);

  return (
    <>
      <Box sx={{ bgcolor: 'black', height: '135vh' }}>
        <Booking title={data.title} open={ticketModal} banner={`${Image}${data.poster_path}`} onClose={() => setTicketModal(false)} />
        <Container sx={{ height: { xs: '40vh', sm: '60vh' }, background: `url(${Image}${data.backdrop_path})`, backgroundSize: 'cover' }}>
          <Grid container height={'100vh'} columnSpacing={2}>
            <Grid item xs={10} sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', my: '15px', pt: { xs: '100px', sm: '0' } }}>
              <CardMedia
                component='img'
                image={`${Image}${data.poster_path}`}
                sx={{
                  borderRadius: '8px',
                  height: { xs: '300px', sm: '430px' },
                  width: { xs: '200px', sm: 'initial' }
                }}
              />
              <Box>
                <Link to={data.homepage}><Button size="small" variant="contained" color="secondary" sx={{ m: '5px', fontWeight: 'bold' }}>HomePage</Button></Link>
                <Link to={`https://www.imdb.com/title/${data.imdb_id}`}><Button size="small" variant="contained" sx={{ m: '5px', bgcolor: 'yellow', color: 'black', fontWeight: 'bold' }}>IMDb</Button></Link>
                <Button size="small" sx={{ color: 'white', bgcolor: "green", m: '5px', fontWeight: 'bold' }} onClick={() => {
                  setTicketModal(true)
                }}>Book Ticket</Button>
              </Box>
            </Grid>

            <Grid item color={'white'} sm={11}>
              <Typography component="div" variant="h5" fontSize={'28  px'}>
                {data.title}
              </Typography>
              <Typography component="div">
                {data.tagline}
              </Typography>
              <Box display={'flex'} alignItems={'center'}>
                <Typography>
                  Ratings: {data.vote_average.toFixed(1)}
                </Typography>
                <IconButton size="small" sx={{ color: "red", mr: '5px' }}>
                  <FavoriteIcon />
                </IconButton>
                <Typography>
                  ({data.vote_count}) votes
                </Typography>
              </Box>
              <Typography component="div">
                Duration: {data.runtime} mins
              </Typography>
              <Typography component="div">
                Release Date: {data.release_date}
              </Typography>
              <Box display={'flex'}>
                {data.genres.map(item => <Typography sx={{ p: '4px 8px', border: '1.5px solid white', borderRadius: '20px', m: '5px 5px 5px 0' }} key={item.id}>
                  {item.name}
                </Typography>)}
              </Box>
              <Typography variant="h5">
                Synopsis
              </Typography>
              <Typography component='div'>
                {data.overview}
              </Typography>
            </Grid>
            <Grid item mt={5} color={'white'}>
              <Typography variant="h5">Production Companies</Typography>
              {data.production_companies.slice(-5).map(item => <Box key={item.id}>
                <Typography>{item.name}</Typography>
              </Box>)}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

export default MovieDetails;

export const loader = async ({ params }) => {
  const { id } = params;
  const apiKey = (process.env.REACT_APP_API_KEY);
  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);

  if (!response.ok) {
    throw json({ message: 'Something went wrong During data fetching!' }, { status: 401 })
  } else {
    const res = await response.json();
    return res;
  }

}
