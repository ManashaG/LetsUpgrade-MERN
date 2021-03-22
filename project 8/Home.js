import React, { Component } from "react";

import { Route, Switch, Link } from "react-router-dom";
import Videos from "./Videos";
import Stream from "./Stream";
export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link to="/" className="navbar-brand">
              Navbar
            </Link>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to="/" className="nav-link active" aria-current="page">
                    Home
                  </Link>
                </li>
              </ul>
              <form className="d-flex ml-auto">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
              </form>
            </div>
          </div>
        </nav>

        <Switch>
          <Route path="/" exact component={Videos} />
          <Route path="/stream/:name" exact component={Stream} />
        </Switch>
      </div>
    );
  }
}
