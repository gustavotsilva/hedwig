import React, { Component } from 'react';
import { IProps } from './homepage';
import SMSForm from './sms-form';

class HeaderContent extends Component<IProps> {

    render(){
        return (
            <div className="container content mt-5 pt-3">
                <div className="row">
                    <h1>Your small piece of <span className="font-blue">magic</span> every <span className="font-blue">week</span></h1>
                </div>
                <div className="row mt-3 mt-lg-4 mb-4 mb-lg-4 pb-2 pb-lg-3">
                    <p>One remarkable quote and three amazing illustrations by SMS</p>
                </div>
                <SMSForm state={this.props.state} idForm={0}/>
            </div>
        )
    }

}

export default HeaderContent;