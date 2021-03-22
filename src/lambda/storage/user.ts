import IUser, { generateUser } from '../models/user';
import { Cursor, InsertOneWriteOpResult, ObjectId } from 'mongodb';
import DBConnector from './connector';

export class Worker extends DBConnector {

    async getByPhoneNumber(phoneNumber: string): Promise<IUser> {
        try {

            if(DBConnector.db == null) return generateUser();
            
            const result: IUser = await DBConnector.db
                .db()
                .collection('user')
                .findOne({ phoneNumber: phoneNumber });

            if (result === null) return generateUser();

            return result;

        } catch (err) {
            console.warn(err);
            process.exit(0);
        }
    }

    async getByHash(hash: string): Promise<IUser> {
        try {

            if(DBConnector.db == null) return generateUser();
            
            const result: IUser = await DBConnector.db
                .db()
                .collection('user')
                .findOne({ hash: hash });

            if (result === null) return generateUser();

            return result;

        } catch (err) {
            console.warn(err);
            process.exit(0);
        }
    }

    async getSubscribedUsers(): Promise<IUser[]> {
        try {

            if(DBConnector.db == null) return [];
            
            const result: Cursor<IUser> = await DBConnector.db
                .db()
                .collection('user')
                .find({ "unsubscribed": false });

            if (result === null) return [];

            const listUsers: IUser[] = await result.toArray();

            return listUsers;

        } catch (err) {
            console.warn(err);
            process.exit(0);
        }
    }

    async add(user: IUser): Promise<ObjectId> {
        try {

            if(DBConnector.db == null) return new ObjectId();

            const result: InsertOneWriteOpResult<IUser> = await DBConnector.db
                .db()
                .collection('user')
                .insertOne(user);

            return result.ops[0]._id;

        } catch (err) {
            console.warn(err);
            process.exit(0);
        }
    }

    async update(user: IUser): Promise<boolean> {
        try {

            if(DBConnector.db == null) return false;

            const result = await DBConnector.db
                .db()
                .collection('user')
                .updateOne({ _id: user._id }, { $set: user });

            return result.matchedCount > 0;
            
        } catch (err) {
            console.warn(err);
            process.exit(0);
        }
    }

}