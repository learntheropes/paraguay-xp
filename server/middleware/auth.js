import { getServerSession } from '#auth';

export default defineEventHandler(async (event) => {

  const targetUrl = event.req.url;

  const session = await getServerSession(event);

  const {
    public: {
      whatsappAdmin
    }
  } = useRuntimeConfig();

  if (targetUrl.startsWith('/api/dashboard')) {

    if (!session) {
      
      throw createError({
        statusMessage: 'Unauthenticated',
        statusCode: 403
      });
    };

    const params = event.context.params;
    const contentType = getHeader(event, 'Content-Type');

    if (
      params
      && params.slug 
      && !params.slug.includes(session.user.email.replace('+', ''))
      && contentType !== 'image/webp' 
    ) {

      throw createError({
        statusMessage: 'Unauthorized',
        statusCode: 403,
      });
    };
  }

  if (targetUrl.startsWith('/api/admin')) {

    if (session.user.email !== whatsappAdmin) {

      throw createError({
        statusMessage: 'Unauthorized',
        statusCode: 403,
      }); 
    }
  }
});
