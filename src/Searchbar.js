import { useState, useEffect, useRef } from 'react';
import './Searchbar.css';
import MovieCard from './MovieCard.js';

function Searchbar() {
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState('');
    const [showMore, setShowMore] = useState(false);
    const [totalResults, setTotalResults] = useState(-1);
    const pageRef = useRef(1);
    const [showScroll, setShowScroll] = useState(false);


    const fetchApi = async (resetResults) => {
        try {
            const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=6a24dda16f1d46ce91cc721ba3489e1d&language=en-US&query=${query}&page=${pageRef.current}&include_adult=false`;
            console.log(`api url: https://api.themoviedb.org/3/search/movie?api_key=6a24dda16f1d46ce91cc721ba3489e1d&language=en-US&query=${query}&page=${pageRef.current}&include_adult=false`);
            const response = await fetch(apiUrl);
            const data = await response.json();
            resetResults ? setMovies(data.results) : setMovies(movies.concat(data.results));
            pageRef.current === data.total_pages ? setShowMore(false) : setShowMore(true);
            setTotalResults(data.total_results);
        } catch (error) {
            console.error(`Sorry, the TMDb database fetch request has failed: ${error}`);
        }
    }

    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > 400){
            setShowScroll(true)
        } else if (showScroll && window.pageYOffset <= 400){
            setShowScroll(false)
        }
    };

    window.addEventListener('scroll', checkScrollTop);

    useEffect(() => {
        if (query.length > 2) {
            if (!query) return;
            pageRef.current = 1;
            fetchApi(true);
        } else {
            setMovies([]);
            setTotalResults(-1);
            setShowMore(false);
        }
    }, [query]);

    const loadMore = e => {
        e.preventDefault();
        pageRef.current = pageRef.current + 1;
        fetchApi(false);
    }

    const scrollTop = () =>{
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    return (
        <>
            <form className="search-form" onSubmit={e => e.preventDefault()}>
                <label className="movie-label" htmlFor="search">Movie Title:</label>
                <input 
                    className="searchbar"
                    name="search"
                    type="text" 
                    placeholder="e.g. Jurassic Park, etc..." 
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                />
                
            </form>
            <div>
                {totalResults < 0 ? null 
                    : totalResults === 1 ? <h2 className="results-num">{totalResults} movie found</h2>
                    : <h2 className="results-num">{totalResults} movies found</h2>}
                <div className="cards-container">
                    <div className="movie-cards">
                        {movies.map(movie =>
                                <MovieCard movie={movie} key={movie.id} />
                            )}
                    </div>
                    {showMore ? <button className="btn-show-more" onClick={loadMore} type="button">Show More</button> : null}
                </div>
            </div>
            <button 
                className={showScroll ? "btn-scroll" : "btn-scroll fade-out"} 
                onClick={scrollTop} 
                type="button">
                    <p className="arrow">↑</p>
                    <p>Back to Top</p>
            </button>
        </>
    )
}

export default Searchbar

/* TODO: 
    - scroll bar to read description?
    - sort by popularity
    - sort by release date
    - filter by genre
    - switch for TV shows
    - better css styling
    - better error handling
*/