import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.resolve('store', 'messages.db');
const db = new Database(dbPath);

const jid = '421902166388@s.whatsapp.net';
const name = 'Main';
const folder = 'main';
const trigger = '@Andy';
const now = new Date().toISOString();

try {
    db.prepare(`
    INSERT INTO registered_groups (jid, name, folder, trigger_pattern, added_at, requires_trigger)
    VALUES (?, ?, ?, ?, ?, 0)
  `).run(jid, name, folder, trigger, now);
    console.log('Successfully registered group:', jid);
} catch (err) {
    console.error('Error registering group:', err.message);
}

const groups = db.prepare('SELECT * FROM registered_groups').all();
console.log('\nRegistered groups:');
console.log(JSON.stringify(groups, null, 2));
