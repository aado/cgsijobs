import React from "react";
// import { Link } from 'react-router-dom';
// import devimages from './developers.png';
import './style.css';

const SignUpView = ({ onSubmit }) => {
  return (
	<div>
		test
		{/* <div id="adovin">
			<div className="centerd">
				<img src={devimages} alt={"devs"} />
				<h1>Adovin</h1>
			</div>
		</div>   */}
		{/* <form onSubmit={onSubmit} className="form-signin">
			<h1 className="h3 mb-3 font-weight-normal">Create account</h1>
			<label htmlFor="inputEmail" className="sr-only">Email address</label>
			<input type="email" name="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus />
			<label htmlFor="inputPassword" className="sr-only">Password</label>
			<input type="password" id="inputPassword" name="password" className="form-control" placeholder="Password" required />
			<button className="btn btn-lg btn-primary btn-block" type="submit">Sign Up</button>
			Already Registered? <Link to="/login">Sign In</Link>
		</form> */}
	</div>
  );
};

export default SignUpView;