import React, { Component } from "react";
import Banner from "./Banner";
import axios from "axios";

export default class Movies extends Component {
  constructor() {
    super();
    this.state = {
      hover: "",
      parr: [1],
      currPage: 1,
      movies: [],
      favourites: [],
    };
  }

  async componentDidMount() {
    // side effects
    const res = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=c5f85a381651a29e19f9221101f463b1&language=en-US&page=${this.state.currPage}`
    );
    let data = res.data;
    this.setState({
      movies: [...data.results],
    });
    // console.log(data);
  }

  changeMovies = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=c5f85a381651a29e19f9221101f463b1&language=en-US&page=${this.state.currPage}`
    );
    let data = res.data;
    this.setState({
      movies: [...data.results],
    });
  };

  handleRight = () => {
    let tempArr = [];
    for (let i = 1; i <= this.state.parr.length + 1; i++) {
      tempArr.push(i);
    }
    this.setState(
      {
        parr: [...tempArr],
        currPage: this.state.currPage + 1,
      },
      this.changeMovies
    );
  };

  handleLeft = () => {
    if (this.state.currPage != 1) {
      this.setState(
        {
          currPage: this.state.currPage - 1,
        },
        this.changeMovies
      );
    }
  };

  handleClick = (value) => {
    if (value != this.state.currPage) {
      this.setState(
        {
          currPage: value,
        },
        this.changeMovies
      );
    }
  };

  handleFavourites = (movie) => {
    let oldData = JSON.parse(localStorage.getItem("movies-app") || "[]");
    if (this.state.favourites.includes(movie.id)) {
      oldData = oldData.filter((m) => {
        return m.id != movie.id;
      });
    } else {
      oldData.push(movie);
    }
    localStorage.setItem("movies-app", JSON.stringify(oldData));
    console.log(oldData);
    this.handleFavouritesState();
  };

  handleFavouritesState = () => {
    let oldData = JSON.parse(localStorage.getItem("movies-app") || "[]");
    let temp = oldData.map((movie) => movie.id);
    this.setState({
      favourites: [...temp],
    });
  };

  render() {
    return (
      <>
        <Banner />;
        {this.state.movies.length == 0 ? (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div>
            <h3 className="text-center">
              <strong>Trending Movies</strong>
            </h3>
            <div className="movies-list">
              {this.state.movies.map((movieObj) => (
                <div
                  className="card movies-card"
                  onMouseEnter={() => this.setState({ hover: movieObj.id })}
                  onMouseLeave={() => this.setState({ hover: "" })}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                    className="card-img-top movies-img"
                    alt={movieObj.title}
                  />
                  {/* <div className="card-body"> */}
                  <h5 className="card-title movies-title">
                    {movieObj.original_title}
                  </h5>
                  {/* <p className="card-text movies-text">{movieObj.overview}</p> */}
                  <div
                    className="button-wrapper"
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "center",
                    }}
                  >
                    {this.state.hover == movieObj.id && (
                      <a
                        className="btn btn-primary movies-button"
                        onClick={() => this.handleFavourites(movieObj)}
                      >
                        {this.state.favourites.includes(movieObj.id)
                          ? "Remove from Favourites"
                          : "Add to Favourites"}
                      </a>
                    )}
                  </div>
                  {/* </div> */}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <li class="page-item">
                    <a class="page-link" onClick={this.handleLeft}>
                      Previous
                    </a>
                  </li>
                  {this.state.parr.map((value) => (
                    <li class="page-item">
                      <a
                        class="page-link"
                        onClick={() => this.handleClick(value)}
                      >
                        {value}
                      </a>
                    </li>
                  ))}
                  <li class="page-item">
                    <a class="page-link" onClick={this.handleRight}>
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}
      </>
    );
  }
}
