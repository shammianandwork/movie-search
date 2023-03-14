import React, { Component } from "react";
import "./App.css";
import MovieSearch from "./components/movieSearch/MovieSearch";
import SideBar from "./components/sideBar/SideBar";
import { MovieList } from "./components/movieList/MovieList";
import { Menu } from "./components/menu/Menu";
import { loadMovies } from "./lib/movieService";
import { AiFillHome } from "react-icons/ai";

import {
  findId,
  toggleRemove,
  removeMovie,
  updateRemove,
} from "./lib/watchListHelpers";
import { Link } from "react-router";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keys: [],
      movies: [],
      watchList: [],
      searchValue: "",
      poster: "",
      sidebar: "sidebar",
      windowWidth: window.innerWidth,
    };
  }

  updateSearch = (e) => {
    this.search(e.target.value);
    this.setState({
      searchValue: e.target.value,
    });
  };

  search = (query) => {
    loadMovies(query).then((movies) => {
      this.setState({ movies });
    });
  };

  hideMenu = () => {
    this.setState({
      searchValue: "",
    });
  };

  toggleMenu = (e) => {
    e.preventDefault();
    if (this.state.sidebar === "sidebar") {
      this.setState({
        sidebar: "sidebar show",
      });
    } else {
      this.setState({
        sidebar: "sidebar",
      });
    }
  };

  showMenu = (e) => {
    this.setState({
      sidebar: "sidebar",
    });
  };

  addToWatchList = (newState) => {
    let counter = newState.length;
    let newMovie = newState[counter - 1];

    this.setState({
      watchList: newState,
    });
  };

  removeMovie = (id) => {
    let movie = findId(id, this.state.watchList);
    let removed = toggleRemove(movie);
    let index = this.state.watchList.indexOf(movie);
    let updatedWatchList = updateRemove(this.state.watchList, removed);
    let movieUID = this.state.watchList[index].id;

    this.setState({
      watchList: updatedWatchList,
    });

    if (!movie.remove) {
      let updatedWatchList = removeMovie(this.state.watchList, index);
      this.setState({
        watchList: updatedWatchList,
      });
    }
  };

  render() {
    return (
      <div className="app">
        <div className="movie-note">
          <div className="navbar">
            <h2>FILMORA</h2>
            <Link to="/">
              <AiFillHome
                className="home-icon"
                style={{
                  fontSize: "2.5rem",
                  cursor: "pointer",
                  color: "white",
                }}
              />
            </Link>
          </div>
          <div className="header">
            <div className="Movie-Search">
              <MovieSearch
                updateSearch={this.updateSearch}
                searchValue={this.state.searchValue}
              />
              <div className="Movie-Info">
                <MovieList
                  newPage={this.newPage}
                  searchValue={this.state.searchValue}
                  hideMenu={this.hideMenu}
                  movies={this.state.movies}
                  poster={this.state.poster}
                />
              </div>
            </div>
          </div>

          <div className="main">
            {React.cloneElement(this.props.children, {
              watchList: this.state.watchList,
              addToWatchList: this.addToWatchList,
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
