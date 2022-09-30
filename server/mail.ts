import Mailjet, { SendEmailV3_1 } from 'node-mailjet'

const mailjet = new Mailjet({
    apiKey: '847188755cc361182290e7ac382bb3cb',
    apiSecret: 'b00fe4c05bcba9ce5e196cb1ea604414'
});
export const sendEmail = async (to,report) => {
(async () => {
  const data: SendEmailV3_1.IBody = {
    Messages: [
      {
        From: {
          Email: 'bakdogan@na.edu',
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

