import React from "react";
import devimages from './images/developer.jpg';
import './App.css';

const PortfolioAbout = () => {
    return (
        <div className="container">
            <h1 class="titlePage">About Developer</h1>
            <div className="row" style={{'paddingLeft': '20%'}}>
                <img src={devimages} alt="developer" style={{height: '300px'}}/>&nbsp;
                <div className="col-sm-4 social-buttons">
                    <h1 className="text-primary" style={{'fontFamily': 'Impact, Charcoal, sans-serif' }}>ALVIN P. ADO</h1>
                    <a className="btn btn-block btn-social btn-facebook btn-primary" style={{ color: 'black' }} href="https://www.facebook.com/vinzadz1987">
                        <span className="fa fa-facebook"></span> Facebook
                    </a>
                    <a className="btn btn-block btn-social btn-linkein btn-info" style={{ color: 'black' }} href="https://www.linkedin.com/in/alvin-ado-714200133/">
                        <span className="fa fa-linkedin"></span> Linkedin
                    </a>
                    <a className="btn btn-block btn-social btn-facebook btn-danger" style={{ color: 'black' }} href="https://plus.google.com/u/1/+AlvinAdo">
                        <span className="fa fa-facebook"></span> Goggle
                    </a>
                    <a className="btn btn-block btn-social btn-facebook btn-success" style={{ color: 'black' }} href="https://docs.google.com/document/d/1Gs426btN8lI_A0mf2y98ivb9cdg4o6XSGXDwh0ksLxM/edit?usp=sharing">
                        <i className="fa fa-file-pdf-o" aria-hidden="true"></i> Resume
                    </a>
                </div>
            </div>
        </div>
    )
}
export default PortfolioAbout;