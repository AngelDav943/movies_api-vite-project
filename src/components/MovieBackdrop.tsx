import React from 'react'
import { Skeleton } from '@mui/material';

import './movieBackdrop.css'
import { useNavigate } from 'react-router-dom';
import { useInfo } from '../context/useInfo';

export default function ({ movie }) {
    const navigate = useNavigate()
    const { movieGenres } = useInfo();

    function onClick() {
        navigate(`/movie/${movie.id}`, { state: { last: location.pathname } })
    }

    return <div className="moviebackdrop">
        {(movie.backdrop_path || movie.poster_path ) ? <img
            draggable={false}
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path }`}
            alt="Backdrop"
            className="backdrop"
        /> : <Skeleton variant="rectangular" className="backdrop" />}
        <div className="info" onClick={() => onClick()}>
            <p>{movie.title}</p>
            <div className="genres">
                {movieGenres && movie.genre_ids.map((genreID, index) => {
                    if (movieGenres.length != 0) {
                        let genre = '';
                        movieGenres.forEach(({ id, name }) => {
                            if (genreID == id) genre = name;
                        });
                        if (genre != '' && index < 3) return <span key={index} className="genre">{genre}</span>;
                    }
                    // return <Typography key={index} className="span genre">{genre.name}</Typography>
                })}
            </div>
        </div>
    </div>;
}
