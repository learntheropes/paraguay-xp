import { Telegraf } from 'telegraf';

const { 
  telegramToken,
  telegramChatId,
} = useRuntimeConfig();

const client = new Telegraf(telegramToken);

export const sendTelegram = async (message) => {

  await client.telegram.sendMessage(telegramChatId, message)
};