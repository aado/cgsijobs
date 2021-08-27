import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { Button } from 'reactstrap';
import app from "../base";

export default class Header extends Component {
	constructor(props) {
		super(props);
		this.state = { username: null };
	}

	componentDidMount() {
		app.auth().onAuthStateChanged(function(user) {
			if (user) {
				var email = user.email;
				var emailVal = document.getElementById("userName");
				var text = document.createTextNode(email);
				emailVal.appendChild(text);
			} else {
				this.props.history.push("/login");
			}
		});
	}

	signOutUser = async () => {
		try {
			await app.auth().signOut();
			this.props.history.push("/login");
		} catch (e) {
			console.log(e);
		}
	}

	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
				<div className="container">
					<Link className="navbar-brand titlePage" to="/">Adovin</Link>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarResponsive">
						<ul className="navbar-nav ml-auto">
							<li className="nav-item">
								<Link id="home" to="/" className="nav-link">Home</Link>
							</li>
							<li className="nav-item">
								<Link id="about" to="/about" className="nav-link">Developer</Link>
							</li>
							<li className="nav-item">
								<Link id="about" to="/contact" className="nav-link">Chat</Link>
							</li>
							{/* <li className="nav-item">
								<Link id="about" to="/realworld" className="nav-link">Users</Link>
							</li> */}
						</ul>
					</div>
					<div>
						<span id="userName" style={{color:'white'}}></span>&nbsp; |
						<a title="logout" style={{cursor:'pointer', color: 'white'}} onClick={() => this.signOutUser()} >Logout</a>
					</div>
				</div>
			</nav>
		);
	}
}