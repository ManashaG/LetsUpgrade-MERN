import React, { Component } from "react";

export default class Stream extends Component {
  constructor(props) {
    super(props);
    console.log("hello");
    this.state = {};
  }

  render() {
    return (
      <div className="container">
        <video controls width="100%" autoplay muted>
          <source
            src={
              "http://localhost:8000/video/stream/" +
              this.props.match.params.name
            }
          ></source>
        </video>
      </div>
    );
  }
}
