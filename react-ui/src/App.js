import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import app from "./base";

import Users from './pages/Users';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Login from './LogIns';
import SignUps from './Signups';
import Realworld from './Realworld';
import PrivateRoute from './PrivateRoute';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: null,
			fetching: true,
			loading: true, 
			authenticated: false, 
			user: null
		};
	}

  componentDidMount() {

	app.auth().onAuthStateChanged(user => {
		if (user) {
			this.setState({
				authenticated: true,
				currentUser: user,
				loading: false
			});
		} else {
			this.setState({
				authenticated: false,
				currentUser: null,
				loading: false
			});
		}
	});

    fetch('/api')
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        this.setState({
          message: json.message,
          fetching: false
        });
      }).catch(e => {
        this.setState({
          message: `API call failed: ${e}`,
          fetching: false
        });
      })
  }

  

	render() {
		const { authenticated, loading } = this.state;

		if (loading) {
		return <p>Loading..</p>;
		}

		return (
			<div className="App">
				<Router>
					<div>
						<PrivateRoute exact path="/" component={Home} authenticated={authenticated} />
						<PrivateRoute exact path="/about" component={About} authenticated={authenticated} />
						<PrivateRoute exact path="/contact" component={Contact} authenticated={authenticated} />
						<PrivateRoute exact path="/realworld" component={Realworld} authenticated={authenticated} />
						<Route exact path="/login" component={Login} />
						{/* <Route exact path="/landing" component={Landing} /> */}
						<Route exact path="/signup" component={SignUps} />
						<PrivateRoute path="/users" exact component={Users} authenticated={authenticated}/>
					</div>
				</Router>
			</div>
		);
	}
}

export default App;
