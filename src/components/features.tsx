import React from 'react';
import { IProps } from './homepage';

const Features = ({ state }: IProps) => {
    
    const listFeatureItems: FeatureItem[] = [];

    state.featureItems.map((item, i) => listFeatureItems.push(new FeatureItem(item[0], item[1], item[2])))

    return (
        <div className="container features" id="features">
            <div className="row">
                {listFeatureItems.map((item, i) => (
                    <div className={i === 0 ? "col-12 col-md-6" : "col-12 col-md-6 mt-5 mt-md-auto"} key={i}>
                        <div className="feature-block">
                            <div className="row">
                                <img className="icon" src={item.logo} alt={"harry potter quote " + (i+1)} />
                            </div>
                            <div className="row">
                                <h3>{item.title}</h3>
                            </div>
                            <div className="row">
                                <p>{item.content}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

}

class FeatureItem {

    private _logo: string;
    private _title: string;
    private _content: string;

    constructor(_logo: string, _title: string, _content: string) {
        this._logo = _logo;
        this._title = _title;
        this._content = _content;
    }

    get logo(){
        return this._logo;
    }
    get title(){
        return this._title;
    }
    get content(){
        return this._content;
    }

}

export default Features;