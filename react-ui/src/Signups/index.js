import React, { Component } from "react";
import { withRouter } from "react-router";
import '../components/signin.css'
import app from "../base";

import SignUpView from "./SignUpView";

class SignUpContainer extends Component {
  handleSignUp = async event => {
    event.preventDefault();
    const { email, password, username } = event.target.elements;
    try {
      const user = await app
      .auth()
      .createUserWithEmailAndPassword(email.value, password.value);
      this.props.history.push("/");

      app
        .database()
        .ref("users/")
      .push( {
        username: username.value,
        email: email.value
      });
      console.log(user);
    } catch (error) {
      alert(error);
    }
  };

  render() {
    return <SignUpView onSubmit={this.handleSignUp} />;
  }
}

export default withRouter(SignUpContainer);