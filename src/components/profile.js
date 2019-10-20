import React, { Component } from "react";

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      title: "Profile"
    };
  }
  render() {
    return (
      <div>
        <p>
          {this.state.title}
        </p>
      </div>
    );
  }
}
