import React, { Component } from "react";
import { Menu } from ".././menu/Menu";
import { Link } from "react-router";
import "./css/index.css";
import ".././menu/index.css";

class SideBar extends Component {
  state = {};
  constructor(props) {
    super();
    this.state = {
      windowWidth: window.innerWidth,
      sidebarClass: "sidebar",
    };
  }

  handleResize(e) {
    const winWidth = window.innerWidth;
    const maxWidth = 950;

    if (winWidth >= maxWidth) {
      this.props.showMenu();
    } else {
    }

    this.setState({
      windowWidth: window.innerWidth,
    });
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize.bind(this));
  }

  render() {
    return (
      <div className={this.props.sideBar}>
        <div className="movie-note">
          <Menu toggleMenu={this.props.toggleMenu} menuClass="change menu" />
          <div className="watchlist-title">
            <div>Watchlist</div>
            <Link to="/">
              <button className="home_btn">HOME</button>
            </Link>
          </div>

          <div className="watchlist">
            <ul>
              {this.props.watchList.map((movie) => {
                return (
                  <li className="watchlist-module" key={movie.id}>
                    <input
                      className="checkbox"
                      type="checkbox"
                      onChange={() => this.props.removeMovie(movie.id)}
                      defaultChecked={movie.remove}
                    />
                    <Link
                      activeStyle={{
                        backgroundColor: "#383a4e",
                        color: "#ff9104",
                      }}
                      to={`/movie/${movie.id}`}
                    >
                      {movie.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default SideBar;
