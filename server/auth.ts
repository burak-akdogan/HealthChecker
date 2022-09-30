import jwt from 'jsonwebtoken';
import router from './helpers/router';
import { sendResponse, sendErrorResponse } from './helpers/ws';
import db from './helpers/db';
import { issueToken } from './helpers/token';
import { uid } from './helpers/utils';
import { signup, login } from '../common/schemas';

function getHash(input){
  var hash = 0, len = input.length;
  for (var i = 0; i < len; i++) {
    hash  = ((hash << 5) - hash) + input.charCodeAt(i);
    hash |= 0; // to 32bit integer
  }
  return hash;
}

router.add('signup', async (params, tag, ws) => {
  try {
    const values = await signup.validateAsync(params);
    const id = uid();
    const user = {
      id,
      username: id,
      email: values.email,
      password: values.password,
      company_id: values.company,
      role: 'employee',
      meta: JSON.stringify({name: values.name})
    };
    await db.queryAsync('INSERT INTO users SET ?', [user]);
    const token = issueToken(user.id);
    return sendResponse(ws, tag, { access_token: token });
  } catch (error) {
    return sendErrorResponse(ws, tag, error.sqlMessage || 'request failed');
  }
});

router.add('signup2', async (params, tag, ws) => {
  try {
    const values = await signup.validateAsync(params);
    const id = uid();
    const user = {
      id,
      username: id,
      email: values.email,
      password: values.password,
      company_id: getHash(values.company),
      role: 'hr',
      meta: JSON.stringify({name: values.name})
    };
    const company = {
      name: values.company,
      company_id: getHash(values.company),
    };
    await db.queryAsync('INSERT INTO users SET ?', [user]);
    await db.queryAsync('INSERT INTO companies SET ?', [company]);
    const token = issueToken(user.id);
    return sendResponse(ws, tag, { access_token: token });
  } catch (error) {
    return sendErrorResponse(ws, tag, error.sqlMessage || 'request failed');
  }
});

router.add('login', async (params, tag, ws) => {
  console.log(params)
  try {
    const values = await login.validateAsync(params);
    const query = 'SELECT id, username FROM users WHERE email = ? AND password = ?';
    const users = await db.queryAsync(query, [values.email, values.password]);
    console.log(users)
    if (users && users[0] && users[0].id) {
      const token = issueToken(users[0].id);
      return sendResponse(ws, tag, { access_token: token });
    } else {
      return sendErrorResponse(ws, tag, 'email or password is wrong');
    }
  } catch (e) {
    console.log(e)
    return sendErrorResponse(ws, tag, 'request failed');
  }
});

router.add('verify', async (params, tag, ws) => {
  try {
    const payload = jwt.verify(params, process.env.JWT_SECRET);
    let query = 'UPDATE users SET logged = CURRENT_TIMESTAMP WHERE id = ?;';
    query += 'SELECT id, username FROM users WHERE id = ?;';
    const result = await db.queryAsync(query, [payload.id, payload.id]);
    if (result[1] && result[1][0] && result[1][0].id) {
      ws.token = params;
      ws.id = result[1][0].id;
      ws.username = result[1][0].username;
    }
  } catch (e) {
    return sendErrorResponse(ws, tag, e);
  }
  if (!ws.id) return;
  let query = 'SELECT id, username, email, meta, role, company_id FROM users WHERE id = ? LIMIT 1;';
  try {
    const result = await db.queryAsync(query, [ws.id]);
    return sendResponse(ws, tag, { account: result[0]  });
  } catch (e) {
    return sendErrorResponse(ws, tag, e);
  }
});

router.add('check_company', async (params, tag, ws) => {  
  let query = 'SELECT *  FROM companies WHERE company_id = ? LIMIT 1;';
  try {
    const result = await db.queryAsync(query, [params.company]);
    return sendResponse(ws, tag, { company: result[0]  });
  } catch (e) {
    return sendErrorResponse(ws, tag, e);
  }
});

router.add('logout', async (params, tag, ws) => {
  delete ws.id;
  return sendResponse(ws, tag, true);
});

router.add('edit_profile', async (params, tag, ws) => {
  if (!ws.id) return;
  const { name, about, cover, avatar } = params || {};
  try {
    const query = `UPDATE users SET 
      meta = JSON_SET(meta, "$.name", ?), 
      meta = JSON_SET(meta, "$.about", ?),
      meta = JSON_SET(meta, "$.cover", ?), 
      meta = JSON_SET(meta, "$.avatar", ?)
    WHERE id = ?`;
    await db.queryAsync(query, [name, about, cover, avatar, ws.id]);
    return sendResponse(ws, tag, { success: true });
  } catch (e) {
    console.log('Failed to edit profile', e);
    return sendErrorResponse(ws, tag, 'request failed');
  }
});

export default router;
