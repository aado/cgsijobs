import React from "react";
import { Link } from 'react-router-dom';

const LogInView = ({ onSubmit }) => {
	return (
		<div className="">
			<form onSubmit={onSubmit} className="form-signin">atest
				<h1 className="h3 mb-3 font-weight-normal" style={{'fontFamily': 'Impact, Charcoal, sans-serif' }}> Adovin </h1>
				<label htmlFor="inputEmail" className="sr-only">Email address</label>
				<input type="email" name="email" id="inputEmail" className="form-control" placeholder="Email Address" required autoFocus />
				<label htmlFor="inputPassword" className="sr-only">Password</label>
				<input type="password" id="inputPassword" name="password" className="form-control" placeholder="Password" required />
				<label className="Aleft"><small>email: test@gmail.com, pw: test123</small></label>
				<button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
				<small>Not Registered? <Link to="/signup">Register here</Link></small>
			</form>
		</div>
	);
};

export default LogInView;
