import { fetchMovieDetailsById } from "../../services/api";
import { useState, useEffect, Suspense, useRef } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import s from "./MovieDetailsPage.module.css";

const MovieDetailsPage = ({ setLoading, setError, loading, error }) => {
  const [movieData, setmovieData] = useState([]);
  const [genres, setGenres] = useState([]);
  const { movieId } = useParams();
  const location = useLocation();
  const goBackRef = useRef(location?.state ?? "/movies");

  useEffect(() => {
    const getMovieDetailsData = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchMovieDetailsById(movieId);
        setmovieData(data);
        setGenres(data.genres);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getMovieDetailsData({ setLoading, setError, loading, error });
  }, [setLoading, setError, movieId]);

  return (
    <div>
      {loading && <Loader />}
      <Link to={goBackRef.current} className={s.goBackBtn}>
        Go back
      </Link>
      {error ? (
        <p className={s.err}>{error}</p>
      ) : (
        <div>
          <div className={s.container}>
            <img
              src={`https://image.tmdb.org/t/p/w300/${movieData.poster_path}`}
              alt={movieData.title}
            />
            <div>
              <h2 className={s.title}>
                {movieData.original_title}&nbsp;(
                {String(movieData.release_date).split("-", 1)})
              </h2>
              <p className={s.tagline}>{movieData.tagline}</p>
              <div className={s.description}>
                <p className={s.overview}>Overview</p>
                <p className={s.descriptionText}>{movieData.overview}</p>
                <p className={s.genres}>Genres</p>
                <ul>
                  {genres.map((genre) => {
                    return <li key={genre.id}>{genre.name}</li>;
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div className={s.additionalInfo}>
            <p className={s.additionalInfoTitle}>Additional information</p>
            <ul>
              <li>
                <NavLink to="cast">Cast</NavLink>
              </li>
              <li>
                <NavLink to="reviews">Reviews</NavLink>
              </li>
            </ul>
            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetailsPage;
