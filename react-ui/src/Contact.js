import React from "react";
import Header from './components/Header';
import Footer from './components/Footer';
import PortfolioContact from "./PortfolioContact";

const Contact = () => {
    return (
      <div>
      <Header pageName="Contact" activePage="active"/>
        <PortfolioContact/>
      <Footer />
      </div>
    )
}

export default Contact;