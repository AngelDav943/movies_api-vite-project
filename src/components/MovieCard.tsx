import React from 'react'
import { useNavigate } from 'react-router-dom';

import './movieCard.css'
import { Skeleton } from '@mui/material';
import { useInfo } from '../context/useInfo';

interface props {
    movie: any;
    onHover: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    onHoverEnd: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export default function ({ movie, onHover, onHoverEnd }: props) {
    const { movieGenres } = useInfo();

    const navigate = useNavigate();

    function onClick() {
        navigate(`/movie/${movie.id}`, { state: { last: location.pathname } })
    }

    function onMouseHover(e) {
        if (onHover) onHover(e)
    }

    function onMouseEnd(e) {
        if (onHoverEnd) onHoverEnd(e)
    }

    const cardStyle = { '--backdrop': `url('https://image.tmdb.org/t/p/w500${movie.backdrop_path}')` } as React.CSSProperties;
    return <div className="movieCard" style={cardStyle} onClick={() => onClick()} onMouseEnter={e => onMouseHover(e)} onMouseLeave={e => onMouseEnd(e)}>
        {movie.poster_path ? <img
            draggable={false}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt="Poster"
            title={movie.title}
        /> : <Skeleton variant="rectangular" height='100%' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <center style={{ visibility: 'visible', padding: '0 1rem' }}>{movie.title}</center>
        </Skeleton>}
        <div className="info">
            {movieGenres && movie.genre_ids.map((genreID, index) => {
                if (movieGenres.length != 0) {
                    let genre = '';
                    movieGenres.forEach(({ id, name }) => {
                        if (genreID == id) genre = name;
                    });
                    if (genre != '' && index < 3) return <span key={index} className="genre">{genre}</span>;
                }
            })}
        </div>
    </div>
}
