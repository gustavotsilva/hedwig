import React from 'react';

/* Components */
import Navbar from './navbar';
import HeaderContent from './header-content';
import { BannerUnsubscribed } from './unsubscribe-banner';

/* Interfaces */
import { IProps } from './homepage';

const Header = ({state}: IProps) => (
  <React.Fragment>
    <BannerUnsubscribed state={state}/>
    <div className="container-fluid header d-inline-block pt-3 pt-md-4">
      <Navbar state={state}/>
      <HeaderContent state={state}/>
    </div>
  </React.Fragment>
);

export default Header;
