import { ObjectId } from 'mongodb';
import DBConnector from './connector';
import IUserError from '../models/user-error';
import { InsertOneWriteOpResult } from 'mongodb';

export class Worker extends DBConnector {

    async add(userError: IUserError): Promise<ObjectId> {
        try {

            if(DBConnector.db == null) return new ObjectId();

            const result: InsertOneWriteOpResult<IUserError> = await DBConnector.db
                .db()
                .collection('user_error')
                .insertOne(userError);

            return result.ops[0]._id;

        } catch (err) {
            console.warn(err);
            process.exit(0);
        }
    }

}