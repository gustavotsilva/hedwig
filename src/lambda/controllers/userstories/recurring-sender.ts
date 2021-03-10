import IUser from '../../models/user';
import { Worker as DBUser } from '../../storage/user';
import { sendRandomSMS } from '../managers/sender-manager';

export const sendBatchMessages = async (): Promise<boolean> => {

    //Only send messages on Tuesdays and Fridays
    //const isDayToSendMessages = (dayOfWeek = new Date().getDay()) => (dayOfWeek !== 2 && dayOfWeek !== 5);

    //if(!isDayToSendMessages()) return false;

    const dbUser = new DBUser();

    await dbUser.openConnection();

    //Get all users that are not unsubscribed
    const listSubscribed: IUser[] = await dbUser.getSubscribedUsers();

    //Send random SMS to all of them
    await Promise.all(listSubscribed.map(async (user) => await sendRandomSMS(user)));

    await dbUser.closeConnection();

    return true;

}