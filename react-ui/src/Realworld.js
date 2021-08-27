import React, { Component } from "react";
import Header from './components/Header';
import Footer from './components/Footer';
import app from "./base";


export default class Realworld extends Component {

    
constructor(props) {
    super(props);

    this.state = {
        text:'',
        messages: [],
    };
}

componentDidMount() {
    // Initialize Firebase
    this.getMessages();
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

renderMessages = () => {
    return this.state.messages.map(message => (
        <div key={message.id}>{message.text}</div>
    ))
}

writeMessageToDB = (message) => {
    app
    .database()
    .ref("messages/")
    .push( {
        text: message
    })
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

onFormAddSubmit = (e) => {
    e.preventDefault();
    console.log(this.name.value);
    // const newUser = {
    //     firstname: this.firstname.value,
    //     lastname: this.lastname.value,
    //     access_type: this.access_type.value,
    //     role: role_select.label,
    //     direct_head: head_select.label,
    //     department: this.department.value,
    //     email: this.email.value,
    //     hand_over_date: this.hand_over_date.value,
    //     client: client_select.label,
    // }
    // this.addNewUser(newUser);
}

render() {
// const PortfolioContact = () => {
    return (
        <div>
            <Header/>
                Test
            <Footer/>
        </div>
        // <div className="container" style={{marginTop: '80px'}}>

        // <section id="contact">
		// 	<div className="section-content">
		// 		<h1 className="section-header">Get in <span className="content-header wow fadeIn " data-wow-delay="0.2s" data-wow-duration="2s"> Touch with us</span></h1>
		// 		<h3>Contact us</h3>
		// 	</div>
		// 	<div className="contact-section">
		// 	<div className="container">
		// 		<form onSubmit={this.onFormAddSubmit}>
		// 			<div className="col-md-6 form-line">
		// 	  			<div className="form-group">
		// 	  				<label htmlFor="exampleInputUsername">Your name</label>
		// 			    	<input type="text" ref={(e) => this.name = e} name="name" className="form-control" id="" placeholder=" Enter Name" />
		// 		  		</div>
		// 		  		<div className="form-group">
		// 			    	<label htmlFor="exampleInputEmail">Email Address</label>
		// 			    	<input type="email" ref={(e) => this.email = e} name="email" className="form-control" id="exampleInputEmail" placeholder=" Enter Email id" />
		// 			  	</div>	
		// 			  	<div className="form-group">
		// 			    	<label htmlFor="telephone">Mobile No.</label>
		// 			    	<input type="tel" className="form-control" ref={(e) => this.mobile = e} name="mobile" id="telephone" placeholder=" Enter 10-digit mobile no." />
		// 	  			</div>
		// 	  		</div>
		// 	  		<div className="col-md-6">
		// 	  			<div className="form-group">
		// 	  				<label htmlFor ="description"> Message</label>
		// 	  			 	<textarea  className="form-control" ref={(e) => this.message = e} name="message" id="description" placeholder="Enter Your Message"></textarea>
		// 	  			</div>
		// 	  			<div>

		// 	  				<button type="submit" className="btn btn-default submit" style={{marginRight: '20px'}}><i className="fa fa-paper-plane" aria-hidden="true"></i>  Send Message</button>
		// 	  			</div>
			  			
		// 			</div>
		// 		</form>
		// 	</div>
        //     </div>
		// </section>
        // </div>
    )
}
}

// export default PortfolioContact;