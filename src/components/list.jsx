import React, { Component } from "react";
import Detail from "./detail";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: -1
    };
  }
  handleChangeActive = e => {
    this.props.onChangeIndex(parseInt(e.target.getAttribute("data-index")));
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
                  <span data-index={index} onClick={this.handleChangeActive}>
                    {film.Title}
                  </span>
                  {this.props.index === index ? (
                    <Detail
                      year={film.Year}
                      imdbID={film.imdbID}
                      type={film.Type}
                      poster={film.Poster}
                    />
                  ) : null}
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
