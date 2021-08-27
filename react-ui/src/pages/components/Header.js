import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import './css/custom.css';
import logo from './vbplogo.png';
import logohead from './vbplogohead.png';
import { Button } from 'reactstrap';
import app from "../../base";

export default class Header extends Component {
    constructor(props) {
		super(props);
		this.state = { username: '' };
	  }
	
	componentDidMount() {
	// fetch('/api/getUsername')
	// 	.then(res => res.json())
    // 	.then(user => this.setState({ username: user.username }));
    app.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
        //   var displayName = user.displayName;
        
        
        var email = user.email;
        var emailVal = document.getElementById("userName");
        var text = document.createTextNode(email);
        emailVal.appendChild(text);

        // document.getElementById('userName').text = email;
        //   console.log(email);
          
        //   var email = user.email;
        //   var emailVerified = user.emailVerified;
        //   var photoURL = user.photoURL;
        //   var isAnonymous = user.isAnonymous;
        //   var providerData = user.providerData;
          // ...
        } else {
            this.props.history.push("/login");
          // User is signed out.
          // ...
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
                        <div className="avatar" style={{right: '65px',position: 'absolute'}}>
                            <span style={{'color':'#95C53D'}} id="userName"></span>
                            <Button title="logout" onClick={() => this.signOutUser()} >logout</Button>
                        </div>
                    </div>
                   
                </div>
                </div>
            </nav>
            </header>
        );
    }
}