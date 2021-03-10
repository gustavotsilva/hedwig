import { ObjectId } from 'mongodb';

export default interface IDBModel {
    _id: ObjectId;
    hash: string;
}

export const generateHash = (length = 50): string => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) result += characters.charAt(Math.floor(Math.random() * charactersLength));
    return result;
}

export const now = (): string => {
    return (new Date()).toISOString();
}