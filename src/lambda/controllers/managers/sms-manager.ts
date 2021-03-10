import twilio from 'twilio';
import { MessageInstance } from 'twilio/lib/rest/api/v2010/account/message';
import IMessage from '../../models/message';
import axios, { AxiosRequestConfig } from 'axios';
import credentials from '../../credentials/config';

export const sendSMS = async (message: IMessage, testPhoneValidity = true): Promise<boolean> => {

    //Check phone number validity
    if(testPhoneValidity){
        const isValid = await validatePhoneNumber(message.phoneNumber);
        if(!isValid) return false;
    }

    const { twilio_accountSid, twilio_authToken, twilio_fromNumber } = credentials();

    const client = twilio(twilio_accountSid, twilio_authToken);

    try {

        const messageReturn: MessageInstance = await client.messages.create({
            body        : message.content,
            mediaUrl    : message.listIllustration,
            to          : message.phoneNumber,
            from        : twilio_fromNumber,
        });

        return messageReturn.sid !== undefined && messageReturn.sid !== '';

    } catch(e){}

    return false;

};

const validatePhoneNumber = async (phonenumber: string): Promise<boolean> => {

    const config: AxiosRequestConfig = {
        method: 'get',
        url: `http://apilayer.net/api/validate?access_key=${credentials().apilayer_api}&number=${phonenumber}&format=1`
    };

    const response = await axios(config);
    return response.data.valid;

};