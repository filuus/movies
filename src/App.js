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
      loading: true
    };
  }
  handleGetFilms = async text => {
    this.setState({ textSend: text });
    const response = await fetch(
      `http://www.omdbapi.com/?s=${text}&apikey=d41b340d`
    );
    const data = await response.json();
    this.setState({ listOfFilms: data.Search, loading: false });
    console.log(data);
    return data;
  };
  render() {
    return (
      <div>
        <Search
          textSend={this.state.textSend}
          onGetFilms={this.handleGetFilms}
        />
        {this.state.textSend ? (
          <List
            textSend={this.state.textSend}
            loading={this.state.loading}
            listOfFilms={this.state.listOfFilms}
          />
        ) : (
          ``
        )}
      </div>
    );
  }
}

export default App;
