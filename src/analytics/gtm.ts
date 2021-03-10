/* Google Tag Manager */
import TagManager from 'react-gtm-module';

export const setup = () => TagManager.initialize({ gtmId: "GTM-TC9CTDM" });

declare global { interface Window { dataLayer: any; } }

export const clickSendSMS = () => window.dataLayer.push({ event: "send-sms-btn" });