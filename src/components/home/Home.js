import React, { Component } from "react";
import { loadRecentMovies } from "../../lib/movieService";
import { Link } from "react-router";

import "./index.css";

class Pagination extends Component {
  render() {
    const pageLinks = [];
    for (let i = 1; i <= this.props.totalPages; i++) {
      let active = this.props.page === i ? "active" : "";
      pageLinks.push(
        <button
          key={i}
          className={`pagination_btn ${active}`}
          style={{ width: "5rem", height: "2rem", margin: "0.5rem" }}
          onClick={() => this.props.nextPage(i)}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="row">
        <div className="col s12">
          <div className="pagination">{pageLinks}</div>
        </div>
      </div>
    );
  }
}

class Home extends Component {
  constructor(props) {
    super();
    this.state = {
      recentMovies: [],
      page: 1,
      totalPages: 1,
    };
  }

  componentWillMount() {
    this.recentMovies();
  }

  recentMovies = () => {
    loadRecentMovies().then((recentMovies) => {
      this.setState({ recentMovies });
      this.calculateTotalPages(recentMovies.length);
    });
  };
  calculateTotalPages = (totalItems) => {
    const totalPages = Math.ceil(totalItems / 3);
    this.setState({ totalPages });
  };

  nextPage = (pageNumber) => {
    this.setState({ page: pageNumber });
  };

  // add pagination

  render() {
    const startIndex = (this.state.page - 1) * 3;
    const endIndex = startIndex + 3;
    const moviesToShow = this.state.recentMovies.slice(startIndex, endIndex);

    return (
      <div className="recent-movies">
        <div className="recent-movies-list">
          {moviesToShow.map((movie) => {
            return (
              <div className="recent-movie" key={movie.id}>
                <Link to={`/movie/${movie.id}`}>
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
        <Pagination
          page={this.state.page}
          nextPage={this.nextPage}
          totalPages={this.state.totalPages}
        />
      </div>
    );
  }
}

export default Home;
