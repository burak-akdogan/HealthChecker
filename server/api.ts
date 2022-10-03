import router from './helpers/router';
import { sendResponse, sendErrorResponse } from './helpers/ws';
import db from './helpers/db';
import { uid, MODEL_ID, usernameToId } from './helpers/utils';
import {sendEmail} from './mail';
import { userInfo } from 'os';



router.add('submit_report', async (params, tag, ws) => {
  console.log(params)
  if (!ws.id) return;
  const post = {
    user_id: ws.id,
    meta: JSON.stringify(params.form)
  };
await db.queryAsync('INSERT INTO reports SET ?;', [post]);
  const email= await db.queryAsync("SELECT email FROM users WHERE company_id =  ? AND role='hr';", [params.company_id]);
console.log(email[0].email)
const emailTo = email[0].email
let color = "red"
let answer= 'selamyo'

// const user = await db.queryAsync("SELECT meta FROM users WHERE user_id =  ? AND role='employee';", [ws.id]);
// let username = JSON.parse(user[0].meta)
// username = username.meta.name


if (params.form[1]==='Yes' && params.form[2]==='Yes' && params.form[3]==='Yes' && params.form[4]==='Yes' && params.form[5]==='Yes')
{
  color='red'
  answer='Stay at home and contact a supervisor' //hr
}
if (params.form[1]==='No' && params.form[2]==='No' && params.form[3]==='No' && params.form[4]==='No' && params.form[5]==='No')
{
  color='Green'
  answer='You are approved to go workplace.' //hr
}
if (params.form[1]==='No' && params.form[2]==='Yes' && params.form[3]==='No' && params.form[4]==='Yes' && params.form[5]==='No')
{
  color='Yellow'
  answer='Please consult your supvervisor!' //hr
}
if (params.form[1]==='Yes' && params.form[2]==='Yes' && params.form[3]==='Yes' && params.form[4]==='No' && params.form[5]==='No')
{
  color='Yellow'
  answer='Please consult your supvervisor!' //hr
}
if (params.form[1]==='Yes' && params.form[2]==='No' && params.form[3]==='No' && params.form[4]==='No' && params.form[5]==='No')
{
  color='Green'
  answer='You are approved to go workplace.' //hr
}


// const data = ` <p style="color:${color};">${answer} ${username} `
const data= `<!DOCTYPE html>

<html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
<title></title>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
<!--[if !mso]><!-->
<link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css"/>
<link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css"/>
<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css"/>
<link href="https://fonts.googleapis.com/css?family=Permanent+Marker" rel="stylesheet" type="text/css"/>
<link href="https://fonts.googleapis.com/css?family=Abril+Fatface" rel="stylesheet" type="text/css"/>
<!--<![endif]-->
<style>
		* {
			box-sizing: border-box;
		}

		body {
			margin: 0;
			padding: 0;
		}

		a[x-apple-data-detectors] {
			color: inherit !important;
			text-decoration: inherit !important;
		}

		#MessageViewBody a {
			color: inherit;
			text-decoration: none;
		}

		p {
			line-height: inherit
		}

		.desktop_hide,
		.desktop_hide table {
			
			display: none;
			max-height: 0px;
			overflow: hidden;
		}

		@media (max-width:700px) {

			.desktop_hide table.icons-inner,
			.social_block.desktop_hide .social-table {
				display: inline-block !important;
			}

			.icons-inner {
				text-align: center;
			}

			.icons-inner td {
				margin: 0 auto;
			}

			.row-content {
				width: 100% !important;
			}

			.mobile_hide {
				display: none;
			}

			.stack .column {
				width: 100%;
				display: block;
			}

			.mobile_hide {
				min-height: 0;
				max-height: 0;
				max-width: 0;
				overflow: hidden;
				font-size: 0px;
			}

			.desktop_hide,
			.desktop_hide table {
				display: table !important;
				max-height: none !important;
			}
		}
	</style>
</head>
<body style="background-color: #f9f9f9; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
<table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="background-color: #f9f9f9;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation"  width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style=" background-color: #465c86; color: #000000; width: 680px;" width="680">
<tbody>
<tr>
<td class="column column-1" style=" font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation"  width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-top:10px;width:100%;padding-right:0px;padding-left:0px;">
<div align="center" class="alignment" style="line-height:10px"><img alt="Yourlogo Light" src="https://raw.githubusercontent.com/burak-akdogan/HealthChecker/main/src/assets/logov10.png" style="display: block; height: auto; border: 0; width: 268px; max-width: 100%;" title="Yourlogo Light" width="268"/></div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2" role="presentation" >
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style=" background-color: #cbdbef; color: #000000; width: 680px;" width="680">
<tbody>
<tr>
<td class="column column-1" style=" font-weight: 400; text-align: left; vertical-align: top; padding-top: 20px; padding-bottom: 20px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-2" role="presentation"  width="100%">
<tr>
<td class="pad" style="width:100%;padding-right:0px;padding-left:0px;padding-top:70px;">
<div align="center" class="alignment" style="line-height:10px"><img alt="Check Icon" src="https://raw.githubusercontent.com/burak-akdogan/HealthChecker/main/src/assets/check-icon.png" style="display: block; height: auto; border: 0; width: 93px; max-width: 100%;" title="Check Icon" width="93"/></div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="text_block block-3" role="presentation" style=" word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:25px;padding-left:20px;padding-right:20px;padding-top:10px;">
<div style="font-family: Georgia, 'Times New Roman', serif">
<div class="" style="font-size: 14px; font-family: Georgia, Times, 'Times New Roman', serif; color: rgb(48, 50, 71); line-height: 1.2;">
<p style="margin: 0; font-size: 14px; text-align: center;"><span style="font-size:42px;">New Report</span></p>
</div>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="text_block block-4" role="presentation" style=" word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:80px;padding-left:30px;padding-right:30px;padding-top:10px;">
<div style="font-family: sans-serif">
<div class="" style="font-size: 14px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif;  color: rgb(48, 50, 71); line-height: 1.5;">
<p style="margin: 0; font-size: 14px; text-align: center; "><span style="font-size:16px;">Hi <strong><u>Jessy Doe</u></strong>,</span></p>
<p style="margin: 0; font-size: 14px; text-align: center; "> </p>
<p style="margin: 0; font-size: 14px; text-align: center; "><span style="font-size:16px;">TEST</span></p>
<p style="margin: 0; font-size: 14px; text-align: center; "> </p>
<p style="margin: 0; font-size: 14px; text-align: center; "><p style="color:${color};">${answer} </p>
<p style="margin: 0; font-size: 14px; text-align: center; "><span style="color:#000000;font-size:14px;">consectetur adipiscing elit lectus.</span></p>
</div>
</div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3" role="presentation"  width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="  background-color: #ffffff; color: #000000; width: 680px;" width="680">
<tbody>
<tr>
<td class="column column-1" style="  font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="text_block block-1" role="presentation" style="  word-break: break-word;" width="100%">
<tr>
<div style="font-family: sans-serif">
<div class="" style="font-size: 14px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; color: rgb(48, 50, 71); line-height: 1.2;">

</div>
</div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<tbody>
<tr>
<td>
<tbody>
<tr>
<tr>
</div>
</div>
</td>
</tr>
</table>
</td>
<tbody>
<tr>
<td>
<tbody>
<tr>
<tr>
</div>
</div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-6" role="presentation"  width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="  background-color: #5d77a9; color: #000000; width: 680px;" width="680">
<tbody>
<tr>
<td class="column column-1" style="  font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-2" role="presentation" width="100%">
<tr>
<td class="pad" style="width:100%;padding-right:0px;padding-left:0px;padding-top:20px;">
<div align="center" class="alignment" style="line-height:10px"><img alt="Yourlogo Light" src="https://raw.githubusercontent.com/burak-akdogan/HealthChecker/main/src/assets/logov10.png" style="display: block; height: auto; border: 0; width: 204px; max-width: 100%;" title="Yourlogo Light" width="204"/></div>
</td>
</tr>
</table>
<table border="0" cellpadding="10" cellspacing="0" class="social_block block-3" role="presentation"  width="100%">
<tr>
<td class="pad">
<div class="alignment" style="text-align:center;">
<table border="0" cellpadding="0" cellspacing="0" class="social-table" role="presentation" style="  display: inline-block;" width="108px">

</table>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="10" cellspacing="0" class="text_block block-4" role="presentation" style="  word-break: break-word;" width="100%">
<tr>
<td class="pad">
<div style="font-family: sans-serif">
<div style="font-size: 14px;  color: #f9f9f9; line-height: 0.1; font-family: Arial, Helvetica Neue, Helvetica, sans-serif;">
<p style="margin: 0; font-size: 12px; text-align: center; "><span style="font-size:12px;">info@healthchecker.com </span></p>
</div>
</div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-7" role="presentation" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style=" background-color: #5d77a9; color: #000000; width: 680px;" width="680">
<tbody>
<tr>
<td class="column column-1" style="  font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 20px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
<table border="0" cellpadding="10" cellspacing="0" class="text_block block-1" role="presentation" style="  word-break: break-word;" width="100%">
<tr>
<td class="pad">
<div style="font-family: sans-serif">
<div  >
<p style="margin: 0; font-size: 14px; text-align: center;"><span style="font-size:12px;">2022 © HealthChecker</span></p>
</div>
</div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-8" role="presentation"  width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="  color: #000000; width: 680px;" width="680">
<tbody>
<tr>
<td class="column column-1" style="  font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="icons_block block-1" role="presentation"  width="100%">
<tr>
<td class="pad" style="vertical-align: middle; color: #9d9d9d; font-family: inherit; font-size: 15px; padding-bottom: 5px; padding-top: 5px; text-align: center;">
<table cellpadding="0" cellspacing="0" role="presentation"  width="100%">
<tr>
<td class="alignment" style="vertical-align: middle; text-align: center;">
<!--[if vml]><table align="left" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;"><![endif]-->
<!--[if !vml]><!-->
<table cellpadding="0" cellspacing="0" class="icons-inner" role="presentation" style=" display: inline-block; margin-right: -4px; padding-left: 0px; padding-right: 0px;">
<!--<![endif]-->
<tr>
</tr>
</table>
</td>
</tr>
</table>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table><!-- End -->
</body>
</html>`

await sendEmail(emailTo,data)
  return sendResponse(ws, tag, { success: true });
});

