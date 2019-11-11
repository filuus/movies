import React, { Component } from "react";

class Detail extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <img src={this.props.poster} />
        <p>Year of production: {this.props.year}</p>
        <p>Type: {this.props.type}</p>
      </div>
    );
  }
}

export default Detail;
