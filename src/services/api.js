import axios from "axios";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjRjODU2ZjViYTA1ZjNjNDJiYzM5OTBjMWMzMGM4ZiIsIm5iZiI6MTcyOTc0MTgwMS45MjkyMjMsInN1YiI6IjY3MTljMjVkYTRhYzhhNDMyYzViZmI2NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.heFdPt8gsy0eJPO4EW3jwNDoHjcoKmklh8IBdJaib10",
  },
};

export const fetchTopMovies = async () => {
  const url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
  const { data } = await axios.get(url, options);
  return data.results;
};

export const fetchMovieDetailsById = async (movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
  const { data } = await axios.get(url, options);
  return data;
};

export const fetchMovieByName = async (query) => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US`;
  const { data } = await axios.get(url, options);
  return data.results;
};

export const fetchMovieCast = async (movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US&page=1`;
  const { data } = await axios.get(url, options);
  return data;
};

export const fetchMovieReviews = async (movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`;
  const { data } = await axios.get(url, options);
  return data.results;
};
