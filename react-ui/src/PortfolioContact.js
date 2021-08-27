import React, { Component } from "react";
import app from "./base";


export default class PortfolioContact extends Component {

    
constructor(props) {
    super(props);

    this.state = {
        text:'',
        messages: [],
        loading: true
    };
}

componentDidMount() {
    // Initialize Firebase
    this.getMessages();
}

renderMessages = () => {
    return this.state.messages.map(message => (  
        <div className="balon1 p-2 m-0 position-relative" data-is={message.email+' - '+message.date} key={message.id}>
            <a> {message.text} </a>
        </div> 
    ))
}

writeMessageToDB = (message) => {
    app
    .database()
    .ref("messages/")
    .push( {
        text: message,
        email: app.auth().currentUser.email,
        date: Date()
    })
}

getMessages = () => {
    const messageDB = app.database().ref("messages/")
    messageDB.on("value", snapshot => {
        let newMessages = []
        snapshot.forEach(child => {
            const message = child.val()
            newMessages.push({ id: child.key, text: message.text, email: message.email, date: message.date })
        })
        this.setState({ messages: newMessages, loading: false})
    })
}

onFormAddSubmit = (e) => {
    if(e.charCode === 13 && this.state.text.trim() !== "") {
        this.writeMessageToDB(this.state.text);
        this.setState({text:''})
        document.getElementById('message').value = ''
    }
}

render() {
    const { loading } = this.state;

    if (loading) {
        return <p>Loading..</p>;
    }

    return (
        
        <div className="container">

        <section id="contact">
			<div className="section-content">
				<h1 className="section-header titlePage">Get in <span className="content-header wow fadeIn " data-wow-delay="0.2s" data-wow-duration="2s"> Touch with me</span></h1>
			</div>
			<div className="contact-section">
			<div className="container">
			  		<div className="col-md-12">
			  			<div className="form-group">
			  				<label htmlFor ="description"> Message Me</label>
			  			 	<input  className="form-control" id="message" onChange={ e => this.setState({ text: e.target.value })} value={this.state.name} onKeyPress={this.onFormAddSubmit} placeholder="Enter Your Message" />
			  			</div>
					</div>
			</div>
            </div>
            <br/>
            <div className="jumbotron m-0 p-0 bg-transparent">
                <div className="row m-0 p-0 position-relative">
                    <div className="col-12 p-0 m-0 position-absolute">

                        <div className="bg-sohbet border-0 m-0 p-0 ChatContatainer">
                            <div id="sohbet" className="card border-0 m-0 p-0 position-relative bg-transparent ContentChat">
                                {this.renderMessages()}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
		</section>
        </div>
    )
}
}