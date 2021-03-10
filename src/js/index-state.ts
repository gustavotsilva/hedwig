import axios, { AxiosRequestConfig } from 'axios';
import { clickSendSMS } from '../analytics/gtm';

/* Assets */
import featureLogo1 from '../img/feature-1.png';
import featureLogo2 from '../img/feature-2.png';
import flagUS from '../img/flag-us.svg';
import flagUK from '../img/flag-uk.svg';
import flagBR from '../img/flag-br.svg';
import flagOthers from '../img/flag-others.svg';
import { HomePage } from '../components/homepage';

// const API_DOMAIN = "http://localhost:9000"; //Development
const API_DOMAIN = "https://hedwig.app"; //Production

export default class IndexState {

    component: HomePage;
    currency = '$';

    constructor(component: HomePage){
       this.component = component;
    }

    getState = () => {

        return {
            /* Variables */
            navLinks: ["https://www.linkedin.com/in/gustavotoledosilva", "https://github.com/gustavotsilva/hedwig"],
            listCountryCodes: [
                {code: "+1"     , flag: flagUS      , content: "+1"     , placeholder: "541-754-3010"}, 
                {code: "+44"    , flag: flagUK      , content: "+44"    , placeholder: "7911-123456"},
                {code: "+55"    , flag: flagBR      , content: "+55"    , placeholder: "011-91234-5678"},
                {code: "Others" , flag: flagOthers  , content: "+"      , placeholder: "1234-5678"}
            ],
            selectedCountryCode: {
                code: "+1",
                flag: flagUS,
                content: "+1",
                placeholder: "541-754-3010"
            },
            visibilityMessageSent: 0,
            isMobileDisplay: isMobileSize(),
            isUnsubscribedLink: unsubscribe(),
            // menuItems: [
            //     ['Example', '#mainimage'],
            //     ['Features', '#features'],
            //     ['Pricing', '#pricing']
            // ],
            featureItems: [
                [featureLogo1, 'Share your passion', 'All illustrations are sent ready to be posted on your favourite social channel.'],
                [featureLogo2, 'Creative minds', 'The best pieces of art you can find. Carefully curated from Behance.']
            ],
            pricingItems: [
                ['Monthly', 'Digital membership', this.currency, '2', '/ per month', [
                    'Movie\'s quotes',
                    'Curated illustrations',
                    'Sent by SMS and E-mail',
                    'Cancel at anytime'
                ]],
                ['12 months', 'Digital membership', this.currency, '4', '/ per year', [
                    'Movie\'s quotes',
                    'Curated illustrations',
                    'Sent by SMS and E-mail',
                    'Cancel at anytime'
                ]],
                ['Vinyl Stickers', '12 illustrations', this.currency, '10', '/ per pack', [
                    'Premium personalised stickers',
                    'Extra permanent',
                    'Waterproof',
                    'Shipping to the <b>UK only</b> (beta)'
                ]]
            ],

            /* Functions */
            changeCountryCode: (countryCode: ICountryCode): void => {
                this.component.setState(state => ({
                    selectedCountryCode: countryCode
                }));
            },
            sendSMSTrial: async (idPhoneElement: number) => {

                clickSendSMS();

                const inputElement = document.querySelectorAll(".phonenumber")[idPhoneElement] as HTMLInputElement;

                const setInputError = (isError: boolean) => isError ? inputElement.classList.add("error") : inputElement.classList.remove("error");
   
                if(inputElement.value.trim() === ""){ setInputError(true); return; }
            
                setInputError(false);

                const countryCode = !this.component.state.isMobileDisplay ? this.component.state.selectedCountryCode.content : "";
            
                const isSent = await sendSMSEndpoint(countryCode, inputElement.value);

                setupVisibilityElement(this.component, isSent ? 1 : 2, this.component.state.visibilityMessageSent);

                setTimeout(() => (setupVisibilityElement(this.component, 0, isSent ? 1 : 2)), 5000);
            
            }
        }
    };

}

export interface ICountryCode {
    code: string;
    flag: string;
    content: string;
    placeholder: string;
}

export interface IState {
    navLinks: string[];
    selectedCountryCode: ICountryCode;
    listCountryCodes: ICountryCode[];
    visibilityMessageSent: number;
    isMobileDisplay: boolean;
    isUnsubscribedLink: boolean;
    featureItems: string[][];
    pricingItems: (string | string[])[][];
    changeCountryCode(countryCode: ICountryCode): void;
    sendSMSTrial(idPhoneElement: number): void;
}

const sendSMSEndpoint = async (countryCode: string, phoneNumber: string): Promise<boolean> => {

    const phoneNumberFormatted = phoneNumber.trim().replaceAll("-", "").replaceAll(" ", "");

    const urlEndpoint = API_DOMAIN + '/.netlify/functions/signup?phoneNumber=' + encodeURIComponent(countryCode + phoneNumberFormatted);

    const config: AxiosRequestConfig = { method: 'get', url: urlEndpoint };

    try { return ((await axios(config)).data as {result: boolean}).result; } catch(e){}

    return false;

}

const setupVisibilityElement = (component: HomePage, visibilityType: number, previousVisibilityType: number) => {
    if(component.state.visibilityMessageSent === previousVisibilityType) component.setState(state => ({ visibilityMessageSent: visibilityType }));
}

export const isMobileSize = () => window.innerWidth <= 760;

export const unsubscribe = (): boolean => {

    const hashUser: string | null = (new URLSearchParams(window.location.search)).get('hash');

    if(hashUser === null) return false;

    const urlEndpoint = API_DOMAIN + '/.netlify/functions/unsubscribe?hash=' + hashUser;

    const config: AxiosRequestConfig = { method: 'post', url: urlEndpoint };

    (axios(config)).then(response => console.log("Unsubscribed: " + (response.data as {result: boolean}).result));

    const clearParamsUrl = () => window.history.replaceState(null, "", window.location.href.split("?")[0]);

    clearParamsUrl();

    return true;

}