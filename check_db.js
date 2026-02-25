import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.resolve('store', 'messages.db');
const db = new Database(dbPath);

const messages = db.prepare('SELECT * FROM messages ORDER BY timestamp DESC LIMIT 10').all();
console.log('Last 10 messages:');
console.log(JSON.stringify(messages, null, 2));

const groups = db.prepare('SELECT * FROM registered_groups').all();
console.log('\nRegistered groups:');
console.log(JSON.stringify(groups, null, 2));

const chats = db.prepare('SELECT * FROM chats').all();
console.log('\nAvailable chats:');
console.log(JSON.stringify(chats, null, 2));

const state = db.prepare('SELECT * FROM router_state').all();
console.log('\nRouter state:');
console.log(JSON.stringify(state, null, 2));
