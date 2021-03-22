import IQuote from '../models/quote';
import { Cursor } from 'mongodb';
import DBConnector from './connector';

export class Worker extends DBConnector {

    async getRandom(): Promise<IQuote | null> {
        try {

            if(DBConnector.db == null) return null;
            
            const result: Cursor<IQuote> = await DBConnector.db
                .db()
                .collection('quote')
                .find({});

            const listQuotes: IQuote[] = await result.toArray();

            const length = listQuotes.length;

            if (length === 0) return null;

            const randomIndex = Math.floor((Math.random() * 1000000) % length);

            const randomQuote = listQuotes[randomIndex];

            return randomQuote;

        } catch (err) {
            console.warn(err);
            process.exit(0);
        }
    }

}