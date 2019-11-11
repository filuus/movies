import React, { Component } from "react";

class List extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="list-of-films">
        {this.props.loading || !this.props.listOfFilms ? (
          <div>loading...</div>
        ) : (
          <ul>
            {this.props.listOfFilms.map(function(film) {
              return (
                <li key={film.imdbID} onClick={() => console.log(`test`)}>
                  {film.Title}
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
