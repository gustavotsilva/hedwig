import { ObjectId } from 'mongodb';
import IDBModel, { generateHash, now } from './dbmodel';

export default interface IUser extends IDBModel {
    phoneNumber: string;
    unsubscribed: boolean;
}

export const generateUser = (): IUser => {
    return {
        phoneNumber: "",
        unsubscribed: false,
        hash: generateHash(),
        _id: new ObjectId(),
        dateCreated: now()
    } as IUser;
};