import { MongoClient } from 'mongodb';
import credentials from '../credentials/config';

export default abstract class DBConnector {

    static db: MongoClient | null;
    static openedConnections = 0;
    
    constructor(){
        if(DBConnector.db === undefined || DBConnector.db === null) {
            DBConnector.db = new MongoClient(credentials().mongodb, { useNewUrlParser: true, useUnifiedTopology: true});   
        }
    }
    
    async openConnection(): Promise<void> {

        DBConnector.openedConnections++;

        if(DBConnector.openedConnections === 1) await ((DBConnector.db) as MongoClient).connect();

    }
    async closeConnection(): Promise<void>{

        DBConnector.openedConnections--;

        if(DBConnector.openedConnections === 0) {
            await ((DBConnector.db) as MongoClient).close();
            DBConnector.db = null;
        }
        
    }
    
}