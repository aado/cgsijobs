import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import template from './templateicon.png';
import users from './usersicon.png';

export default class Sidebar extends Component {
    render () {
        return (
			<nav id="sidebar" style={{fontSize: '12px', marginTop: '75px'}}>
				<ul className="list-unstyled Tsidebar">
					<li><Link to="/vbphome"> <i className="fa fa-tachometer label-orange" style={{'color':'#95C53D'}}></i>Dashboard </Link></li>
					<li><Link to="/vbphome"> <i className="fa fa-tasks label-orange" style={{'color':'#95C53D'}}></i>Task </Link></li>
					<li><Link to="/tasktemplate"> <img alt="icon" src={template} style={{'height':'20px'}}/> &nbsp;&nbsp;&nbsp;| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Task Templates</Link></li>
					<li><Link to="/clients"> <i className="fa fa-users" style={{'color':'#95C53D'}}></i>Clients </Link></li>
					<li><Link to="/users"> <img alt="icon" src={users} style={{'height':'30px','float': 'left', 'marginLeft': '-10px'}}/> &nbsp;&nbsp;| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Users </Link></li>
				</ul>
			</nav>
    	);
    }

}