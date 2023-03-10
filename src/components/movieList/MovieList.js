import React from "react";
import { Link } from "react-router";
import { ModulePoster } from "./ModulePoster";
import { ModuleTitle } from "./ModuleTitle";

import "./css/index.css";

// class MovieList extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     // conditional is used to prevent the search results from
//     // showing when the search bar is empty
//     if (this.props.searchValue.length <= 0) {
//       return null;
//     }

//     return (
//       <div className="movie-list">
//         <div className="top-results">
//           <p>Top Results</p>
//         </div>
//         {this.props.movies.map((movie) => {
//           return (
//             <div className="movie-module-wrapper" key={this.props.movie.id}>
//               <Link
//                 onClick={this.props.hideMenu}
//                 to={`/movie/${movie.id}`}
//                 className="movie-module"
//                 key={movie.id}
//               >
//                 <ModulePoster
//                   moviePoster={this.props.movie.poster_path}
//                   movieTitle={this.props.movie.title}
//                 />

//                 <ModuleTitle movieTitle={this.props.movie.title} />
//               </Link>
//             </div>
//           );
//         })}
//       </div>
//     );
//   }
// }

// export default MovieList;

export const MovieList = (props) => {
  // conditional is used to prevent the search results from
  // showing when the search bar is empty
  if (props.searchValue.length <= 0) {
    return null;
  }

  return (
    <div className="movie-list">
      <div className="top-results">
        <p>Top Results</p>
      </div>
      {props.movies.map((movie) => {
        return (
          <div className="movie-module-wrapper" key={movie.id}>
            <Link
              onClick={props.hideMenu}
              to={`/movie/${movie.id}`}
              className="movie-module"
              key={movie.id}
            >
              <ModulePoster
                moviePoster={movie.poster_path}
                movieTitle={movie.title}
              />

              <ModuleTitle movieTitle={movie.title} />
            </Link>
          </div>
        );
      })}
    </div>
  );
};
