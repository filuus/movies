import React, { Component } from "react";

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: `* ${this.props.message}`
    };
  }
  render() {
    return <p className="message">{this.props.message}</p>;
  }
}

export default Message;
