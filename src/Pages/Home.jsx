import { Container } from "@mui/material";
import { useState, useEffect, lazy } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Header from "../Components/Header";
import styles from './Home.module.css';
const MoviesSection = lazy(() => import ("../Components/MoviesSection"))


function Home({apiKey}) {

  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState('popular')
  const [data, setData] = useState([]);

  const movieChangeHandler = e => {
    e.preventDefault();
    setMovies(e.target.value)
  }

  useEffect(() => {
    async function fetchData() {
      const responsePopular = await fetch(`https://api.themoviedb.org/3/movie/${movies}?api_key=${apiKey}`);
      
        const resPopular = await responsePopular.json();
        return setData(resPopular.results);
      
      }

    setTimeout(() => {
      setIsLoading(false);
    }, 500)
    fetchData();
    
  }, [movies]);

  return (
    <>
      <main style={{ backgroundColor: 'black' }}>
        {isLoading ? <SkeletonTheme color="#202020" highlightColor="#444">
          <Skeleton height={600} duration={0.5} />
        </SkeletonTheme> : <Header data={data} />}

        <Container>
          <form>
              <div className={styles.btnContainer}>
                <button onClick={movieChangeHandler} value='popular' className={movies === 'popular' ? styles.active : styles.btn}>Popular</button>
                <button onClick={movieChangeHandler} value='top_rated' className={movies === 'top_rated'? styles.active : styles.btn}>Top Rated</button>
                <button onClick={movieChangeHandler} value='upcoming' className={movies === 'upcoming' ? styles.active : styles.btn}>Upcoming</button>
              </div>
          </form>
          <MoviesSection data={data} />
        </Container>
      </main>
    </>
  )
}

export default Home;
