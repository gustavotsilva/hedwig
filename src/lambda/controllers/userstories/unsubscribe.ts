import IUser from '../../models/user';
import { Worker as DBUser } from '../../storage/user';

export const unsubscribe = async (hash: string): Promise<boolean> => {

    const dbUser = new DBUser();

    await dbUser.openConnection();

    const user: IUser = await dbUser.getByHash(hash);

    //Could not find the user
    if(user.phoneNumber === "") return false;

    user.unsubscribed = true;

    //Unsubscribe on database
    const isSubscribed = await dbUser.update(user);

    await dbUser.closeConnection();

    return isSubscribed;

}