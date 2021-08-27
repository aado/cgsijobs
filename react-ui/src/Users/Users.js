import React, { Component } from 'react';
// import axios from 'axios';
import Pusher from 'pusher-js';
import Select from 'react-select';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Modal, ModalHeader, ModalBody, Button, FormGroup, Label, Input, Row, Col, Form } from 'reactstrap';
import EditUsers from './EditUsers';
import EditRealUsers from './EditRealUsers';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

import app from "../base";

import './components/css/custom.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
// import CsvIcon from './components/csv.png';

const socket = new Pusher('223aca0f0c8175acf4b3', {
	cluster: 'ap1',
	encrypted: true
});

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

const customTotal = (from, to, size) => (
	<span className="react-bootstrap-table-pagination-total">
	  Showing { from } to { to } of { size } Results
	</span>
  );
  
  const options = {
	paginationSize: 4,
	pageStartIndex: 1,
	firstPageText: 'First',
	prePageText: 'Back',
	nextPageText: 'Next',
	lastPageText: 'Last',
	nextPageTitle: 'First page',
	prePageTitle: 'Pre page',
	firstPageTitle: 'Next page',
	lastPageTitle: 'Last page',
	showTotal: true,
	paginationTotalRenderer: customTotal,
	sizePerPageList: [{
		text: '5', value: 5
	},{
		text: '10', value: 10
	}, {
		text: '20', value: 20
	}, {
		text: '50', value: 50
	}, {
		text: '100', value: 100
	}]
  };

export default class Users extends Component {
	constructor(props) {
		super(props);

		this.state = {
			open: false,
			realUsers:[],
			roles:[],
			heads:[],
			clients:[],
			selectedOption: null,
			selectedOptionHead: null,
			selectedOptionRole: null,
			dataSet3:[],
			usersData:[],
			modal: false,
			text:'',
			messages: [],
			realtimeusers: []
		};
	}

	addNewUser(addUser) {
		app
		.database()
		.ref("users/")
		.push( addUser )
		this.setState({modal: false});
	}

	componentDidMount() {

		  // Initialize Firebase
		  this.getMessages();
		  this.getUsersRealtime();

		
	}

	getDataUsers() {
		fetch('http://13.229.172.162/vbpapi/users/allusers')
		.then(results => {
			return results.json();
		}).then(data => {
			this.setState({usersData:data});
		});
	}

	
	handleChange = (selectedOption) => {
		this.setState({ selectedOption });
	}

	handleChangeHead = (selectedOptionHead) => {
		this.setState({ selectedOptionHead });
	}

	handleChangeRole = (selectedOptionRole) => {
		this.setState({ selectedOptionRole });
	}

	editAction(cell, row, enumObject, rowIndex) {
		return (
			<EditUsers cell={cell} row={row} rowIndex={rowIndex} />
		);
	}

	editRealAction(cell, row, enumObject, rowIndex) {
		return (
			<EditRealUsers cell={cell} row={row} rowIndex={rowIndex} />
		);
	}

	getName(cell, row) {
		return (
			<span>{row.firstname} {row.lastname}</span>
		);
	}

	getRTName(cell, row) {
		return (
			<span>{row.firstname} {row.lastname}</span>
		);
	}

	toggle = () => {
		this.setState({
			modal: !this.state.modal
		});
	}

	onFormAddSubmit = (e) => {
		e.preventDefault();
		const role_select = this.state.selectedOptionRole;
		const head_select = this.state.selectedOptionHead;
		const client_select = this.state.selectedOption;
		const newUser = {
			firstname: this.firstname.value,
			lastname: this.lastname.value,
			access_type: this.access_type.value,
			role: role_select.label,
			direct_head: head_select.label,
			department: this.department.value,
			email: this.email.value,
			hand_over_date: this.hand_over_date.value,
			client: client_select.label,
		}
		this.addNewUser(newUser);
	}

	onSubmit = (event) => {
		if(event.charCode === 13 && this.state.text.trim() !== "") {
			this.writeMessageToDB(this.state.text);
			// console.log(this.state.text);
		}
	}

	getMessages = () => {
		const messageDB = app.database().ref("messages/")
		messageDB.on("value", snapshot => {
			let newMessages = []
			snapshot.forEach(child => {
				const message = child.val()
				newMessages.push({ id: child.key, text: message.text })
			})
			this.setState({ messages: newMessages})
		})
	}

	getUsersRealtime = () => {
		const vbpDB = app.database().ref("users/")
		vbpDB.on("value", snapshot => {
			let newUsers = []
			snapshot.forEach(child => {
				const user = child.val()
				newUsers.push({ 
					id: child.key, 
					firstname: user.firstname,
					lastname: user.lastname,
					access_type: user.access_type,
					role: user.role,
					direct_head: user.direct_head,
					department: user.department,
					email: user.email,
					hand_over_date: user.hand_over_date,
					client: user.client,
				})
			})
			this.setState({ realtimeusers: newUsers})
		})
	}


	writeMessageToDB = (message) => {
		app
		.database()
		.ref("messages/")
		.push( {
			text: message
		})
	}

	handleChange = (selectedOption) => {
		this.setState({ selectedOption });
	}

	renderMessages = () => {
		return this.state.messages.map(message => (
			<div key={message.id}>{message.text}</div>
		))
	}

