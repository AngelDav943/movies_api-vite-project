import React, { useEffect, useRef, useState } from 'react'
import Carousel from '../components/Carousel'

import MoviePoster from "../components/MoviePoster";

import { SearchDiv, SearchIconWrapper, StyledInputBase } from '../components/SearchInput';
import { useInfo } from '../context/useInfo';


import { Skeleton, TextField, InputAdornment } from '@mui/material'
import { Search, Send } from '@mui/icons-material';

import ItemScroller from '../components/ItemScroller';

import { useNavigate } from 'react-router-dom';

import './home.css'
import MovieCard from '../components/MovieCard';

export default function () {
    const navigate = useNavigate();

    const SkeletonArray = Array.from(Array(16).keys()).map(index => (
        <Skeleton variant='rectangular' height='100%' width="100%" />
    ))

    const { fetchWeb } = useInfo();

    const [inTheaters, setInTheaters] = useState([]);
    const [topRated, setTopRated] = useState([]);

    const searchRef = useRef();

    const [items, setItems] = useState([])

    async function fetchMovies() {

        setItems(Array.from(Array(16).keys()).map(index => (
            <Skeleton variant='rectangular' key={index} height='150%' />
        )))

        const discover = await fetchWeb('/discover/movie?include_adult=false&page=1')
        const in_theaters = await fetchWeb('/movie/now_playing?include_adult=false')
        const top_rated = await fetchWeb('/movie/top_rated?include_adult=false')

        if (top_rated && top_rated["results"] != null) {
            const data = top_rated["results"]
            setTopRated(top_rated["results"])
            setItems(data.map((movie, index) => {
                return <MoviePoster key={index} movie={movie} onHover={() => {
                    if (searchRef.current.querySelector('input')) {
                        setSearchValue(movie.title)
                        searchRef.current.querySelector('input').value = movie.title
                    }
                }} />
            }))
        }


        if (in_theaters && in_theaters["results"] != null) {
            setInTheaters(in_theaters["results"])
        }

    }

    useEffect(() => {
        fetchMovies()
    }, [])

    const [searchValue, setSearchValue] = useState("");
    function onKeyPress(event) {
        setSearchValue(event.target.value)
        if (event.keyCode == 13) startSearch()
    }

    function startSearch() {
        if (searchValue.replace(/ /g, "") != "") navigate(`/search/${searchValue}`, { replace: true })
    }

    return <main className='homepage'>
        <Carousel items={items} />
        <section className='small'>
            <SearchDiv >
                <SearchIconWrapper>
                    <Search />
                </SearchIconWrapper>
                {searchValue != "" && <SearchIconWrapper float='right' pointer={true} onClick={e => startSearch()}>
                    <Send />
                </SearchIconWrapper>}
                <StyledInputBase
                    onKeyDown={e => onKeyPress(e)}
                    ref={searchRef}
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                />
            </SearchDiv>
        </section>

        <section>
            <h1>Top rated</h1>
            <ItemScroller items={topRated.length != 0 ? topRated.map((movie, index) => (
                <MovieCard movie={movie} key={index} />
            )) : SkeletonArray} />
        </section>

        <section>
            <h1>Currently in theaters</h1>
            <ItemScroller items={inTheaters.length != 0 ? inTheaters.map((movie, index) => (
                <MovieCard movie={movie} key={index} />
            )) : SkeletonArray} />
        </section>
    </main>
}
