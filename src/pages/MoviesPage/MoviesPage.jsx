import { fetchMovieByName } from "../../services/api";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import s from "./MoviesPage.module.css";

const MoviesPage = ({ setLoading, setError, loading, error }) => {
  const [nameMovie, setNameMovie] = useState("");
  const [moviesData, setMoviesData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query") ?? "";

  useEffect(() => {
    if (!query) return;
    const getNameMovieByQuery = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchMovieByName(query);
        setMoviesData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getNameMovieByQuery();
  }, [setLoading, setError, query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let correctValue = nameMovie.toLowerCase().trim();
    if (correctValue) {
      setSearchParams({ query: correctValue });
    }
    return;
  };

  return (
    <div>
      <form className={s.form} onSubmit={handleSubmit}>
        <input
          className={s.input}
          placeholder="Find a movie..."
          value={nameMovie}
          onChange={(e) => setNameMovie(e.target.value)}
        />
        <button className={s.button} type="submit">
          Search
        </button>
      </form>
      {loading && <Loader />}
      {error ? (
        <p className={s.err}>{error}</p>
      ) : (
          <MovieList movies={moviesData} />
      )}
    </div>
  );
};

export default MoviesPage;
