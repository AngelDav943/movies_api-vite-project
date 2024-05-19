import axios from "axios"
import { useEffect, useState } from "react";

import { Typography, Button, TextField, Box, Stack, Skeleton, CardActionArea, CardMedia, Grid, LinearProgress, CircularProgress } from '@mui/material'
import MoviePoster from "../components/MoviePoster";
import Paginator from "../components/Paginator/Paginator";
import Carousel from "../components/Carousel";

// https://image.tmdb.org/t/p/w500/
const API_KEY = import.meta.env["VITE_API_KEY"];

export default function () {

    const [loaded, setLoaded] = useState(false);

    const [movies, setMovies] = useState(null);
    const [viewingPage, setPage] = useState(2);
    const [items, setItems] = useState([])

    async function fetchMovies() {
        setLoaded(false)
        try {
            const fetchPage = Math.min(500, Math.max(1, viewingPage))
            const response = (await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=false&page=${fetchPage}`))

            console.log(response.data)
            if (response.data && response.data["results"] != null) {
                const data = response.data["results"]
                setMovies(data)
                setItems(data.map(movie => {
                    return <MoviePoster movie={movie} />
                }))
            }

            setTimeout(() => {
                setLoaded(true)
            }, 600)
        } catch (err) {

        }
    }

    useEffect(() => {
        fetchMovies()
    }, [viewingPage])

    //https://image.tmdb.org/t/p/w500/

    return (
        <>
            <Carousel items={items}/>
            <Grid container>
                {movies != null && loaded ? movies.map(movie => (
                    <Grid item xs={2} sm={4} md={3} xl={2} key={movie.id}>
                        <MoviePoster movie={movie} />
                    </Grid>

                )) : <Stack height="80vh" alignItems="center" justifyContent="center" width="100%">
                    <CircularProgress sx={{ zoom: 3 }} />
                </Stack>}
            </Grid>
            <Paginator current={viewingPage} amount={500} onClick={index => setPage(index)} />
        </>
    )
}
