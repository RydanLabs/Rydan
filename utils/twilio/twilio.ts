
import twilio from "twilio";

const accountSid = process.env.TWILIO_SANDBOX_ACCOUNT_SID;
const authToken = process.env.TWILIO_SANDBOX_AUTH_TOKEN;
const client = twilio(accountSid, authToken);
const twilioPhoneNumber = "+16318949296"

export async function sendSms(phoneNumber: string, messageToSend: string){
  await client.messages.create({
    body: messageToSend,
    from: twilioPhoneNumber,
    to: phoneNumber,
  });
}

export async function makeCalls(phoneNumber: string, messageToSay: string){
  await client.calls.create({
    from: twilioPhoneNumber,
    to: phoneNumber,
    twiml: `<Response><Say>${messageToSay}</Say></Response>`,
  });
}
