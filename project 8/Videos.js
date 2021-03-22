import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class Videos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
    };
  }

  componentDidMount = () => {
    fetch("http://localhost:8000/video/videos")
      .then((response) => response.json())
      .then((videos) => {
        this.setState({ videos: videos });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          {this.state.videos.map((video, index) => (
            <div
              className="card"
              key={index}
              style={{ width: "18rem", margin: "20px" }}
            >
              <img
                src={"http:///localhost:8000/posters/" + video.thumbnail}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">{video.name}</h5>
                <p className="card-text">Rating on IMDB : {video.rating}</p>
                <Link
                  to={"/stream/" + video.videolinks}
                  className="btn btn-primary"
                >
                  Watch
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
