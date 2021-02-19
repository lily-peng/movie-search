import defaultPoster from './default-poster.png';

function MovieCard(props) {
    // console.log(`props: ${props}`);
    const {movie} = props;
    // console.log(`movie: ${movie}`);
    let imgUrl;
    let imgAlt;
    // const imgUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}` : defaultPoster;
    if (movie.poster_path) {
        imgUrl = `https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`;
        imgAlt = `${movie.title} movie poster`;
    } else {
        imgUrl = defaultPoster;
        imgAlt = `Default movie poster`;
    }

    return (
        <div>
            <h2>{movie.title} ({movie.id})</h2>
            <img src={imgUrl} alt={imgAlt} />
            <h3>{movie.overview}</h3>
        </div>
    )
}

export default MovieCard