import router from './helpers/router';
import { sendResponse, sendErrorResponse } from './helpers/ws';
import db from './helpers/db';
import { uid, MODEL_ID } from './helpers/utils';

router.add('submit_report', async (params, tag, ws) => {
  console.log(params)
  if (!ws.id) return;
  const post = {
    user_id: ws.id,
    meta: JSON.stringify(params)
  };
  let query = 'INSERT INTO reports SET ?;';
  await db.queryAsync(query, [post]);
  return sendResponse(ws, tag, { success: true });
});

router.add('get_report', async (params, tag, ws) => {
  if (!ws.id) return;
  let query = 'SELECT * FROM reports WHERE user_id = ? ORDER BY created DESC LIMIT 1;';
  const result = await db.queryAsync(query, [ws.id]);
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
  const result = await db.queryAsync(query, [params]);
  const user = result[0];
  user.meta = JSON.parse(user.meta);
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
