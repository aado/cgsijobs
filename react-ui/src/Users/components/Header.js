import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/custom.css';
import logo from './vbplogo.png';
import logohead from './vbplogohead.png';

export default class Header extends Component {
	constructor(props) {
		super(props);
		this.state = { username: null };
	}

	render() {
		return (
			<header className="header">   
				<nav className="navbar navbar-expand-lg">
					<div className="search-panel">
						<div className="search-inner d-flex align-items-center justify-content-center">
							<div className="close-btn">Close <i className="fa fa-close"></i></div>
							<form id="searchForm">
								<div className="form-group">
									<input type="search" name="search" placeholder="What are you searching for..." />
									<button type="submit" className="submit">Search</button>
								</div>
							</form>
						</div>
					</div>
					<div className="container-fluid d-flex align-items-center justify-content-between">
						<div className="navbar-header Aleft">
							<a href="index.html" className="navbar-brand">
							<div className="brand-text brand-big visible text-uppercase"> <img src={logohead} className="img-responsive avatar" alt="logo" style={{'height': '50px',
							'width': '265px'}}/></div>
							<div className="brand-text brand-sm"><img src={logo} className="img-responsive avatar" alt="logo" style={{'height':'40px'}}/></div></a>
							<button className="sidebar-toggle"><i className="fa fa-long-arrow-left"></i></button>
						</div>
						<div className="list-inline-item logout">
							<div className="sidebar-header d-flex align-items-center">
								<div className="avatar" style={{right: '65px',position: 'absolute'}}></div>
								<Link id="logout" to="/login" className="nav-link"><i className="icon-logout"></i></Link>
							</div>
						</div>
					</div>
				</nav>
			</header>
			);
		}
}