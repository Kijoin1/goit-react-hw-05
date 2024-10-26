import { fetchMovieReviews } from "../../services/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import s from "./MovieReviews.module.css";

const MovieReviews = ({ setLoading, loading }) => {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const getMovieReviews = async () => {
      try {
        setLoading(true);
        const data = await fetchMovieReviews(movieId);
        setReviews(data);
      } catch (err) {
        return;
      } finally {
        setLoading(false);
      }
    };

    getMovieReviews();
  }, [setLoading, movieId]);

  return (
    <div>
      {loading && <Loader />}
      {reviews.length === 0 ? (
        <p>We dont have any information about reviews</p>
      ) : (
        <ul className={s.list}>
          {reviews.map((review) => {
            return (
              <li key={review.id}>
                <h3 className={s.title}>{review.author}</h3>
                <p>{review.content}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;
