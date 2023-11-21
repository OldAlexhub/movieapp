import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchMovies from "../components/SearchMovies";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 9; // Number of movies per page
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_HOME_PAGE}?page=${currentPage}&pageSize=${pageSize}`
        );
        setMovies(response.data.movies);
        setTotalPages(Math.ceil(response.data.totalMovies / pageSize));
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="container mt-5">
      <div className="mb-4 p-4 border rounded shadow-sm">
        <h2 className="mb-3">Movie Search</h2>
        <SearchMovies />
      </div>
      <div className="row">
        {Array.isArray(movies) &&
          movies.map((movie) => (
            <div className="col-md-4 mb-4" key={movie.id}>
              <div className="card">
                <img
                  src={`${imageBaseUrl}${movie.poster_path}`}
                  className="card-img-top"
                  alt={movie.original_title}
                />
                <div className="card-body">
                  <h5 className="card-title">{movie.title}</h5>
                  <p className="card-text">{movie.overview}</p>
                  <p className="card-text">
                    <small className="text-muted">
                      Release Date: {movie.release_date}
                    </small>
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      Rating: {movie.vote_average} ({movie.vote_count} votes)
                    </small>
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      Language: {movie.original_language}
                    </small>
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
      <nav aria-label="Page navigation">
        <ul className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index}
              className={`page-item ${
                index + 1 === currentPage ? "active" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default HomePage;
