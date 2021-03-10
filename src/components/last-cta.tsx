import React, { Component } from 'react';
import { IProps } from './homepage';
import SMSForm from './sms-form';

class LastCTA extends Component<IProps>  {

    render() {
        return (
            <div className="container lastcta">
                <div className="row">
                    <h1>It does not do well to dwell on dreams and <span className="font-blue d-block">forget to live</span></h1>
                </div>
                <div className="row mt-2 mb-5 subtitle">
                    <p>Albus Dumbledore, Harry Potter and the Sorcerer's Stone</p>
                </div>
                <SMSForm state={this.props.state} idForm={1}/>
            </div>
        );
    }

}

export default LastCTA;