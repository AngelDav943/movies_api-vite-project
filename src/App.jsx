import axios from "axios"
import { useEffect, useState } from "react";

import { Typography, Button, TextField, Box, Stack, Skeleton, CardActionArea, CardMedia } from '@mui/material'

// https://image.tmdb.org/t/p/w500/
const API_KEY = import.meta.env["VITE_API_KEY"];

function App() {

  const [movies, setMovies] = useState(null);
  const [viewingPage, setPage] = useState(2);

  async function fetchMovies() {
    try {
      const fetchPage = Math.min(500, Math.max(1, viewingPage))
      const response = (await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${fetchPage}`))

      console.log(response.data)
      if (response.data && response.data["results"] != null) setMovies(response.data["results"])

    } catch (err) {

    }
  }

  useEffect(() => {
    fetchMovies()
  }, [])

  //https://image.tmdb.org/t/p/w500/

  return (
    <>
      {movies != null ? movies.map(movie => (
        // <CardActionArea key={movie.id}>
        //   <CardMedia
        //     component="img"
        //     image={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
        //   alt="CardMedia Image Example"
        //   width="140"
        //   title="CardMedia Image Example"
        //     />
        // </CardActionArea>
        <Box key={movie.id}>
          <Typography>{movie.title}</Typography>
        </Box>
      )) : <Skeleton />}
    </>
  )
}

export default App
