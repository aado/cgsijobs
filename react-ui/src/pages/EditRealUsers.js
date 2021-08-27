import React, { Component } from 'react';
// import axios from 'axios';
// import Pusher from 'pusher-js';
import './components/css/custom.css';
import Select from 'react-select';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { Modal, ModalHeader, ModalBody, Button, FormGroup, Label, Input, Row, Col, Form } from 'reactstrap';
import firebase from 'firebase';

// const socket = new Pusher('223aca0f0c8175acf4b3', {
// 	cluster: 'ap1',
// 	encrypted: true
// });

const accessTypes = [
	{
		value: '',
		label: 'Select Access Type'
	},
	{
		value: 'Super User',
		label: 'Super User'
	},
	{
		value: 'Administrator',
		label: 'Administrator'
	},
	{
		value: 'Manager',
		label: 'Manager'
	},
	{
		value: 'User',
		label: 'User'
	}
];

const department = [
	{
		value: '',
		label: 'Select Department'
	},
	{
		value: 'Cluster Gazi',
		label: 'Cluster Gazi'
	},
	{
		value: 'Cluster Shi-an',
		label: 'Cluster Shi-an'
	},
	{
		value: 'The Forge',
		label: 'The Forge'
	},
	{
		value: 'IT',
		label: 'IT'
	},
	{
		value: 'Accounting',
		label: 'Accounting'
	},
	{
		value: 'HR',
		label: 'HR'
	},
	{
		value: 'Training',
		label: 'Training'
	},
	{
		value: 'Marketing',
		label: 'Marketing'
	},
	{
		value: 'Support',
		label: 'Support'
	}
];

export default class EditUsers extends Component {
    constructor(props) {
		super(props);
		this.state = {
			open: false,
			selectedOptionHead: null,
			selectedOptionClient: null,
			selectedOptionRole: null,
			roles: [],
			heads:[],
			clients: [],
			usersData: [],
			modal: false
		}
	}
	
	componentDidMount() {
		
		let initialClients = [];
		let initialHeads = [];
		let initialRoles = [];

		//all clients
		fetch(`http://13.229.172.162/vbpapi/users/allclients`)
		.then(response => {
			return response.json();
		}).then(data => {
			initialClients = data.map(client => ({
				value: client.id,
				label: client.name,
			}));
			this.setState({clients: initialClients});
		});

		//all heads
		fetch(`http://13.229.172.162/vbpapi/users/allheads`)
		.then(response => {
			return response.json();
		}).then(data => {
			initialHeads = data.map(heads => ({
				value: heads.id,
				label: heads.name,
			}));
			this.setState({heads: initialHeads});
		});

		//all roles
		fetch(`http://13.229.172.162/vbpapi/users/allroles`)
		.then(results => {
			return results.json();
		}).then(data => {
			initialRoles = data.map(role => ({
				value: role.id,
				label: role.name,
			}));
			this.setState({roles: initialRoles});
		});
	}

	EditUser(usersVal) {
		const rowValue = this.props.row;
		// axios.request({
		// 	method:'post',
		// 	url:'http://13.229.172.162/vbpapi/users/edituser/'+rowValue.id,
		// 	data: usersVal
		// }).then(response => {
		// 	this.setState({open: false});
		// 	// this.getDataUsers();
		// 	// location.reload();
		// 	// axios.post('http://localhost:8080/users', payload);
		// }).catch(err => console.log(err));

		// firebase
		// .database()
		// .ref("users/")
		// .push( {
		// 	firstname: this.firstname.value,
		// 	lastname: this.lastname.value,
		// 	access_type: this.access_type.value,
		// 	role: role_select.label,
		// 	direct_head: head_select.label,
		// 	department: this.department.value,
		// 	email: this.email.value,
		// 	hand_over_date: this.hand_over_date.value,
		// 	client: client_select.label,
		// })

		let ref = firebase.database().ref('users/');
		return ref
		.child(rowValue.id)
		.update(usersVal)
		.then(() => ref.once('value'))
		.then(snapshot => snapshot.val())
		.catch(error => ({
			errorCode: error.code,
			errorMessage: error.message
		}));
	}

	getDataUsers() {
		fetch(`http://13.229.172.162/vbpapi/users/allusers`)
		.then(results => {
			return results.json();
		}).then(data => {
			this.setState({usersData:data});
		});
	}

	handleChangeHead = (selectedOptionHead) => {
		this.setState({ selectedOptionHead });
	}

	handleChangeClient = (selectedOptionClient) => {
		this.setState({ selectedOptionClient });
	}

	handleChangeRole = (selectedOptionRole) => {
		this.setState({ selectedOptionRole });
	}

	toggle = () => {
		this.setState({
			modal: !this.state.modal
		});
	}

