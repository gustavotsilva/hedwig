import IMessage, { generateMessage } from "../../models/message";
import IQuote from "../../models/quote";
import IUser from "../../models/user";
import { Worker as DBQuote } from '../../storage/quote';
import { Worker as DBMessage } from '../../storage/message';
import { sendSMS } from '../managers/sms-manager';
import { generateUnsubscribeLink } from './shortner';

export const sendRandomSMS = async (user: IUser, isNewUser = false): Promise<IMessage> => {

    const listIllustrations: string[] = [];

    listIllustrations.push(getRandomPicture());
    listIllustrations.push(getRandomPicture(listIllustrations));
    listIllustrations.push(getRandomPicture(listIllustrations));

    const quote: IQuote = (await (new DBQuote()).getRandom()) as IQuote;

    const unsubscriptionLink = await getUnsubscriptionLink(user.hash);

    const message: IMessage = generateMessage();

    message.hashUser            = user.hash;
    message.phoneNumber         = user.phoneNumber;
    message.content             = quote.content + unsubscriptionLink;
    message.listIllustration    = listIllustrations;

    message.isSent = await sendSMS(message, isNewUser);

    // Save log of message sent
    if(message.isSent) await (new DBMessage()).add(message);

    return message;

}

const getUnsubscriptionLink = async (userHash: string) => "\n\nUnsubscribe: " + (await generateUnsubscribeLink(userHash)) + "\n";

const getRandomPicture = (currentList: string[] = []): string => {
    while(true) {
        const random = Math.floor(((Math.random() * 1000) % 100) + 1);
        const illustration = illustrationUrl(random);
        if(!currentList.includes(illustration)) return illustration;
    }
};

const illustrationUrl = (id: number) => `https://hedwig.app/illustrations/${id}.jpg`;