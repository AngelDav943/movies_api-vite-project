import { CardActionArea, CardMedia, Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ({ movie, onHover, onHoverEnd, borderRadius = '1rem' }) {
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

    return <CardActionArea className="movieposter" onClick={(e) => onClick(e)} onMouseEnter={(e) => onMouseHover(e)} onMouseLeave={(e) => onMouseEnd(e)}>
        {movie.poster_path ? <CardMedia
            draggable={false}
            component="img"
            image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt="Poster"
            title={movie.title}
            sx={{ borderRadius: borderRadius }}
        /> : <Skeleton variant="rectangular" height='100%' sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <center style={{visibility:'visible', padding: '0 1rem'}}>{movie.title}</center>
        </Skeleton>}
    </CardActionArea>
}