router.add('get_report', async (params, tag, ws) => {
  if (!ws.id) return;
  let query = 'SELECT * FROM reports WHERE user_id = ? ORDER BY created DESC LIMIT 1;';
  const result = await db.queryAsync(query, [ws.id]);
  return sendResponse(ws, tag, result);
});

router.add('get_user_reports', async (params, tag, ws) => {
  if (!ws.id) return;
  let query = 'SELECT * FROM reports WHERE user_id = ? ORDER BY created DESC;';
  const result = await db.queryAsync(query, [params]);
  return sendResponse(ws, tag, result);
});

router.add('get_users', async (params, tag, ws) => {
  if (!ws.id) return;
  let query = 'SELECT * FROM users WHERE company_id = ?';

  const result = await db.queryAsync(query, [params]);
  return sendResponse(ws, tag, result);
});


router.add('get_subscribers', async (params, tag, ws) => {
  if (!ws.id) return;
  const query = `
    SELECT 
      s.*, 
      UNIX_TIMESTAMP(s.created) AS created, 
      UNIX_TIMESTAMP(s.expired) AS expired, 
      u.username, 
      u.meta AS user_meta
    FROM subscriptions s 
    INNER JOIN users u ON u.id = s.user_id 
    WHERE s.subscription = ? 
    ORDER BY s.created DESC
  `;
  let result = await db.queryAsync(query, [ws.id]);
  result = result.map(i => ({ ...i, user_meta: JSON.parse(i.user_meta) }));
  return sendResponse(ws, tag, result);
});

router.add('get_profile', async (params, tag, ws) => {
  const query = 'SELECT id, username, meta FROM users WHERE username = ?';
  console.log(params)
  const result = await db.queryAsync(query, [params]);
  const user = result[0];
  try {
    user.meta = JSON.parse(user.meta);
  } catch (error) {
    
  }
  
  return sendResponse(ws, tag, user);
});

router.add('get_stories', async (params, tag, ws) => {
  if (!ws.id) return;
  const interval = 30;
  const query = `
    SELECT p.*, UNIX_TIMESTAMP(p.created) AS timestamp, u.username, u.meta AS user_meta, 
    (SELECT COUNT(l.user_id) FROM likes l WHERE l.post_id = p.id) AS likes
    FROM posts p 
    INNER JOIN users u ON u.id = p.user_id WHERE u.username = ? AND DATE(p.created) > DATE_SUB(CURDATE(), INTERVAL ? DAY) 
    ORDER BY p.created DESC
  `;
  const result = await db.queryAsync(query, [params, interval]);
  return sendResponse(ws, tag, result);
});

export default router;
