import React, { useState, useEffect } from "react";
import axios from "axios";

const WatchList = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      try {
        const response = await axios.get(process.env.REACT_APP_MY_WATCH_LIST, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { userId },
        });
        setMovies(response.data.movies);
        // console.log(response.data.movies);
      } catch (err) {
        setError(err.message || "Error fetching movies");
      }
    };

    fetchMovies();
  }, []);

  const handleWatched = async (movieId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        `${process.env.REACT_APP_DELETE_MY_MOVIE}/${movieId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Remove the movie from the state
      const updatedMovies = movies.filter((movie) => movie._id !== movieId);
      setMovies(updatedMovies);
    } catch (err) {
      setError(err.message || "Error removing movie");
    }
  };

  return (
    <div className="container mt-4">
      <h1>My WatchList</h1>
      {error && <p className="text-danger">{error}</p>}
      <div className="row">
        {movies.map((movie) => (
          <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={movie._id}>
            <div className="card h-100 movie-card">
              <img
                src={movie.Poster}
                className="card-img-top rounded"
                alt={movie.Title}
              />
              <div className="card-body">
                <h5 className="card-title">{movie.Title}</h5>
                <p className="card-text">
                  <strong>Year:</strong> {movie.Year}
                  <br />
                  <strong>Rating:</strong> {movie.Rated}
                  <br />
                  <strong>IMDb:</strong> {movie.imdbRating}
                  <br />
                  <strong>Language:</strong> {movie.Language}
                  <br />
                  <strong>Country:</strong> {movie.Country}
                  <br />
                  <strong>Genre:</strong> {movie.Genre}
                  <br />
                  <strong>Director:</strong> {movie.Director}
                  <br />
                  <strong>Actors:</strong> {movie.Actors}
                  <br />
                  <strong>Writer:</strong> {movie.Writer}
                </p>
                <button
                  onClick={() => handleWatched(movie._id)}
                  className="btn btn-primary w-100"
                >
                  Watched!
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchList;
