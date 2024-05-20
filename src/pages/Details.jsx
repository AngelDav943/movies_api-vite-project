import axios from "axios"
import { useEffect, useState } from "react";

import { Typography, Button, TextField, Box, Stack, Skeleton, CardActionArea, CardMedia, CircularProgress } from '@mui/material'
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { Link } from "react-router-dom";

import './details.css'
import { useInfo } from "../context/useInfo";

export default function () {
    const params = useParams();

    const navigate = useNavigate();
    const location = useLocation();

    const { fetchWeb } = useInfo();

    const [loaded, setLoaded] = useState(false);
    const [movie, setMovie] = useState(null);

    async function fetchMovie() {
        setLoaded(false)
        const movieID = params["id"];
        if (movieID == undefined) return;

        const response = await fetchWeb(`/movie/${movieID}?`)
        if (response) setMovie(response)

        setLoaded(true)
    }

    useEffect(() => {
        fetchMovie()
    }, [])

    function goBack() {
        if (location.state && location.state["last"]) {
            navigate(location.state["last"])
            return;
        }

        navigate('/')
    }

    function clickWatch() {
        setLoaded(false)
        window.location.href = movie.homepage
    }

    return movie && loaded ? (
        <Stack className="moviedetails" sx={{ backgroundImage: `linear-gradient(transparent, #303030), url('https://image.tmdb.org/t/p/w500${movie.backdrop_path}')` }}>
            <Stack className="backdrop" justifyContent="space-between">
                <div className="links">
                    <a onClick={() => goBack()} className="back">&lt; Go back</a>
                    <Link to='/' >Home</Link>
                </div>
                <Stack className="info" direction='row' justifyContent="center" alignItems="center" flexWrap="wrap" sx={{ width: '100%' }} flexGrow={1}>
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt="Poster"
                        className="poster"
                        title={movie.title}
                    />
                    <Stack className="information" alignItems='flex-start' justifyContent='center'>
                        <Typography variant="h1" sx={{ fontWeight: 600 }}>{movie.title}</Typography>
                        <br />
                        <Stack className="genres" alignItems='flex-start' direction='row'>
                            {movie.genres.map((genre, index) => {
                                return <Typography key={index} className="span genre">{genre.name}</Typography>
                            })}
                        </Stack>
                        <br />
                        <Typography>{movie.overview}</Typography>
                        <br />
                        <Button variant="contained" size="large" onClick={() => clickWatch()}>Watch</Button>
                    </Stack>
                </Stack>
            </Stack>
            {/* <Stack className="languages" alignItems='stretch' direction='row'>
                {movie.spoken_languages.map((language, index) => {
                    return <Typography className="span">{language.name}</Typography>
                })}
            </Stack> */}
            {/* <Stack direction='row' overflow='clip'> */}

            {/* <Typography>{movie.title}</Typography> */}
            {/* {JSON.stringify(movie)} */}
            {/* </Stack> */}
        </Stack>
    ) : <Stack height="80vh" alignItems="center" justifyContent="center" width="100%">
        <CircularProgress sx={{ zoom: 3 }} />
    </Stack>
}
