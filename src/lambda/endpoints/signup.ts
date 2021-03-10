import { sendTrialSMS } from '../controllers/userstories/signup';
import { now } from '../models/dbmodel';
import { getHeaders } from '../config/endpoint';
import credentials from '../credentials/config';

exports.handler = async (event: { queryStringParameters: { phoneNumber: string } }, context: any) => {
    
    const phoneNumber = event.queryStringParameters.phoneNumber || credentials().default_phoneNumber;

    const isSent = await sendTrialSMS(phoneNumber);

    const result = { result: isSent, to: phoneNumber, date: now() };

    return { statusCode: 200, headers: getHeaders(), body: JSON.stringify(result) };

};