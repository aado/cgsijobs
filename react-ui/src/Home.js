import React from "react";
import Header from './components/Header';
// import Footer from './components/Footer';
import PortfolioContent from './PortfolioContent';
import './App.css';

const Home = () => {
    return (
        <div>
            <Header/>
                <PortfolioContent />
            {/* <Footer /> */}
        </div>
    )
}

export default Home;