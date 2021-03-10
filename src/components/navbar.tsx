import { Component } from 'react';
import logo from '../img/logo.svg';
import { IProps } from './homepage';
 
class Navbar extends Component<IProps> {

    render() {

        // const listMenuItems: MenuItem[] = [];
        // (this.props.state.menuItems).map(item => listMenuItems.push(new MenuItem(item[0], item[1])));

        return (
            <div className="container topbar">
                <div className="row topbar-content">
                    <div className="col-3 align-self-center ps-3 logo">
                        <a href="/">
                            <img src={logo} alt="logo"/>
                        </a>
                    </div>
                    {/* <div className="col-9 col-lg-6 links">
                        <ul className="list-group list-group-horizontal justify-content-end justify-content-lg-center">
                            {listMenuItems.map((menuItem, i) => {
                                return (
                                    <li className="list-group-item pe-0 pe-lg-3" key={i}>
                                        <button type="button" onClick={menuItem.goTo} className="btn btn-link pe-0 pe-lg-3 ps-0 ps-lg-3">{menuItem.title}</button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div> */}
                    <div className="col position-relative cta">
                        <button type="button" className="btn btn-secondary btn-before btn-lock btn-contact position-absolute end-0">Platform 9 3/4</button>
                    </div>
                </div>
            </div>
        );

    };

}

export default Navbar;

// class MenuItem {

//     DEFAULT_OFFSET_SCROLL: number = -100;
    
//     private _title: string;
//     private _link: string;

//     constructor(_title: string, _link: string){
//         this._title = _title;
//         this._link = _link;
//     }

//     goTo = () => {
//         const targetElement = document.querySelector(this._link) as HTMLElement;
//         const position = targetElement.getBoundingClientRect().top + window.pageYOffset + this.DEFAULT_OFFSET_SCROLL;
//         window.scroll({ top: position, behavior: 'smooth' });
//     };

//     public get title(): string{
//         return this._title;
//     }
//     public get link(): string{
//         return this._link;
//     }

// }