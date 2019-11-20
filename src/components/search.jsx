import React, { Component } from "react";
import Autocomplete from "./autocomplete";
import Message from "./message";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: ``,
      value: ``,
      valueSelected: ``,
      activeIndex: -1
    };
  }
  handleGetFilms = e => {
    this.props.onGetFilms(this.state.value, 1);
  };
  handleChange = event => {
    if (!event.keyCode) {
      this.setState({ value: event.target.value });
      this.props.onGetFilms(event.target.value, 0);
    }
  };
  handleUsingKeyboard = e => {
    if (e.keyCode === 40) {
      //40 arrow DOWN

      this.setState((state, props) => ({
        activeIndex: (state.activeIndex + 1) % props.listOfHints.length
      }));
    } else if (e.keyCode === 38) {
      //38 arrow UP

      this.setState((state, props) => ({
        activeIndex:
          (state.activeIndex + props.listOfHints.length - 1) %
          props.listOfHints.length
      }));
    } else if (e.keyCode === 13) {
      //13 ENTER
      if (this.state.activeIndex === -1) {
        this.props.resetListOfFilms();
        this.props.onGetFilms(this.state.value, 1);
      } else {
        this.setState(
          {
            value: this.props.listOfHints[this.state.activeIndex].Title,
            id: this.props.listOfHints[this.state.activeIndex].imdbID,
            activeIndex: -1
          },
          () => {
            this.props.getFilm(this.state.id);
          }
        );
      }
    } else {
      this.setState({ value: e.target.value });
      this.props.onGetFilms(e.target.value, 0);
      this.setState({ activeIndex: -1 });
    }
  };
  handleSelect = id => {
    this.props.getFilm(id);
  };
  changeIndex = index => {
    this.setState({
      activeIndex: index
    });
  };
  handleHiddenWishList = () => {
    this.props.hiddenWishList();
  };
  render() {
    return (
      <div className="search-fields">
        <Message message={this.props.message} />
        <input
          placeholder="Enter the words"
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
          onKeyUp={this.handleUsingKeyboard}
          onClick={this.handleHiddenWishList}
        />
        <input type="button" value="Search" onClick={this.handleGetFilms} />
        {this.props.listActive && this.props.listOfHints ? (
          <Autocomplete
            listOfHints={this.props.listOfHints}
            activeIndex={this.state.activeIndex}
            onSelect={this.handleSelect}
            changeIndex={this.changeIndex}
          />
        ) : (
          ``
        )}
      </div>
    );
  }
}

export default Search;
