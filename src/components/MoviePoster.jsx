import { CardActionArea, CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ({ movie, onHover, onHoverEnd }) {
    const navigate = useNavigate();

    function onClick() {
        navigate(`/movie/${movie.id}`)
    }

    function onMouseHover(e) {
        if (onHover) onHover(e)
    }

    function onMouseEnd(e) {
        if (onHoverEnd) onHoverEnd(e)
    }

    return <CardActionArea className="movieposter" onClick={(e) => onClick(e)} onMouseEnter={(e) => onMouseHover(e)} onMouseLeave={(e) => onMouseEnd(e)}>
        <CardMedia
            component="img"
            image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt="Poster"
            title={movie.title}
        />
    </CardActionArea>
}