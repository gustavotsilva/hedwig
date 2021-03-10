import React, { Component } from 'react';

/* Components */
import Header from './header';
import MasterImage from './master-image';
import AnimatedImage from './animated-image';
import Features from './features';
import LastCTA from './last-cta';
import Footer from './footer';

/* State */
import IndexState, { isMobileSize, IState } from '../js/index-state';

export class HomePage extends Component {

    indexState: IndexState;
    state: IState;

    constructor(props: {} | Readonly<{}>){
        super(props);
        this.indexState = new IndexState(this);
        this.state = this.indexState.getState();
    }

    render(){
        return (
            <React.StrictMode>
                <Header state={this.state}/>
                <MasterImage />
                <AnimatedImage />
                <Features state={this.state}/>
                {/* <Pricing state={this.state}/> */}
                <LastCTA state={this.state}/>
                <Footer state={this.state}/>
            </React.StrictMode>
        );
    }

    resize() {
        const currentDisplay = isMobileSize();
        if(this.state.isMobileDisplay === currentDisplay) return;
        this.setState({isMobileDisplay: currentDisplay});
    }

    componentDidMount() {
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
    }
    
    componentWillUnmount() {
        window.removeEventListener("resize", this.resize.bind(this));
    }

}

export default HomePage;

export interface IProps { state: IState }
export interface IPropsSMSForm { state: IState; idForm: number; }