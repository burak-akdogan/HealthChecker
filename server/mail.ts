import Mailjet, { SendEmailV3_1 } from 'node-mailjet'
const senderEmail =process.env.SENDER_EMAIL || ''
const mailjet = new Mailjet({
    apiKey: process.env.MAILJET_KEY,
    apiSecret: process.env.MAILJET_SECRET
});
export const sendEmail = async (to,report) => {
(async () => {
  const data: SendEmailV3_1.IBody = {
    Messages: [
      {
        From: {
          Email: senderEmail,
        },	
        
        To: [
          {
            Email: to,
          },
        ],
        Subject: 'Greetings from HealthChecker!',
        HTMLPart: report,
        TextPart: report,
      },
    ],
  };

  const result = await mailjet
    .post('send', { version: 'v3.1' })
    .request({ ...data });
console.log(result)
const { Status } = (result.body as unknown as SendEmailV3_1.IResponse).Messages[0];
})();
}

