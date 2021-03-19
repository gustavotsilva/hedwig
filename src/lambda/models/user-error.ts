import { ObjectId } from 'mongodb';
import IDBModel, { generateHash, now } from './dbmodel';

export default interface IUserError extends IDBModel {
    phoneNumber: string;
}

export const generateUserError = (phoneNumber = ""): IUserError => {
    return {
        phoneNumber: phoneNumber,
        hash: generateHash(),
        _id: new ObjectId(),
        dateCreated: now()
    } as IUserError;
}