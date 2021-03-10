import { unsubscribe } from '../controllers/userstories/unsubscribe';
import { now } from '../models/dbmodel';
import { getHeaders } from '../config/endpoint';

exports.handler = async (event: { queryStringParameters: { hash: string } }, context: any) => {
    
    const isUnsubscribe = await unsubscribe(event.queryStringParameters.hash);

    const result = { result: isUnsubscribe, date: now() };

    return { statusCode: 200, headers: getHeaders(), body: JSON.stringify(result) };

};