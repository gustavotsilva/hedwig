import React from 'react';
import { IProps } from './homepage';

const Pricing = ({ state }: IProps) => {
    
    const listPricingItems: PricingItem[] = [];

    state.pricingItems.map((item, i) => listPricingItems.push(new PricingItem(
        item[0] as string, item[1] as string, item[2] as string, item[3] as string, item[4] as string, item[5] as string[]
    )));

    return (
        <div className="container pricing" id="pricing">
            <div className="row">
                {listPricingItems.map((item, i) => (
                    <div className={item.getClasses(i)} key={i}>
                        <div className="row">
                            <h4>{item.name}</h4>
                        </div>
                        <div className="row">
                            <p className="small">{item.description}</p>
                        </div>
                        <div className="amount">
                            <p className="currency">{item.currency}</p>
                            <p className="figure">{item.amount}</p>
                            <p className="period">{item.period}</p>
                        </div>
                        <div className="row">
                            <button className="btn btn-info align-self-center signup-btn">Sign up</button>
                        </div>
                        <div className="row grey-line"></div>
                        <div className="row">
                            <ul>
                                {item.features.map((item, i) => (<li key={i} dangerouslySetInnerHTML={{
                                    __html: item
                                }}></li>))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

}

class PricingItem {

    private _name: string;
    private _description: string;
    private _currency: string;
    private _amount: string;
    private _period: string;
    private _features: string[];

    constructor(_name: string, _description: string, _currency: string, _amount: string, _period: string, _features: string[]){
        this._name = _name;
        this._description = _description;
        this._currency = _currency;
        this._amount = _amount;
        this._period = _period;
        this._features = _features;
    }

    getClasses(position: number){
        const base = 'col-12 col-md-4 column';
        switch(position){
            case 0: return base + ' first';
            case 1: return base;
            case 2: return base + ' last';
        }
    }

    get name(){
        return this._name;
    }
    get description(){
        return this._description;
    }
    get currency(){
        return this._currency;
    }
    get amount(){
        return this._amount;
    }
    get period(){
        return this._period;
    }
    get features(){
        return this._features;
    }

}

export default Pricing;