import whatsappWeb from 'whatsapp-web.js';
const { Client, RemoteAuth } = whatsappWeb
import { MongoStore } from 'wwebjs-mongo';
import mongoose from 'mongoose';
import QRCode from 'qrcode';

export let client;

export default defineNitroPlugin( async (nitroApp) => {

  // nitroApp.hooks.hook('start', (nuxt) => console.log('nuxt', nuxt));

  const {
    mongodbUri,
    public: {
      isDeployed
    }
  } = useRuntimeConfig();
  await mongoose.connect(mongodbUri);

  const store = new MongoStore({ mongoose });

  console.log('mongoose status', mongoose.connection.readyState);
  
  client = new Client({
    puppeteer: {
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-gpu',
      ],
      defaultViewport: {
        width: 800,
        height: 600
      }
    },
    authStrategy: new RemoteAuth({
      store,
      backupSyncIntervalMs: 1000 * 60,
      clientId: (isDeployed) ? 'digital-ocean' : 'local'
    })
  });

  client.initialize();

  client.on('qr', async (qr) => {
    const qrcode = await QRCode.toString(qr,{
      type: 'terminal',
      small: true
    });
    console.log(qrcode);
    await sendTelegram(qr);
  });
  
  client.on('authenticated', () => {
    console.log('wa autheticated');
  });
  
  client.on('auth_failure', msg => {
    console.error('wa authentication failure', msg);
    throw createError({
      statusMessage: `Authentication failure: ${msg}`,
      statusCode: 500,
    });
  });
    
  client.on('change_state', (state) => {
    console.log('wa change state', state);
  });
  
  client.on('disconnected', (reason) => {
    console.log('wa disconnected', reason);
    client.initialize();
  });
  
  client.on('ready', () => {
    console.log('wa connected');
  });

  client.on('remote_session_saved', () => {
    console.log('wa remote session saved');
  });

  console.log('wa initialized');
});
