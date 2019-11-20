import React, { Component } from "react";

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.film.imdbID,
      title: this.props.film.Title
    };
  }
  handleChangeIndex = () => {
    this.props.onChangeIndex(-1);
  };
  handleHiddenDetails = () => {
    this.props.hiddenDetails();
  };
  setCookie = (name, val, days, path, domain, secure) => {
    if (1 === 1) {
      const cookieName = encodeURIComponent(name);
      const cookieVal = encodeURIComponent(val);
      let cookieText = cookieName + "=" + cookieVal;

      if (typeof days === "number") {
        const data = new Date();
        data.setTime(data.getTime() + days * 24 * 60 * 60 * 1000);
        cookieText += "; expires=" + data.toGMTString();
      }

      if (path) {
        cookieText += "; path=" + path;
      }
      if (domain) {
        cookieText += "; domain=" + domain;
      }
      if (secure) {
        cookieText += "; secure";
      }

      document.cookie = cookieText;
    }
  };
  deleteCookie = () => {
    const id = encodeURIComponent(this.state.id);
    const data = new Date();
    data.setTime(data.getMonth() - 1);
    document.cookie = id + "=; expires=" + data.toGMTString();
  };

  handleAddToWishList = () => {
    if (this.props.wishList.every(el => el !== this.props.film.imdbID)) {
      this.setCookie(this.props.film.imdbID, this.props.film.Title);
      this.props.addToWishList(this.props.film.imdbID, this.props.film.Title);
      this.forceUpdate();
    } else {
      this.deleteCookie();
      this.props.removeToWishList(this.props.film.imdbID);
      this.forceUpdate();
    }
  };
  render() {
    return (
      <div className="details">
        <h2 className="title">
          {this.props.film.Title}
          <span className="year">({this.props.film.Year})</span>
        </h2>

        <img
          className="poster"
          src={this.props.film.Poster}
          alt={this.props.film.Title + " - poster"}
        />

        <div className="description">
          <p className="plot">{this.props.film.Plot}</p>
          <p className="run-time">{this.props.film.Runtime} min</p>
        </div>
        <div className="basic-info">
          <table>
            <tbody>
              <tr>
                <td>Writer:</td>
                <td>
                  <span>{this.props.film.Writer}</span>
                </td>
              </tr>
              <tr>
                <td>Director:</td>
                <td>
                  <span>{this.props.film.Director}</span>
                </td>
              </tr>
              <tr>
                <td>Released:</td>
                <td>
                  <span>{this.props.film.Released}</span>
                </td>
              </tr>
              <tr>
                <td>Type:</td>
                <td>
                  <span>{this.props.film.Type}</span>
                </td>
              </tr>
              <tr>
                <td>Genre:</td>
                <td>
                  <span>{this.props.film.Genre}</span>
                </td>
              </tr>
              <tr>
                <td>Language:</td>
                <td>
                  <span>{this.props.film.Language}</span>
                </td>
              </tr>
              <tr>
                <td>Reted:</td>
                <td>
                  <span>{this.props.film.Reted}</span>
                </td>
              </tr>
              <tr>
                <td>Country:</td>
                <td>
                  <span>{this.props.film.Country}</span>
                </td>
              </tr>
              <tr>
                <td>DVD:</td>
                <td>
                  <span>{this.props.film.DVD}</span>
                </td>
              </tr>
              <tr>
                <td>Production:</td>
                <td>
                  <span>{this.props.film.Production}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <ul className="actors">
          Cast:
          {this.props.film.Actors.split(`, `).map((actor, index) => {
            return <li key={index}>{actor}</li>;
          })}
        </ul>
        <p className="awards">
          Awards: <span>{this.props.film.Awards}</span>
        </p>
        <table className="ratings">
          <tbody>
            {this.props.film.Ratings.map((rating, index) => {
              return (
                <tr key={index}>
                  <td>{rating.Source}:</td>
                  <td>{rating.Value}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="navi">
          <span
            className="close"
            onClick={this.handleHiddenDetails}
          >{`\u2613`}</span>
          <span className="add-to-wish-list" onClick={this.handleAddToWishList}>
            {this.props.wishList.some(el => el === this.props.film.imdbID)
              ? `\u2605`
              : `\u2606`}
          </span>
        </div>
      </div>
    );
  }
}

export default Detail;
