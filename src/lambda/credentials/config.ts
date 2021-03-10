import dotenv from 'dotenv'
import ICredentials from "./interface";

const credentials = (env = (process.env as any)) => {
    
    dotenv.config();

    return {
        mongodb             : env.MONGODB_KEY,
        rebrandly_api       : env.REBRANDLY_API,
        twilio_accountSid   : env.TWILIO_ACCOUNTSID,
        twilio_authToken    : env.TWILIO_AUTHTOKEN,
        twilio_fromNumber   : env.TWILIO_FROMNUMBER,
        apilayer_api        : env.APILAYER_KEY,
        default_phoneNumber : env.DEFAULT_PHONENUMBER
    } as ICredentials

};

export default credentials;