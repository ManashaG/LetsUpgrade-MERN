import React, { Component } from "react";
import "./Product.css";

class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
    };

    this.button = null;

    if (this.props.age > 20) {
      this.button = (
        <button
          onClick={() => {
            this.doSomething("captain");
          }}
        >
          Change name
        </button>
      );
    } else {
      this.button = <h3>No update</h3>;
    }
  }

  doSomething = (name) => {
    this.setState({ name: name });
  };

  render() {
    return (
      <div className="Product">
        <h2>{this.state.name}</h2>
        <p>{this.props.age}</p>
        {this.button}
      </div>
    );
  }
}

export default Customer;
