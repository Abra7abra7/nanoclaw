import makeWASocket, { useMultiFileAuthState, DisconnectReason, Browsers } from '@whiskeysockets/baileys';
import path from 'path';
import fs from 'fs';

const STORE_DIR = path.resolve('store');
const authDir = path.join(STORE_DIR, 'auth');

async function debugWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState(authDir);
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true,
        browser: Browsers.macOS('Chrome'),
    });

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        console.log('Connection update:', connection);
        if (connection === 'close') {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('Connection closed, reconnecting ', shouldReconnect);
        } else if (connection === 'open') {
            console.log('Opened connection');
        }
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('messages.upsert', async (m) => {
        console.log('New message event!');
        console.log(JSON.stringify(m, null, 2));
    });

    console.log('Debugger started. Waiting for messages...');
}

debugWhatsApp().catch(err => console.error(err));
