import React, { Component } from "react";
import Search from "./components/search";
import List from "./components/List";
import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ``,
      textSend: ``,
      listOfFilms: null,
      loading: true,
      index: -1
    };
  }
  handleGetFilms = async text => {
    this.setState({ textSend: text });
    this.setState({ index: -1 });
    const response = await fetch(
      `http://www.omdbapi.com/?s=${text}&apikey=d41b340d`
    );
    const data = await response.json();
    this.setState({ listOfFilms: data.Search, loading: false });
    console.log(data);
    return data;
  };
  changeIndex = newIndex => {
    this.setState({ index: newIndex });
  };
  render() {
    return (
      <div className="main-container">
        <Search
          textSend={this.state.textSend}
          onGetFilms={this.handleGetFilms}
        />
        {this.state.textSend ? (
          <List
            textSend={this.state.textSend}
            loading={this.state.loading}
            listOfFilms={this.state.listOfFilms}
            onChangeIndex={this.changeIndex}
            index={this.state.index}
          />
        ) : (
          ``
        )}
      </div>
    );
  }
}

export default App;