	renderRealtimeUsers = () => {
		const columns = [{
			dataField: 'id',
			text: 'User Id',
			hidden: true
		  }, {
			dataField: 'firstname',
			text: 'Name',
			sort: true,
			formatter: this.getRTName
		  }, {
			dataField: 'access_type',
			text: 'Access Type',
			sort: true
		  }, {
			dataField: 'role',
			text: 'Role',
			sort: true
		  }, {
			dataField: 'direct_head',
			text: 'Direct Head',
			sort: true
		  }, {
			dataField: 'department',
			text: 'Department',
			sort: true
		  }, {
			dataField: 'email',
			text: 'Email',
			sort: true
		  }, {
			dataField: 'hand_over_date',
			text: 'Handover Date',
			sort: true
		  }, {
			dataField: 'client',
			text: 'Client',
			sort: true
		  }, {
			dataField: 'id',
			text: 'Action',
			formatter: this.editRealAction
		}];
		  
		const defaultSorted = [{
			dataField: 'firstname',
			order: 'asc'
		}];

		return (
			<BootstrapTable
				bootstrap4
				keyField="id"
				data={ this.state.realtimeusers }
				columns={ columns }
				defaultSorted={ defaultSorted } 
				pagination={ paginationFactory(options) }
				noDataIndication={ 'no results found' }
			/>
		)

	}

    render() {
		const { selectedOption, selectedOptionHead, selectedOptionRole } = this.state;
        return (
			<div>
				<Header />
				<div className="d-flex align-items-stretch">
				<Sidebar />
					<div className="page-content">
						<div className="page-header  no-margin-bottom Aleft">
							<div className="container-fluid">
								<div className="h5 no-margin-bottom">
									<h2>Users <Button color="success" onClick={this.toggle}><i className="fa fa-plus"></i> Add User</Button></h2>  
								</div>
							</div>
						</div><br />
						{/* {this.renderMessages()} */}
						<section className="no-padding-top">
							<div className="container-fluid">
								<div className="row Aleft">
									<div className='col-lg-12'>
									
										{/* <TextField
											id="standard-name"
											label="Type Your Message"
											placeholder="type something"
											value={this.state.name}
											onChange={e => this.setState({ text: e.target.value})}
											onKeyPress={this.onSubmit}
											fullWidth
										/> */}
										<div className="block margin-bottom-sm">

										{this.renderRealtimeUsers()}

										{/* <ToolkitProvider
											keyField="id"
											data={ this.state.usersData }
											columns={ columns }
											search
										>
											{
												props => (
												<div>
													<SearchBar { ...props.searchProps } className="selectSearchDropdown"/>
													<br />
													<BootstrapTable
													bootstrap4
													keyField="id"
													data={ this.state.usersData }
													columns={ columns }
													defaultSorted={ defaultSorted } 
													pagination={ paginationFactory(options) }
													filter={ filterFactory() }
													{ ...props.baseProps }
													></BootstrapTable>
													<div> */}
														{/* <CSVLink filename={"users.csv"} data={this.state.dataSet3} headers={headers}>
															<img src={CsvIcon} className="img-responsive avatar" alt="logo" className="imgExportCSV2"/>
														</CSVLink> */}
													{/* </div>
												</div>
												)
											}
										</ToolkitProvider> */}
										</div>
									</div>
								</div>
							</div>
						</section>
					</div>
				</div>
											
				<Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-lg container-fluid">
					<ModalHeader toggle={this.toggle}>Add User</ModalHeader>
					<ModalBody>
					<Form className="Aleft addUserForm container-fluid" onSubmit={this.onFormAddSubmit}>
						<Row >
							<Col md={6}>
								<FormGroup>
									<Label>Firstname*</Label>
									<Input innerRef={(e) => this.firstname = e} type="text" name="firstname" placeholder="Enter Firstname" required="required"/>
								</FormGroup>
							</Col>
							<Col md={6}>
								<FormGroup>
									<Label>Lastname*</Label>
									<Input innerRef={(e) => this.lastname = e} type="text" name="lastname" placeholder="Enter Lastname" required="required"/>
								</FormGroup>
							</Col>
						</Row>
						<Row >
							<Col md={6}>
								<FormGroup>
									<Label>Access Type*</Label>
									<Input type="select" innerRef={(e) => this.access_type = e} name="access_types" className="dropdownSelectForm" required="required">
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
									/>
								</FormGroup>
							</Col>

							<Col md={6}>
								<FormGroup>
									<Label>Department*</Label>
									<Input type="select" innerRef={(e) => this.department = e} name="department" className="dropdownSelectForm" required="required">
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
										value={selectedOption}
										onChange={this.handleChange}
										placeholder="Select Client"
										className="Aleft dropdownSelectForm"
										ref="client"
									/>
								</FormGroup>
							</Col>

							<Col md={6}>
								<FormGroup>
									<Label>Handover Date*</Label>
									<Input innerRef={(e) => this.hand_over_date = e} type="date" name="hand_over_date" required="required" className="dropdownSelectForm"/>
								</FormGroup>
							</Col>
						</Row>
						<Row >
							<Col md={6}>
								<FormGroup>
									<FormGroup>
										<Label>Email*</Label>
										<Input innerRef={(e) => this.email = e} type="email" name="email" placeholder="Enter Email" required="required"/>
									</FormGroup>
								</FormGroup>
							</Col>

							<Col md={6}>
								<FormGroup>
									<Label>Password</Label>
									<Input innerRef={(e) => this.password = e}  type="text" name="password"/>
									<Input type="hidden" name="_Token[fields]" onBlur = {(e) => this.password = e} autoComplete="off" value="---HASH---" />
								</FormGroup>
							</Col>
						</Row>
					<div className="modal-footer">
					<Button color="success" type="submit">Save & Exit</Button>
					<Button color="secondary" onClick={this.toggle}>Cancel</Button>
					</div>
					</Form>
					</ModalBody>
				</Modal>
			</div>
        );
    }
}