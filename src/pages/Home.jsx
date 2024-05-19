import React, { useEffect, useState } from 'react'
import Carousel from '../components/Carousel'

import './home.css'


import MoviePoster from "../components/MoviePoster";
import axios from 'axios';
import SearchInput from '../components/SearchInput';

// https://image.tmdb.org/t/p/w500/
const API_KEY = import.meta.env["VITE_API_KEY"];

export default function () {

    const [movies, setMovies] = useState([]);
    const [viewingPage, setPage] = useState(0);
    const [items, setItems] = useState([])

    const [searchValue, setSearchValue] = useState("")

    async function fetchMovies() {
        try {
            const fetchPage = Math.min(500, Math.max(1, viewingPage))
            const discoverResponse = (await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=false&page=3`))
            const currentlyResponse = (await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&include_adult=false&page=1`))

            if (discoverResponse.data && discoverResponse.data["results"] != null) {
                const data = discoverResponse.data["results"]
                setItems(data.map(movie => {
                    return <MoviePoster movie={movie} onHover={() => setSearchValue(movie.title)}/>
                }))
            }

            if (currentlyResponse.data && currentlyResponse.data["results"] != null) {
                const data = discoverResponse.data["results"]
                console.log(data)
                setMovies(data)
            }

        } catch (err) {

        }
    }

    useEffect(() => {
        fetchMovies()
    }, [])

    return <main className='homepage'>
        <Carousel items={items} />
        <section className='small'>
            <SearchInput value={searchValue} onInput={({target}) => setSearchValue(target.value)}/>
        </section>
        <section>
            <h1>Currently in theaters</h1>
            <div className="row">
                {movies && movies.map((movie, index) => (
                    <div className="container" key={index}>
                        <MoviePoster movie={movie} />
                    </div>
                ))}
            </div>
        </section>
        {/* {movies != null ? <MoviePoster movie={movies[0]} /> : ''} */}
    </main>
}
