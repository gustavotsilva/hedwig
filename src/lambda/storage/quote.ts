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

            const length = await result.count();

            if (length === 0) return null;

            let randomQuote: IQuote | null = null;
            let index = 0;

            const randomIndex = Math.floor((Math.random() * 1000000) % length);

            await result.forEach(quote => {
                if(index === randomIndex) randomQuote = quote;
                index++;
            });

            return randomQuote;

        } catch (err) {
            console.warn(err);
            process.exit(0);
        }
    }

}