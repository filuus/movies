import React, { Component } from "react";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: -1
    };
  }
  handleGetFilm = e => {
    this.props.getFilm(e.target.getAttribute("data-index"));
  };
  render() {
    return (
      <div className="list-of-films">
        {this.props.loading || !this.props.listOfFilms ? (
          <div>loading...</div>
        ) : (
          <ul>
            {this.props.listOfFilms.map((film, index) => {
              return (
                <li key={film.imdbID}>
                  <span data-index={film.imdbID} onClick={this.handleGetFilm}>
                    {film.Title}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
}

export default List;
