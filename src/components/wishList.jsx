import React, { Component } from "react";

class WishList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wishList: this.props.wishList
    };
  }
  deleteCookie = event => {
    const id = encodeURIComponent(event.target.getAttribute("data-idfilm"));
    const data = new Date();
    data.setTime(data.getMonth() - 1);
    document.cookie = id + "=; expires=" + data.toGMTString();
    this.props.removeToWishList(event.target.getAttribute("data-idfilm"));
    this.forceUpdate();
  };
  getFilm = e => {
    this.props.hiddenWishList();
    this.props.getFilm(event.target.getAttribute("data-idfilm"));
  };
  render() {
    return (
      <div className="wish-list">
        <ul>
          {document.cookie.split(/; */).map((element, index) => {
            return element.split(`=`)[0] ? (
              <li key={element.split(`=`)[0]}>
                <span
                  onClick={this.getFilm}
                  data-idfilm={element.split(`=`)[0]}
                >
                  {decodeURIComponent(element.split("=")[1])}
                </span>
                <span
                  onClick={this.deleteCookie}
                  data-idfilm={element.split(`=`)[0]}
                >
                  x
                </span>
              </li>
            ) : (
              `No titles on the list`
            );
          })}
        </ul>
      </div>
    );
  }
}

export default WishList;
