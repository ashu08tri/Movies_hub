import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Pages/Root";
import Home from "./Pages/Home";
import Error from "./Pages/Error";
import MovieDetails, {loader as movieDetails} from "./Pages/MovieDetails";
import Search, {loader as searchedData} from "./Pages/Search";

const API_KEY = process.env.REACT_APP_API_KEY;


function App() {
  const router = createBrowserRouter([
    {path: '/' , element: <Root />,errorElement: <Error/>, children: [
      {index: true, element: <Home apiKey={API_KEY}/>},
      {path: 'movie/:id' , element: <MovieDetails /> , loader: movieDetails},
      {path: 'movie/?', element: <Search />, loader: searchedData}
    ]}
  ])

  return (
   <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
