import React from 'react';
import logo from '../img/logo.svg';
import linkedinPic from '../img/linkedin.svg';
import githubPic from '../img/github.svg';
import { IProps } from './homepage';

const Footer = ({state}: IProps) => (
    <div className="container mb-4 mb-md-5 pb-2 pb-md-0 footer">
        <div className="row line"></div>
        <div className="row">
            <div className="col">
                <a href="/">
                    <img src={logo} alt="logo" className="logo" />
                </a>
            </div>
            <div className="col-9 cta">
                <button type="button" className="btn btn-secondary btn-before btn-lock btn-contact">Platform 9 3/4</button>
                <a href={state.navLinks[0]} className="linkedin">
                    <img src={linkedinPic} alt="linkedin"/>
                </a>
                <a href={state.navLinks[1]} className="">
                    <img src={githubPic} alt="github"/>
                </a>
            </div>
        </div>
    </div>
);

export default Footer;