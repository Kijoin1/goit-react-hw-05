import { Link } from "react-router-dom";
import s from './NotFoundPage.module.css'

const NotFoundPage = () => {
  return (
    <div className={s.err}>
      <h2>Oops! Page not found...</h2>
      <Link className={s.link} to="/">Back to Home Page</Link>
    </div>
  );
};

export default NotFoundPage;
