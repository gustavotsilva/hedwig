import { sendBatchMessages } from '../controllers/userstories/recurring-sender';
import { now } from '../models/dbmodel';
import { getHeaders } from '../config/endpoint';

exports.handler = async (event: any, context: any) => {
    
    const isMessagesSent = await sendBatchMessages();

    const result = { result: isMessagesSent, date: now() };

    return { statusCode: 200, headers: getHeaders(), body: JSON.stringify(result) };

};