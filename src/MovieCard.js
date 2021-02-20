import defaultPoster from './default-poster.png';
import './MovieCard.css';

function MovieCard(props) {
    const {movie} = props;
    let imgUrl;
    let imgAlt;
    if (movie.poster_path) {
        imgUrl = `https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`;
        imgAlt = `${movie.title} movie poster`;
    } else {
        imgUrl = defaultPoster;
        imgAlt = `Default movie poster`;
    }

    return (
        <div className="card-wrapper">
            <div className="card">
                <h2>{movie.title}</h2>
                <img className="card--img" src={imgUrl} alt={imgAlt} />
            </div>
            <div className="card-details">
                <h2>{movie.title}</h2>
                <span className="card--info">Released on <strong>{movie.release_date}</strong></span>
                <h3 className="card--overview">{movie.overview}</h3>
            </div>
        </div>
    )
}

export default MovieCard