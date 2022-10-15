import router from './helpers/router';
import { sendResponse, sendErrorResponse } from './helpers/ws';
import db from './helpers/db';
import { uid, MODEL_ID } from './helpers/utils';
import {sendEmail} from './mail';
import { userInfo } from 'os';



router.add('submit_report', async (params, tag, ws) => {
  console.log(params)
  if (!ws.id) return;
  const post = {
    user_id: ws.id,
    meta: JSON.stringify(params.form),
    color:params.color
  };
await db.queryAsync('INSERT INTO reports SET ?;', [post]);
  const email= await db.queryAsync("SELECT email FROM users WHERE company_id =  ? AND role='hr';", [params.company_id]);
console.log(email[0].email)
const emailTo = email[0].email
let color = "red"
let answer= 'selamyo'


const user = await db.queryAsync("SELECT meta FROM users WHERE id =  ? AND role='employee';", [ws.id]);
console.log(user,user[0].meta)
let username = JSON.parse(user[0].meta)
console.log(username)
username = username.name
console.log(username,user)


if (params.form[1]==='Yes' && params.form[2]==='Yes' && params.form[3]==='Yes' && params.form[4]==='Yes' && params.form[5]==='Yes')
{
  color='red'
  answer='Should stay at home and contact you!' //hr
}
if (params.form[1]==='No' && params.form[2]==='No' && params.form[3]==='No' && params.form[4]==='No' && params.form[5]==='No')
{
  color='Green'
  answer='Approved to go workplace.' //hr
}
if (params.form[1]==='No' && params.form[2]==='Yes' && params.form[3]==='No' && params.form[4]==='Yes' && params.form[5]==='No')
{
  color='Yellow'
  answer='Need to consult You!' //hr
}
if (params.form[1]==='Yes' && params.form[2]==='Yes' && params.form[3]==='Yes' && params.form[4]==='No' && params.form[5]==='No')
{
  color='Yellow'
  answer='Need to consult You!' //hr
}
if (params.form[1]==='Yes' && params.form[2]==='No' && params.form[3]==='No' && params.form[4]==='No' && params.form[5]==='No')
{
  color='Yellow'
  answer='Need to consult You!' //hr
}
if (params.form[1]==='Yes' && params.form[2]==='No' && params.form[3]==='Yes' && params.form[4]==='No' && params.form[5]==='No')
{
  color='Yellow'
  answer='Need to consult You!' //hr
}
if (params.form[1]==='Yes' && params.form[2]==='No' && params.form[3]==='Yes' && params.form[4]==='Yes' && params.form[5]==='No')
{
  color='red'
  answer='Should stay at home and contact you!' //hr verified - ALERT
}
if (params.form[1]==='No' && params.form[2]==='No' && params.form[3]==='Yes' && params.form[4]==='Yes' && params.form[5]==='No')
{
  color='grey'
  answer='Contact your Supervisor or HR' //hr
}
//mail
// const data = ` <p style="color:${color};">${answer} ${username} ` test dev
const data= `<!DOCTYPE html>

<html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
<title></title>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
<!--[if !mso]><!-->
<link href="https://fonts.googleapis.com/css?family=Bitter" rel="stylesheet" type="text/css"/>
<link href="https://fonts.googleapis.com/css?family=Cormorant+Garamond" rel="stylesheet" type="text/css"/>
<link href="https://fonts.googleapis.com/css?family=Cabin" rel="stylesheet" type="text/css"/>
<link href="https://fonts.googleapis.com/css?family=Droid+Serif" rel="stylesheet" type="text/css"/>
<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css"/>
<link href="https://fonts.googleapis.com/css?family=Roboto+Slab" rel="stylesheet" type="text/css"/>
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

		@media (max-width:670px) {

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

			.image_block img.big,
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
<body style="background-color: #85a4cd; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
<table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style=" background-color: #85a4cd;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation"  width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style=" color: #000000; width: 650px;" width="650">
<tbody>
<tr>
<td class="column column-1" style=" font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="heading_block block-2" role="presentation"  width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;text-align:center;width:100%;padding-top:60px;">

</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-3" role="presentation"  width="100%">
<tr>
<td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
<div align="center" class="alignment" style="line-height:10px"><img  class="big" src="https://raw.githubusercontent.com/burak-akdogan/HealthChecker/main/src/assets/logov10.png" style="display: block; height: auto; border: 0; width: 650px; max-width: 100%;" width="650"/></div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="text_block block-5" role="presentation" style=" word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:5px;padding-left:10px;padding-right:10px;padding-top:25px;">
<div style="font-family: sans-serif">
<div class="" style="font-size: 14px; color: #3f4d75; line-height: 1.2; font-family: Roboto Slab, Arial, Helvetica Neue, Helvetica, sans-serif;">
<p style="margin: 0; font-size: 14px; text-align: center;"><span style="font-size:30px;">New Report from ${username}!</span></p>
</div>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="text_block block-6" role="presentation" style=" word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:5px;padding-left:10px;padding-right:10px;padding-top:5px;">
<div style="font-family: sans-serif">
<div class="" style="font-size: 14px; color: #3f4d75; line-height: 1.2; font-family: Roboto Slab, Arial, Helvetica Neue, Helvetica, sans-serif;">
<p style="margin: 0; font-size: 14px; color: ${color}; text-align: center;"><span style="font-size:22px;">${answer}</span></p>
</div>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="button_block block-8" role="presentation"  width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:10px;padding-right:10px;padding-top:30px;text-align:center;">
<div align="center" class="alignment">
<a href="http://localhost:8080/viewreports" style="text-decoration:none;display:inline-block;color:#3f4d75;background-color:#ffffff;border-radius:10px;width:auto;border-top:2px solid #3F4D75;font-weight:undefined;border-right:2px solid #3F4D75;border-bottom:2px solid #3F4D75;border-left:2px solid #3F4D75;padding-top:10px;padding-bottom:10px;font-family:Roboto Slab, Arial, Helvetica Neue, Helvetica, sans-serif;text-align:center;word-break:keep-all;" target="_blank"><span style="padding-left:25px;padding-right:25px;font-size:18px;display:inline-block;letter-spacing:normal;"><span style="word-break: break-word;"><span data-mce- style="line-height: 36px;">View Reports</span></span></span></a>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="text_block block-10" role="presentation" style=" word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:40px;padding-left:10px;padding-right:10px;padding-top:30px;">
<div style="font-family: sans-serif">
<div class="" style="font-size: 14px; color: #3f4d75; line-height: 1.2; font-family: Roboto Slab, Arial, Helvetica Neue, Helvetica, sans-serif;">
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
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2" role="presentation" style=" background-color: #f3f6fe;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style=" color: #000000; width: 650px;" width="650">
<tbody>
<tr>
<td class="column column-1" style=" font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="social_block block-2" role="presentation"  width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:50px;text-align:center;">
<div class="alignment" style="text-align:center;">
<table border="0" cellpadding="0" cellspacing="0" class="social-table" role="presentation" style=" display: inline-block;" width="208px">
</table>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="text_block block-3" role="presentation" style=" word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:10px;">
<div style="font-family: sans-serif">
<div class="" style="font-size: 18px; color: #7999ac; line-height: 1.2; font-family: Roboto Slab, Arial, Helvetica Neue, Helvetica, sans-serif;">
<p style="margin: 0; font-size: 18px; text-align: center;"><span style="font-size:12px;">By using our website, you confirm that you accept these terms of use and that you agree to comply with them. If you do not agree to these terms of use, you must not use our website. We do not guarantee that our website, or any content on it, will always be available or be uninterrupted or free of defects, errors, or bugs. Our site is made available free of charge.</span></p>
</div>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-4" role="presentation"  width="100%">
<tr>
<td class="pad" style="padding-bottom:40px;padding-left:20px;padding-right:20px;padding-top:10px;width:100%;">
<div align="center" class="alignment" style="line-height:10px"><img  src="https://raw.githubusercontent.com/burak-akdogan/HealthChecker/main/src/assets/logov10.png" style="display: block; height: auto; border: 0; width: 130px; max-width: 100%;" title="Your Logo" width="130"/></div>
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
</table>
</body>
</html>`

await sendEmail(emailTo,data)
  return sendResponse(ws, tag, { success: true });
});

router.add('get_report', async (params, tag, ws) => {
  if (!ws.id) return;
  let query = 'SELECT * FROM reports WHERE user_id = ? ORDER BY created  DESC LIMIT 1 ;';
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
      UNIX_TIMESTAMP(s.created) AS created , 
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
