import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminWatchList = () => {
  const [movieList, setMovieList] = useState([]);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setMessage({
            type: "Warning",
            content: "Token expired! Please login again.",
          });
          return;
        }
        const response = await axios.get(process.env.REACT_APP_ALL_MOVIES, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMovieList(response.data.movies);
        setMessage({
          type: "Success",
          content: "Movies fetched successfully!",
        });
        console.log(response.data.movies);
      } catch (error) {
        setError(error.response?.data.message || "Failed to fetch data!");
      }
    };
    fetchMovies();
  }, []);

  if (error) {
    return <div className="alert alert-danger">Error: {error}</div>;
  }

  return (
    <div className="container mt-4">
      {message && (
        <div
          className={`alert alert-${
            message.type === "Success" ? "success" : "warning"
          }`}
        >
          {message.content}
        </div>
      )}
      <div className="row">
        {movieList.map((movie) => (
          <div className="col-md-4 mb-3" key={movie.id}>
            <div className="card">
              <img src={movie.Poster} alt={movie.Title} />
              <div className="card-body">
                <h5 className="card-title">{movie.Title}</h5>
                <p className="card-text">
                  <strong>Year:</strong> {movie.Year}
                  <br />
                  <strong>Rating:</strong> {movie.Rated}
                  <br />
                  <strong>User</strong>
                  {movie.userId}
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminWatchList;
