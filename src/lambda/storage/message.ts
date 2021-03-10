import IMessage from '../models/message';
import { InsertOneWriteOpResult, ObjectId } from 'mongodb';
import DBConnector from './connector';

export class Worker extends DBConnector {

    async add(message: IMessage): Promise<ObjectId> {
        try {

            if(DBConnector.db == null) return new ObjectId();

            const result: InsertOneWriteOpResult<IMessage> = await DBConnector.db
                .db()
                .collection('message')
                .insertOne(message);

            return result.ops[0]._id;

        } catch (err) {
            console.warn(err);
            process.exit(0);
        }
    }

}