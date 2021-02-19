import { useState, useEffect, useRef } from 'react';
import './Searchbar.css';
import MovieCard from './MovieCard.js';

function Searchbar() {
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState('');
    const [disableBtn, setDisableBtn] = useState(false);
    const pageRef = useRef(1);

    const querySearch = async (e) => {
        e.preventDefault();
        pageRef.current = 1;

        try {
            const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=6a24dda16f1d46ce91cc721ba3489e1d&language=en-US&query=${query}&page=${pageRef.current}&include_adult=false`;
            console.log(`api url: https://api.themoviedb.org/3/search/movie?api_key=6a24dda16f1d46ce91cc721ba3489e1d&language=en-US&query=${query}&page=${pageRef.current}&include_adult=false`);
            const response = await fetch(apiUrl);
            const data = await response.json();
            setMovies(data.results);
            checkLoadMore(data.total_pages);
        } catch (error) {
            console.error(error + " No More Movies to Display");
        }
    }

    const loadMovies = async (e) => {
        e.preventDefault();
        try {
            pageRef.current = pageRef.current + 1;
            const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=6a24dda16f1d46ce91cc721ba3489e1d&language=en-US&query=${query}&page=${pageRef.current}&include_adult=false`;
            console.log(`api url: https://api.themoviedb.org/3/search/movie?api_key=6a24dda16f1d46ce91cc721ba3489e1d&language=en-US&query=${query}&page=${pageRef.current}&include_adult=false`);
            const response = await fetch(apiUrl);
            const data = await response.json();
            setMovies(movies.concat(data.results));
            checkLoadMore(data.total_pages);
        } catch (error) {
            console.error(error + " No More Movies to Display");
        }
    }

    const checkLoadMore = (total) => {
        if (pageRef.current === total) {
            // document.querySelector(".btn-load-more").disabled = true;
            setDisableBtn(true);
        } else {
            // document.querySelector(".btn-load-more").disabled = false;
            setDisableBtn(false);
        }
    }

    return (
        <>
            <form onSubmit={querySearch}>
                <label htmlFor="search">Movie:</label>
                <input 
                    name="search"
                    type="text" 
                    placeholder="e.g. Parasite" 
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                />
                <button>Search</button>
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
    - error when typing in new query that has some same movies (unique key)?
    - scroll to top button
    - css styling
    - auto search?
    - sort by popularity
    - sort by release date
    - filter by genre
    - switch to TV shows
*/