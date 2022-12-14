import mysql from 'mysql';
import Pool from 'mysql/lib/Pool';
import Connection from 'mysql/lib/Connection';
import bluebird from 'bluebird';
import parse from 'connection-string';

// @ts-ignore
const config = parse(process.env.DATABASE_URL);
config.connectionLimit = 5;
config.multipleStatements = true;
config.database = config.path[0];
config.host = config.hosts[0].name;
bluebird.promisifyAll([Pool, Connection]);
const db = mysql.createPool(config);

export default db;
