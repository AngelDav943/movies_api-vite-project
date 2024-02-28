import { CardActionArea, CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ({ movie }) {
    const navigate = useNavigate();

    function onClick() {
        navigate(`/movie/${movie.id}`)
    }

    return <CardActionArea className="movieposter" onClick={() => onClick()}>
        <CardMedia
            component="img"
            image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt="Poster"
            title={movie.title}
        />

        {/* <Box key={movie.id}>
            <Typography>{movie.title}</Typography>
        </Box> */}
    </CardActionArea>
}