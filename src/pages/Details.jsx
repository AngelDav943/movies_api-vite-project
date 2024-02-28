import axios from "axios"
import { useEffect, useState } from "react";

import { Typography, Button, TextField, Box, Stack, Skeleton, CardActionArea, CardMedia } from '@mui/material'
import { useParams } from "react-router-dom";
import MoviePoster from "../components/MoviePoster";

import './details.css'

// https://image.tmdb.org/t/p/w500/
const API_KEY = import.meta.env["VITE_API_KEY"];

export default function () {
    const params = useParams();

    const [movie, setMovie] = useState(null);

    async function fetchMovie() {
        const movieID = params["id"];
        if (movieID == undefined) return;

        try {
            const response = (await axios.get(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}`))
            if (response.data) setMovie(response.data)
        } catch (err) {
        }
    }

    useEffect(() => {
        fetchMovie()
    }, [])

    //https://image.tmdb.org/t/p/w500/

    return movie ? (
        <Stack className="moviedetails">
            <Stack direction='row' className="backdrop" justifyContent="space-between" sx={{ background: `linear-gradient(transparent, #303030), url('https://image.tmdb.org/t/p/w500${movie.backdrop_path}')` }}>
                <Stack alignItems='flex-start' justifyContent='center'>
                    <Typography variant="h1">{movie.title}</Typography>
                    <br />
                    <Stack className="genres" alignItems='flex-start' direction='row'>
                        {movie.genres.map((genre, index) => {
                            return <Typography className="span genre">{genre.name}</Typography>
                        })}
                    </Stack>
                    <br />
                    <Typography>{movie.overview}</Typography>
                    <Button variant="contained" size="large">Watch</Button>
                </Stack>
                {/* <Stack className="companies" alignItems='flex-start' direction='row'>
                    {movie.production_companies.map((company, index) => {
                        return company.logo_path ? <img
                        component="img"
                        src={`https://image.tmdb.org/t/p/w500${company.logo_path}`}
                        alt="Poster"
                        title={company.name}
                        /> : <Typography>{company.name}</Typography>
                    })}
                </Stack> */}
            </Stack>
            <Stack className="genres" alignItems='stretch' direction='row'>
                {movie.spoken_languages.map((language, index) => {
                    return <Typography className="span">{language.name}</Typography>
                })}
            </Stack>
            <Stack direction='row' overflow='clip'>

                {/* <Typography>{movie.title}</Typography> */}
                {JSON.stringify(movie)}
            </Stack>
        </Stack>
    ) : <p>loading........</p>
}
