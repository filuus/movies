import React, { Component } from "react";

class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: this.props.activeIndex
    };
  }
  handleSelect = e => {
    this.props.onSelect(e.target.getAttribute("data-imdbid"));
  };
  handleHover = e => {
    this.props.changeIndex(e.target.getAttribute("data-index"));
    this.forceUpdate();
  };
  render() {
    return (
      <ul id="countries">
        {this.props.listOfHints.map((element, index) => {
          return (
            <li
              className={this.props.activeIndex === index ? `active` : ``}
              data-index={index}
              data-imdbid={element.imdbID}
              key={element.imdbID}
              onClick={this.handleSelect}
              onMouseOver={this.handleHover}
            >
              {element.Title}
            </li>
          );
        })}
      </ul>
    );
  }
}

export default Autocomplete;
