import { ObjectId } from 'mongodb';
import IDBModel, { generateHash, now } from './dbmodel';

export default interface IMessage extends IDBModel {
    hashUser: string;
    phoneNumber: string;
    content: string;
    date: string;
    isSent: boolean;
    listIllustration: string[];
}

export const generateMessage = (): IMessage => {
    return {
        hashUser: "",
        phoneNumber: "",
        content: "",
        date: now(),
        isSent: true,
        listIllustration: [],
        hash: generateHash(),
        _id: new ObjectId()
    } as IMessage;
};