import IUser from '../../models/user';
import { Worker as DBUser } from '../../storage/user';
import { sendRandomSMS } from '../managers/sender-manager';

export const sendTrialSMS = async (phoneNumber: string): Promise<boolean> => {
    
    const dbUser = new DBUser();

    await dbUser.openConnection();

    //Get user from database if exists
    const user: IUser = await dbUser.getByPhoneNumber(phoneNumber);

    const isNewUser = user.phoneNumber === "";

    user.phoneNumber = phoneNumber;

    //Send SMS and log it on database if successfully
    const message = await sendRandomSMS(user, isNewUser);

    if(!message.isSent) return false;

    //Save user on database
    if(isNewUser) user._id =    await dbUser.add(user);
    else                        await dbUser.update(user);

    dbUser.closeConnection();

    return true;

}