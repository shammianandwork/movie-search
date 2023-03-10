import React, { Component } from "react";

import "./MovieSearch.css";

class MovieSearch extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div className="search-field">
        <form>
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
