import axios, { AxiosRequestConfig } from 'axios';
import credentials from '../../credentials/config'

export const generateUnsubscribeLink = async (hashUser: string): Promise<string> => {

    const originalLink = "https://hedwig.app?hash=" + hashUser;

    try {

        const data = JSON.stringify({
            "destination": originalLink,
            "domain": {
                "fullName": "unsubscribe.hedwig.app"
            }
        });
    
        var config: AxiosRequestConfig = {
            method: 'post',
            url: 'https://api.rebrandly.com/v1/links',
            headers: { 
                'Content-Type': 'application/json', 
                'apikey': credentials().rebrandly_api
            },
            data : data
        };
    
        const responseData = (await axios(config)).data as {shortUrl: string};
    
        return "https://" + responseData.shortUrl;

    } catch(e){ console.log(e); }

    return originalLink;

}