	onFormEditSubmit = (e) => {
		e.preventDefault();
		const rowValue = this.props.row;
		const role_select = this.state.selectedOptionRole;
		const head_select = this.state.selectedOptionHead;
		const client_select = this.state.selectedOptionClient;
		const updateUser = {
			firstname: this.firstname.value,
			lastname: this.lastname.value,
			access_type: this.access_type.value,
			role: (role_select == null)? rowValue.role : role_select.label,
			direct_head:  (head_select == null)? rowValue.direct_head : head_select.label,
			department: this.department.value,
			email: this.email.value,
			hand_over_date: this.hand_over_date.value,
			client: (client_select == null)? rowValue.client : client_select.label,
		}
		this.EditUser(updateUser);
	}

   render() {
		const { selectedOptionClient } = this.state;
		const { selectedOptionRole } = this.state;
		const { selectedOptionHead } = this.state;
		const { row } = this.props; //cell, , rowIndex 
        return (
            <div>
				<i color="success" className="fa fa-pencil-square-o text-success fa-lg" style={{'cursor':'pointer'}} onClick={this.toggle}></i>
				<i className="fa fa-trash-o text-danger fa-lg" style={{'cursor':'pointer','marginLeft': '10px'}}></i>

				<Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-lg container-fluid">
					<ModalHeader toggle={this.toggle}>Edit User</ModalHeader>
					<ModalBody>
					<Form className="Aleft addUserForm" onSubmit={this.onFormEditSubmit}>
						<Row >
							<Col md={6}>
								<FormGroup>
									<Label>Firstname*</Label>
									<Input innerRef={(e) => this.firstname = e} defaultValue={row.firstname} type="text" name="firstname" placeholder="Enter Firstname" required="required"/>
								</FormGroup>
							</Col>
							<Col md={6}>
								<FormGroup>
									<Label>Lastname*</Label>
									<Input innerRef={(e) => this.lastname = e} type="text" defaultValue={row.lastname} name="lastname" placeholder="Enter Lastname" required="required"/>
								</FormGroup>
							</Col>
						</Row>
						<Row >
							<Col md={6}>
								<FormGroup>
									<Label>Access Type*</Label>
									<Input type="select" innerRef={(e) => this.access_type = e} name="access_types" defaultValue={row.access_type} className="dropdownSelectForm" required="required">
											{accessTypes.map(option => (
												<option key={option.value} value={option.value}>
													{option.label}
												</option>
											))}
									</Input>
								</FormGroup>
							</Col>

							<Col md={6}>
								<FormGroup>
									<label>Select Role*</label>
									<Select
										options={this.state.roles}
										value={selectedOptionRole}
										onChange={this.handleChangeRole}
										placeholder="Select Role"
										className="Aleft dropdownSelectForm"
										defaultInputValue={row.role}
									/>
								</FormGroup>
							</Col>
						</Row>
						<Row >
							<Col md={6}>
								<FormGroup>
									<label>Select Direct Head*</label>
									<Select
										options={this.state.heads}
										value={selectedOptionHead}
										onChange={this.handleChangeHead}
										placeholder="Select Direct Head"
										className="Aleft dropdownSelectForm"
										defaultInputValue={row.direct_head}
									/>
								</FormGroup>
							</Col>

							<Col md={6}>
								<FormGroup>
									<Label>Department*</Label>
									<Input type="select" innerRef={(e) => this.department = e} name="department" defaultValue={row.department} className="dropdownSelectForm" required="required">
											{department.map(option => (
												<option key={option.value} value={option.value}>
													{option.label}
												</option>
											))}
									</Input>
								</FormGroup>
							</Col>
						</Row>
						
						<Row >
							<Col md={6}>
								<FormGroup>
									<label>Select Client*</label>
									<Select
										options={this.state.clients}
										value={selectedOptionClient}
										onChange={this.handleChangeClient}
										placeholder="Select Client"
										className="Aleft dropdownSelectForm"
										defaultInputValue={row.client}
									/>
								</FormGroup>
							</Col>

							<Col md={6}>
								<FormGroup>
									<Label>Handover Date*</Label>
									<Input innerRef={(e) => this.hand_over_date = e} type="date" defaultValue={row.hand_over_date} className="dropdownSelectForm" name="hand_over_date" required="required"/>
								</FormGroup>
							</Col>
						</Row>
						<Row >
							<Col md={6}>
								<FormGroup>
									<FormGroup>
										<Label>Email*</Label>
										<Input innerRef={(e) => this.email = e} type="email" name="email" defaultValue={row.email} placeholder="Enter Email" required="required"/>
									</FormGroup>
								</FormGroup>
							</Col>

							<Col md={6}>
								<FormGroup>
									<Label>Password</Label>
									<Input innerRef={(e) => this.password = e} type="text" name="password" />
								</FormGroup>
							</Col>
						</Row>
					<div className="modal-footer">
					<Button color="success">Save & Exit</Button>
					<Button color="secondary" onClick={this.toggle}>Cancel</Button>
					</div>
					</Form>
					</ModalBody>
				</Modal>
            </div>
        )
    }
}