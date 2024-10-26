import React from "react";
import { Suspense, useState, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Loader from "./components/Loader/Loader";

const MovieCast = lazy(() => import("./components/MovieCast/MovieCast"));
const MovieReviews = lazy(() =>
  import("./components/MovieReviews/MovieReviews")
);
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() =>
  import("./pages/MovieDetailsPage/MovieDetailsPage")
);
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

const App = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div>
      <Navigation />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                loading={loading}
                setLoading={setLoading}
                error={error}
                setError={setError}
              />
            }
          />
          <Route
            path="/movies"
            element={
              <MoviesPage
                loading={loading}
                setLoading={setLoading}
                error={error}
                setError={setError}
              />
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <MovieDetailsPage
                loading={loading}
                setLoading={setLoading}
                error={error}
                setError={setError}
              />
            }
          >
            <Route
              path="/movies/:movieId/cast"
              element={
                <MovieCast
                  loading={loading}
                  setLoading={setLoading}
                  error={error}
                  setError={setError}
                />
              }
            />
            <Route
              path="/movies/:movieId/reviews"
              element={
                <MovieReviews
                  loading={loading}
                  setLoading={setLoading}
                  error={error}
                  setError={setError}
                />
              }
            />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
