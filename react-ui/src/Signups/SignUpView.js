import React from "react";
import { Link } from 'react-router-dom';

const SignUpView = ({ onSubmit }) => {
  return (
	<div>
		<form onSubmit={onSubmit} className="form-signin">
			<h1 className="h3 mb-3 font-weight-normal" style={{'fontFamily': 'Impact, Charcoal, sans-serif' }}>Create account</h1>
			<label htmlFor="username" className="sr-only">Username</label>
			<input type="text" name="username" id="username" className="form-control" placeholder="Username" required autoFocus />
			<label htmlFor="inputEmail" className="sr-only">Email address</label>
			<input type="email" name="email" id="inputEmail" className="form-control" placeholder="Email address" required />
			<label htmlFor="inputPassword" className="sr-only">Password</label>
			<input type="password" id="inputPassword" name="password" className="form-control" placeholder="Password" required />
			<button className="btn btn-lg btn-primary btn-block" type="submit">Sign Up</button>
			<small>Already Registered? <Link to="/login">Sign In</Link></small>
		</form>
	</div>
  );
};

export default SignUpView;