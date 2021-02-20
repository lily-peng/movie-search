import { useState, useRef } from 'react';
import './Searchbar.css';
import MovieCard from './MovieCard.js';

function Searchbar() {
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState('');
    const [showMore, setShowMore] = useState(true);
    const [totalResults, setTotalResults] = useState(-1);
    const pageRef = useRef(1);


    const fetchApi = async (resetResults) => {
        try {
            const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=6a24dda16f1d46ce91cc721ba3489e1d&language=en-US&query=${query}&page=${pageRef.current}&include_adult=false`;
            console.log(`api url: https://api.themoviedb.org/3/search/movie?api_key=6a24dda16f1d46ce91cc721ba3489e1d&language=en-US&query=${query}&page=${pageRef.current}&include_adult=false`);
            const response = await fetch(apiUrl);
            const data = await response.json();
            resetResults ? setMovies(data.results) : setMovies(movies.concat(data.results));
            pageRef.current === data.total_pages ? setShowMore(true) : setShowMore(false);
            setTotalResults(data.total_results);
        } catch (error) {
            console.error(error + " No More Movies to Display");
        }
    }

    const querySearch = e => {
        e.preventDefault();
        if (!query) return;
        pageRef.current = 1;
        fetchApi(true);
    }

    const loadMore = e => {
        e.preventDefault();
        pageRef.current = pageRef.current + 1;
        fetchApi(false);
    }

    return (
        <>
            <form className="search-form" onSubmit={querySearch}>
                <label className="movie-label" htmlFor="search">Movie:</label>
                <input 
                    className="searchbar"
                    name="search"
                    type="text" 
                    placeholder="e.g. Parasite" 
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                />
                <button className="btn-search">Search</button>
            </form>
            <div>
                {totalResults < 0 ? null 
                    : totalResults === 1 ? <h2>{totalResults} movie found</h2>
                    : <h2>{totalResults} movies found</h2>}
                <div className="cards-container">
                    <div className="movie-cards">
                        {movies.map(movie =>
                                <MovieCard movie={movie} key={movie.id} />
                            )}
                    </div>
                    {showMore ? null : <button className="btn-show-more" onClick={loadMore} type="button">Show More</button>}
                </div>
            </div>
            
            
            
        </>
    )
}

export default Searchbar

/* TODO: 

    - css grid for large screens
    - hide results initially
    - hide "load more" initially


    - scroll bar to read description?
    - scroll to top button
    - auto search?
    - sort by popularity
    - sort by release date
    - filter by genre
    - switch for TV shows
    - better css styling
    - better error handling
*/