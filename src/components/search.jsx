import React, { Component } from "react";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ``
    };
  }
  handleGetFilms = e => {
    this.props.onGetFilms(this.state.value);
  };
  handleChange = event => {
    this.setState({ value: event.target.value });
  };
  render() {
    return (
      <div className="search-fields">
        <input type="text" onChange={this.handleChange} />
        <input type="button" value="Search" onClick={this.handleGetFilms} />
      </div>
    );
  }
}

export default Search;
