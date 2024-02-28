import axios from "axios"
import { useEffect, useState } from "react";

import { Typography, Button, TextField, Box, Stack, Skeleton, CardActionArea, CardMedia, Grid } from '@mui/material'
import MoviePoster from "../components/MoviePoster";

// https://image.tmdb.org/t/p/w500/
const API_KEY = import.meta.env["VITE_API_KEY"];

export default function () {

    const [movies, setMovies] = useState(null);
    const [viewingPage, setPage] = useState(2);

    async function fetchMovies() {
        try {
            const fetchPage = Math.min(500, Math.max(1, viewingPage))
            const response = (await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=false&page=${fetchPage}`))

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
            <Grid container>
                {movies != null ? movies.map(movie => (
                    <Grid item xs={2} sm={4} md={3} xl={2} key={movie.id}>
                        <MoviePoster movie={movie} />
                    </Grid>

                )) : <Skeleton />}
            </Grid>
        </>
    )
}
