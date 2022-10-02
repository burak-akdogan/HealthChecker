import router from './helpers/router';
import { sendResponse, sendErrorResponse } from './helpers/ws';
import db from './helpers/db';
import { uid, MODEL_ID } from './helpers/utils';
import {sendEmail} from './mail';



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
let username =''

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




const data = ` <p style="color:${color};">${answer} ${username} `

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
