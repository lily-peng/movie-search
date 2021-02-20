import { useState, useRef } from 'react';
import './Searchbar.css';
import MovieCard from './MovieCard.js';

function Searchbar() {
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState('');
    const [disableBtn, setDisableBtn] = useState(false);
    const pageRef = useRef(1);


    const fetchApi = async (resetResults) => {
        try {
            const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=6a24dda16f1d46ce91cc721ba3489e1d&language=en-US&query=${query}&page=${pageRef.current}&include_adult=false`;
            console.log(`api url: https://api.themoviedb.org/3/search/movie?api_key=6a24dda16f1d46ce91cc721ba3489e1d&language=en-US&query=${query}&page=${pageRef.current}&include_adult=false`);
            const response = await fetch(apiUrl);
            const data = await response.json();
            resetResults ? setMovies(data.results) : setMovies(movies.concat(data.results));
            checkLoadMore(data.total_pages);
        } catch (error) {
            console.error(error + " No More Movies to Display");
        }
    }

    const querySearch = e => {
        e.preventDefault();
        pageRef.current = 1;
        fetchApi(true);
    }

    const loadMovies = e => {
        e.preventDefault();
        pageRef.current = pageRef.current + 1;
        fetchApi(false);
    }

    const checkLoadMore = total => {
        if (pageRef.current === total) {
            setDisableBtn(true);
        } else {
            setDisableBtn(false);
        }
    }

    return (
        <>
            <form className="search-form" onSubmit={querySearch}>
                <label className="movie-label" htmlFor="search">Movie:</label>
                <input 
                    class="searchbar"
                    name="search"
                    type="text" 
                    placeholder="e.g. Parasite" 
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                />
                <button className="btn-search">Search</button>
            </form>
            <div>
                <h2>{movies.length} Results</h2>
                {
                    movies.map(movie =>
                        <MovieCard movie={movie} key={movie.id} />
                    )
                }
            </div>
            
            <div>
                <button disabled={disableBtn} className="btn-load-more" onClick={loadMovies} type="button">Load More</button>
            </div>
            
        </>
    )
}

export default Searchbar

/* TODO: 
    - error handling
    - hide "load more" initially
    - scroll to top button
    - css styling
    - auto search?
    - sort by popularity
    - sort by release date
    - filter by genre
    - switch to TV shows
*/