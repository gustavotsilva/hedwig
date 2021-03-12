import React from 'react';
import imageDark from '../img/posts-lg-dark.png';
import harryIcon from '../img/harry-icon.svg';

const AnimatedImage = () => (
    <div className="container image-animated perspective">
        <img src={imageDark} alt="" className="background" />
        <div className="content">
            <div className="row">
                <img src={harryIcon} alt="harry icon" />
            </div>
            <div className="row mt-3 mb-2">
                <h2>Get your post <span className="d-block d-md-inline-block font-blue">every day</span></h2>
            </div>
            <p className="light">
                Shhh... don't let Uncle Vernon know.
                Maybe one of them it's from Hogwarts. Who knows?
            </p>
        </div>
    </div>
);

export default AnimatedImage;