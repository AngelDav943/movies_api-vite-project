import axios from "axios"
import { useEffect, useState } from "react";

import { Typography, Button, TextField, Box, Stack, Skeleton, CardActionArea, CardMedia } from '@mui/material'
import { useParams } from "react-router-dom";
import MoviePoster from "../components/MoviePoster";

// https://image.tmdb.org/t/p/w500/
const API_KEY = import.meta.env["VITE_API_KEY"];

export default function() {
    const params = useParams();

    const [movies, setMovies] = useState(null);
    const [viewingPage, setPage] = useState(1);

    async function fetchMovies() {
        const query = params["query"];
        if (query == undefined) return;

        try {
            const fetchPage = Math.min(500, Math.max(1, viewingPage))
            const response = (await axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}&include_adult=false&page=${fetchPage}`))
            console.log(response.data)
            if (response.data && response.data["results"] != null) setMovies(response.data["results"])

        } catch (err) {
            console.log("error!",err)
        }
    }

    useEffect(() => {
        fetchMovies()
    }, [])

    //https://image.tmdb.org/t/p/w500/

    return (
        <>
            <Stack direction='row' overflow='clip'>
                {movies != null ? movies.map(movie => (
                    <MoviePoster movie={movie} key={movie.id}/>
                )) : <Skeleton />}
            </Stack>
        </>
    )
}
