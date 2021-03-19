import { ObjectId } from 'mongodb';
import IDBModel, { generateHash, now } from './dbmodel';

export default interface IQuote extends IDBModel {
    content: string;
}

export const generateQuote = (): IQuote => {
    return {
        content: "",
        hash: generateHash(),
        _id: new ObjectId(),
        dateCreated: now()
    } as IQuote;
}