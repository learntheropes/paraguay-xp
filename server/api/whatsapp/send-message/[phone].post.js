import { client } from '~/server/plugins/1.whatsappClient'

export default eventHandler(async event => {

  const {
    nextAuthSecret,
  } = useRuntimeConfig();

  const authorization = getHeader(event, 'authorization');
  const token = authorization && authorization.split(' ')[1];

  if (!authorization || !token) {
    throw createError({
      statusMessage: 'Unauthenticated',
      statusCode: 401,
    });
  };

  if (token !== nextAuthSecret) {

    throw createError({
      statusMessage: 'Unauthorized',
      statusCode: 403,
    });
  }
  
  const { message } = await readBody(event);
  const whatsapp = `${event.context.params.phone.replace('+','')}@c.us`;

  try {
    const response = await client.sendMessage(whatsapp, message);
    
    if (response.id.fromMe) {
      return {
        status:'success',
        message:`Message successfully sent to ${whatsapp}`
      };
    };
  } catch (error) {
    throw new Error(error);
  }
})