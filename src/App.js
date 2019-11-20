import React, { Component } from "react";
import Search from "./components/search";
import List from "./components/list";
import WishList from "./components/wishList";
import Detail from "./components/detail";
import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textSend: ``,
      listOfFilms: [],
      loading: true,
      index: -1,
      listOfHints: null,
      listActive: false,
      wishList: [],
      isWishList: false,
      message: ``,
      film: null,
      detailActive: false,
      resultsActive: false,
      page: 1,
      buttonShowMoreActive: true
    };
  }
  componentDidMount = () => {
    document.cookie.split(/; */).map((element, index) => {
      this.addToWishList(element.split(`=`)[0], `title`);
    });
  };
  handleGetFilms = async (text, isSend = 0) => {
    text = text.replace(/ - /g, ` `);
    const response = await fetch(
      `http://www.omdbapi.com/?s=${text}&apikey=d41b340d`
    );
    const data = await response.json();
    if (isSend) {
      if (data.Response === `True`) {
        this.setState({
          buttonShowMoreActive:
            this.state.page + 1 <= Math.ceil(data.totalResults / 10)
        });
        if (this.state.page <= Math.ceil(data.totalResults / 10)) {
          const page = await fetch(
            `http://www.omdbapi.com/?s=${text}&page=${this.state.page}&apikey=d41b340d`
          );
          const dataPage = await page.json();
          this.setState(state => ({
            listOfFilms: [...state.listOfFilms, ...dataPage.Search]
          }));
          this.setState(state => ({
            page: state.page + 1
          }));
        }
        this.setState({
          textSend: text,
          index: -1,
          loading: false,
          listActive: false,
          message: ``,
          resultsActive: true,
          detailActive: false
        });
      } else {
        this.setState({
          message: data.Error
        });
      }
    } else {
      let tab = data.Search;
      if (text) {
        if (tab) {
          this.setState({ listOfHints: tab.slice(0, 4) });
          this.setState({ listActive: true });
        } else {
          this.setState({ listActive: false });
        }
      } else {
        this.setState({ listActive: false });
      }
    }
    return data;
  };
  getFilm = async id => {
    const response = await fetch(
      `http://www.omdbapi.com/?i=${id}&apikey=d41b340d`
    );
    const data = await response.json();
    this.setState({
      listActive: false,
      film: data,
      detailActive: true,
      resultsActive: false
    });
  };
  changeIndex = newIndex => {
    this.setState({ index: newIndex });
  };
  addToWishList = (id, title) => {
    this.setState(prevState => ({
      wishList: [...prevState.wishList, id]
    }));
  };
  removeToWishList = id => {
    const index = this.state.wishList.indexOf(id);
    let tempTab = this.state.wishList;
    tempTab.splice(index, 1);
    this.setState({
      wishList: tempTab
    });
  };
  handleShowWishList = () => {
    this.setState((state, props) => ({
      isWishList: ~state.isWishList
    }));
  };
  hiddenWishList = () => {
    this.setState({
      isWishList: false
    });
  };
  hiddenDetails = () => {
    this.setState({
      detailActive: false,
      resultsActive: true
    });
  };
  resetListOfFilms = () => {
    this.setState({
      listOfFilms: [],
      page: 1
    });
  };
  render() {
    return (
      <div className="main-container">
        <button
          className="show-wish-list-button"
          onClick={this.handleShowWishList}
        >
          Wish List
        </button>
        {this.state.isWishList ? (
          <WishList
            wishList={this.state.wishList}
            removeToWishList={this.removeToWishList}
            getFilm={this.getFilm}
            hiddenWishList={this.hiddenWishList}
          />
        ) : (
          ``
        )}
        <Search
          textSend={this.state.textSend}
          onGetFilms={this.handleGetFilms}
          listOfHints={this.state.listOfHints}
          listActive={this.state.listActive}
          message={this.state.message}
          hiddenWishList={this.hiddenWishList}
          getFilm={this.getFilm}
          resetListOfFilms={this.resetListOfFilms}
        />
        {this.state.resultsActive ? (
          <List
            textSend={this.state.textSend}
            loading={this.state.loading}
            listOfFilms={this.state.listOfFilms}
            onChangeIndex={this.changeIndex}
            index={this.state.index}
            addToWishList={this.addToWishList}
            removeToWishList={this.removeToWishList}
            wishList={this.state.wishList}
            getFilm={this.getFilm}
            getFilms={this.handleGetFilms}
            buttonShowMoreActive={this.state.buttonShowMoreActive}
          />
        ) : (
          ``
        )}
        {this.state.detailActive ? (
          <Detail
            onChangeIndex={this.changeIndex}
            addToWishList={this.addToWishList}
            removeToWishList={this.removeToWishList}
            wishList={this.state.wishList}
            film={this.state.film}
            hiddenDetails={this.hiddenDetails}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
