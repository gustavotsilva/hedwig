import React from 'react';
import masterImage from '../img/posts-lg.png';

const MasterImage = () => (
    <div className="container mainimage perspective" id="mainimage">
        <img src={masterImage} id="main-image" alt="posts example" />
    </div>
);

export default MasterImage;