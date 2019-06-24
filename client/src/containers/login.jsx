import React, { Component } from "react";

import axios from "axios";

class Login extends Component {
  constructor() {
    super();

    this.state = { isAuthenticated: false, user: null, token: "" };
  }

  requestToken = () => {
    axios.get("auth/login/request_token").then(r => {
      window.location.href = `https://api.twitter.com/oauth/authorize?oauth_token=${
        r.data.oauth_token
      }`;
    });
  };
  render() {
    return (
      <button
        onClick={this.requestToken}
        style={{ margin: "25px 25%", width: "50%", height: 50 }}
      >
        Twitter Login
      </button>
    );
  }
}

export default Login;
