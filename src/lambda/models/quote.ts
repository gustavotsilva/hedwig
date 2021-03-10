import { ObjectId } from 'mongodb';
import IDBModel, { generateHash } from './dbmodel';

export default interface IQuote extends IDBModel {
    content: string;
}

export const generateQuote = (): IQuote => {
    return {
        content: "",
        hash: generateHash(),
        _id: new ObjectId()
    } as IQuote;
}