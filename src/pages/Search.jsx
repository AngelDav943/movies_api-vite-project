import { useEffect, useState } from "react";

import { Typography, Button, TextField, Box, Stack, CircularProgress } from '@mui/material'
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useInfo } from "../context/useInfo";

import MovieBackdrop from "../components/MovieBackdrop";
import { SearchDiv, SearchIconWrapper, StyledInputBase } from '../components/SearchInput';
import { Search, Send } from '@mui/icons-material';

import './search.css'

export default function () {
    const params = useParams();
    const { fetchWeb } = useInfo();

    const [loaded, setLoaded] = useState(false);
    const [movies, setMovies] = useState(null);
    const [viewingPage, setPage] = useState(1);

    async function fetchMovies() {
        let query = params["query"];
        if (searchValue.replace(/ /g, "") != "") query = searchValue
        // console.log(params)
        if (query == undefined) return;

        const fetchPage = Math.min(500, Math.max(1, viewingPage))
        const response = await fetchWeb(`/search/movie?query=${query}&page${fetchPage}&include_adult=false`)

        if (response && response["results"] != null) setMovies(response["results"])
        setLoaded(true)
    }

    const navigate = useNavigate();
    const location = useLocation();

    const [searchValue, setSearchValue] = useState("");
    function onKeyPress(event) {
        setSearchValue(event.target.value)
        if (event.keyCode == 13) startSearch()
    }

    function startSearch() {
        if (searchValue.replace(/ /g, "") != "") navigate(`/search/${searchValue}`, { replace: true })
    }

    function goBack() {
        if (location.state && location.state["last"]) {
            navigate(location.state["last"])
            return;
        }

        navigate('/')
    }

    useEffect(() => {
        fetchMovies()
    }, [searchValue])

    return (
        <main className="searchPage">
            <div className="links">
                <a onClick={() => goBack()} className="back">&lt; Go back</a>
                <Link to='/' >Home</Link>
                <SearchDiv sx={{ flexGrow: 1 }}>
                    <SearchIconWrapper>
                        <Search />
                    </SearchIconWrapper>
                    {searchValue != "" && <SearchIconWrapper float='right' pointer={true} onClick={e => startSearch()}>
                        <Send />
                    </SearchIconWrapper>}
                    <StyledInputBase
                        onKeyUp={e => onKeyPress(e)}
                        // ref={searchRef}
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </SearchDiv>
            </div>
            <div className="movies">
                {movies != null && loaded ? movies.map(movie => (
                    <MovieBackdrop key={movie.id} movie={movie} />
                )) : <Stack height="80vh" alignItems="center" justifyContent="center" width="100%">
                    <CircularProgress sx={{ zoom: 3 }} />
                </Stack>}
            </div>
        </main>
    )
}

