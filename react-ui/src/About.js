import React from "react";
import Header from './components/Header';
import Footer from './components/Footer';
import PortfolioAbout from "./PortfolioAbout";

const About = () => {
    return (
        <div>
            <Header pageName="About" activePage="active"/>
				<PortfolioAbout/>
			<Footer />
        </div>
    )
}

export default About;