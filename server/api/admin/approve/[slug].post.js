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
    public: {
      whatsappDomain
    }
  } = useRuntimeConfig();

  await ofetch(`${whatsappDomain}/send-message/${data.value.user.email}`, {
    method: 'POST',
    body: {
      message: approvedAndPublished.replace('{url}', `https://paraguayxp.com/${locale}/escort/${slug}`)
    }
  })


  
  setResponseStatus(event, 201);
  return true;
});