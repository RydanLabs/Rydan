
import client from 'twilio';


// TO test this API route
// twilio webhook:invoke http://localhost:8080/api/v1/incomingSms  -d Body="Hi, how are you doing?" -d FromCountry=CA --auth-token="xxxx"
export async function POST(request: Request) {
    const authToken = process.env.TWILIO_AUTH_TOKEN || "";
    const twilioSignature = request.headers.get("x-twilio-signature");
    const requestBodyObj: Record<string, any> = {};
    if(twilioSignature){
        const url = request.url;
        const requestBody = await request.text();
        new URLSearchParams(requestBody).forEach((value, key) => {
            requestBodyObj[key] = value;
        });
        const isValid = client.validateRequest(authToken, twilioSignature, url, requestBodyObj); 
        if (!isValid) {
            return new Response(JSON.stringify({ error: 'Invalid signature' }), { status: 403 });
        }
    } else {
        return new Response(JSON.stringify({ error: 'Twilio Signature not found!' }), { status: 403 });
    }
    return new Response(JSON.stringify({ message: 'success' }), { status: 200 });
}