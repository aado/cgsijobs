import React, { Component } from "react";
import LogInView from "./LogInView";
import { withRouter } from "react-router";
import '../components/signin.css'
import app from "../base";

class LogInContainer extends Component {
	handleSignUp = async event => {
		event.preventDefault();
		const { email, password } = event.target.elements;
		try {
			const user = await app
			.auth()
			.signInWithEmailAndPassword(email.value, password.value);
			this.props.history.push("/");
			console.log(user);
		} catch (error) {
			alert(error);
		}
	};

	render() {
		return <LogInView onSubmit={this.handleSignUp} />;
	}
}

export default withRouter(LogInContainer);
