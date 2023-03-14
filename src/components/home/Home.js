import React, { Component } from "react";
import { loadRecentMovies } from "../../lib/movieService";
import { Link } from "react-router";

import "./index.css";

class Home extends Component {
  constructor(props) {
    super();
    this.state = {
      recentMovies: [],
      fromDate: null,
      toDate: null,
    };
  }

  componentWillMount() {
    this.recentMovies();
  }

  recentMovies = () => {
    loadRecentMovies().then((recentMovies) => {
      this.setState({ recentMovies });
    });
  };

  sortByVote = () => {
    const sortedMovies = this.state.recentMovies.sort((a, b) => {
      return b.vote_average - a.vote_average;
    });
    this.setState({ recentMovies: sortedMovies });
  };
  filterByDate = () => {
    const filteredMovies = this.state.recentMovies.filter((movie) => {
      const releaseDate = new Date(movie.release_date);
      return (
        releaseDate >= this.state.fromDate && releaseDate <= this.state.toDate
      );
    });
    this.setState({ recentMovies: filteredMovies });
  };

  handleFromDateChange = (event) => {
    const fromDate = new Date(event.target.value);
    this.setState({ fromDate });
  };

  handleToDateChange = (event) => {
    const toDate = new Date(event.target.value);
    this.setState({ toDate });
  };

  render() {
    const moviesToShow = this.state.recentMovies;

    return (
      <div className="recent-movies">
        <div className="buttons">
          <button onClick={this.sortByVote}>Sort by Vote</button>
          {/* <button onClick={this.sortByVote}>Filter by Date</button> */}
          <div>
            <label htmlFor="fromDate">From Date:</label>
            <input
              type="date"
              id="fromDate"
              name="fromDate"
              onChange={this.handleFromDateChange}
            />
          </div>
          <div>
            <label htmlFor="toDate">To Date:</label>
            <input
              type="date"
              id="toDate"
              name="toDate"
              onChange={this.handleToDateChange}
            />
          </div>
          <button onClick={this.filterByDate}>Filter by Date</button>
        </div>
        <div className="recent-movies-list">
          {moviesToShow.map((movie) => {
            return (
              <div className="recent-movie" key={movie.id}>
                <Link to={`/movie/${movie.id}`}>
                  {console.log(movie)}
                  <img
                    className="recent-movie-poster"
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Home;
