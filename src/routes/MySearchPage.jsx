import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SearchMovies = () => {
  const [title, setTitle] = useState("");
  const [movieData, setMovieData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      if (!title) {
        setError(`Please enter a movie title!`);
        return;
      }
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Authentication token not found");
        return;
      }
      const response = await axios.get(
        `${process.env.REACT_APP_SEARCH}?t=${title}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setMovieData(response.data.data);
      setError(null);
    } catch (error) {
      console.error(error);
      setError("Internal Server Error");
    }
  };

  const handleAddToWatchlist = async () => {
    const userId = localStorage.getItem("userId"); // Retrieve userId from localStorage
    const token = localStorage.getItem("token");

    try {
      if (!token) {
        setError("Authentication token not found");
        return;
      }
      if (!userId) {
        setError("User ID not found");
        return;
      }

      const {
        Title,
        Poster,
        Rated,
        Year,
        Runtime,
        Genre,
        imdbRating,
        Plot,
        Type,
        Awards,
        BoxOffice,
        Country,
        Language,
        Actors,
        Writer,
        Director,
      } = movieData;

      const response = await axios.post(
        `${process.env.REACT_APP_WATCHLIST}`,
        {
          Title,
          Poster,
          Rated,
          Year,
          Runtime,
          Genre,
          imdbRating,
          Plot,
          userId,
          Type,
          Awards,
          BoxOffice,
          Country,
          Language,
          Actors,
          Writer,
          Director,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Added to Watchlist successfully!", response.data);
    } catch (error) {
      console.error(error);
      setError("Failed to add to Watchlist");
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
      <div class="container">
        {movieData && (
          <div class="row">
            <div class="col-md-4">
              <img
                src={movieData.Poster}
                alt={movieData.Title}
                class="img-fluid"
              />
            </div>
            <div class="col-md-8">
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
              <p>
                <strong>Recommendation:</strong>
                {movieData.imdbRating > 7
                  ? " Highly Recommended"
                  : movieData.imdbRating > 5
                  ? " Neutral"
                  : " Not Recommended"}
              </p>
              <button
                onClick={handleAddToWatchlist}
                className="btn btn-primary"
              >
                Add to WatchList
              </button>
            </div>
            <Link to="/watchlist" className="btn btn-secondary">
              Go to My Watchlist
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchMovies;
