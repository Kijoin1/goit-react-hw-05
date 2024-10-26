import { fetchMovieCast } from "../../services/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import s from "./MovieCast.module.css";

const MovieCast = ({ setLoading, loading }) => {
  const [cast, setCast] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const getCastMembers = async () => {
      try {
        setLoading(true);
        const data = await fetchMovieCast(movieId);
        setCast(data.cast);
      } catch (err) {
        return;
      } finally {
        setLoading(false);
      }
    };

    getCastMembers();
  }, [setLoading, movieId]);
  return (
    <div>
      {loading && <Loader />}
      {cast.length === 0 ? (
        <p>We dont have any information about actors</p>
      ) : (
        <ul className={s.list}>
          {cast.map((actor) => {
            return (
              <li key={actor.id}>
                <div className={s.element}>
                  <img
                    src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
                    alt={actor.name}
                  />
                </div>
                <div className={s.text}>
                  <p>{actor.name}</p>
                  <p>Character: {actor.character}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default MovieCast;
