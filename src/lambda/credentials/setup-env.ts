import fs from 'fs';

fs.writeFileSync('./.env', `MONGODB_KEY=${process.env.MONGODB_KEY}\n`);
fs.writeFileSync('./.env', `REBRANDLY_API=${process.env.REBRANDLY_API}\n`);
fs.writeFileSync('./.env', `TWILIO_ACCOUNTSID=${process.env.TWILIO_ACCOUNTSID}\n`);
fs.writeFileSync('./.env', `TWILIO_AUTHTOKEN=${process.env.TWILIO_AUTHTOKEN}\n`);
fs.writeFileSync('./.env', `TWILIO_FROMNUMBER=${process.env.TWILIO_FROMNUMBER}\n`);
fs.writeFileSync('./.env', `APILAYER_KEY=${process.env.APILAYER_KEY}\n`);
fs.writeFileSync('./.env', `DEFAULT_PHONENUMBER=${process.env.DEFAULT_PHONENUMBER}\n`);