import React, { Component } from "react";
import { FiSearch } from "react-icons/fi";
import "./MovieSearch.css";

class MovieSearch extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div className="search-field">
        <form>
          <FiSearch className="search-icon" />
          <input
            type="text"
            onChange={this.props.updateSearch}
            value={this.props.searchValue}
            placeholder="Search movies..."
          />
        </form>
      </div>
    );
  }
}

export default MovieSearch;
