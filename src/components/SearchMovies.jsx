import React, { useState } from "react";
import axios from "axios";

const SearchMovies = () => {
  const [title, setTitle] = useState(""); // Corrected function name from SetTitle to setTitle
  const [movieData, setMovieData] = useState(null); // Corrected from setMovieDate to setMovieData
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      if (!title) {
        setError(`Please enter a movie title!`);
        return;
      }
      const response = await axios.get(
        `${process.env.REACT_APP_FREE_SEARCH}?t=${title}`
      );
      setMovieData(response.data.data); // Assuming the API returns a single movie object directly
      setError(null);
    } catch (error) {
      setError(`Internal Server Error!`);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Search all your favorite movies</h1>
      <p>Make a watch list and start removing them as you go down the list!</p>
      <form onSubmit={handleSearch}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Search Movies
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      {error && <p className="text-danger">{error}</p>}
      <div className="container">
        {movieData && (
          <div className="row">
            <div className="col-md-4">
              <img
                src={movieData.Poster}
                alt={movieData.Title}
                className="img-fluid"
              />
            </div>
            <div className="col-md-8">
              <h2>{movieData.Title}</h2>
              <p>
                <strong>Rated:</strong> {movieData.Rated}
              </p>
              <p>
                <strong>Year:</strong> {movieData.Year}
              </p>
              <p>
                <strong>Runtime:</strong> {movieData.Runtime}
              </p>
              <p>
                <strong>Genre:</strong> {movieData.Genre}
              </p>
              <p>
                <strong>IMDb Rating:</strong> {movieData.imdbRating}
              </p>
              <p>
                <strong>Plot:</strong> {movieData.Plot}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchMovies;
