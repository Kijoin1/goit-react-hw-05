import { fetchTopMovies } from "../../services/api";
import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import s from "./HomePage.module.css";

const HomePage = ({ setLoading, setError, loading, error }) => {
  const [topMovies, setTopMovies] = useState([]);

  useEffect(() => {
    const getTopMoviesData = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchTopMovies();
        setTopMovies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getTopMoviesData();
  }, [setLoading, setError]);

  return (
    <div>
      <h1 className={s.title}>Trending today</h1>
      {loading && <Loader />}
      {error ? (
        <p className={s.err}>{error}</p>
      ) : (
        <MovieList movies={topMovies} />
      )}
    </div>
  );
};

export default HomePage;
