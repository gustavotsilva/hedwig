import { Component, Fragment } from "react";
import { IPropsSMSForm } from './homepage';

class SMSForm extends Component<IPropsSMSForm> {

    render() {

        const visibilitySuccessMessage  = this.props.state.visibilityMessageSent === 1 ? "show" : "";
        const visibilityErrorMessage    = this.props.state.visibilityMessageSent === 2 ? "show" : "";

        const idForm = this.props.idForm;

        const countryCode           = this.props.state.selectedCountryCode.content + " ";
        const countryPlaceholder    = this.props.state.selectedCountryCode.placeholder;
        const formattedPlaceholder  = this.props.state.isMobileDisplay ? countryCode + countryPlaceholder : countryPlaceholder;

        return (
            <Fragment>
                <div className="row form">
                    <div className="col col-7 col-md-8">
                        <div className="row phone-container">
                            <div className="col-2 d-none d-md-block country-container">
                                <div className="row h-100">
                                    <div className="col align-self-center">
                                        <img className="flag-img" src={(this.props.state.selectedCountryCode.flag)} alt="" />
                                    </div>
                                    <div className="col">
                                        <div className="dropdown">
                                            <button className="btn dropdown-toggle" type="button" id="dropdownPhoneCode"
                                                data-bs-toggle="dropdown" aria-expanded="false">
                                                {(countryCode)}
                                            </button>
                                            <ul className="dropdown-menu" aria-labelledby="dropdownPhoneCode">
                                                {this.props.state.listCountryCodes.map(countryCode => (
                                                    <li key={countryCode.code}>
                                                        <button className="dropdown-item" type="button" onClick={() => this.props.state.changeCountryCode(countryCode)}>{countryCode.code}</button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <input className="col phonenumber" placeholder={formattedPlaceholder} onFocus={clearPhoneInput} type="tel" />
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <button type="button" className="btn btn-primary d-none d-md-block" onClick={() => this.props.state.sendSMSTrial(idForm)}>Expecto Patronum</button>
                        <button type="button" className="btn btn-primary d-md-none" onClick={() => this.props.state.sendSMSTrial(idForm)}>Alohomora</button>
                    </div>
                </div>
                <div className="row mt-3">
                    <p className="w-100 free-disclaimer">Proudly free and open source ❤️</p>
                </div>
                <div className="row mt-3">
                    {<p className={`message success ${visibilitySuccessMessage}`}>You should get your message in the next few seconds!</p>}
                    {<p className={`message error ${visibilityErrorMessage}`}>We haven't managed to reach you. Perhaps you could confirm your number?</p>}
                </div>
            </Fragment>
        );

    }

}

export default SMSForm;

const clearPhoneInput = () => {
    (document.querySelectorAll(".phonenumber") as NodeListOf<HTMLInputElement>).forEach(element => {
        element.value = ""
    });
};