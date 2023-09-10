import {ofetch} from 'ofetch';

export default eventHandler(async event => {

  const slug = event.context.params.slug;

  await updateFile({
    path: `content/escorts/${slug}.json`,
    content: {
      approved: true
    },
    message: `approve ${slug}`,
  });

  const { 
    locale,
    phone,
    dashboard: {
      publication: {
        approvedAndPublished
      }
    }
  } = await useStorage('content:escorts').getItem(`${slug}.json`);

  const {
    telegramToken,
    public: {
      whatsappDomain
    }
  } = useRuntimeConfig();

  await ofetch(`${whatsappDomain}/message/${phone}`, {
    method: 'POST',
    body: {
      message: approvedAndPublished.replace('{url}', `https://paraguayxp.com/${locale}/escort/${slug}`)
    },
    headers: {
      'content-type': 'application/json',
      'authorization': `token ${telegramToken}`
    }
  })

  await sendTelegram('New publication to approve');
  
  setResponseStatus(event, 201);
  return true;
});