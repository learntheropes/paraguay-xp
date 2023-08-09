import { getServerSession } from '#auth';

export default defineEventHandler(async (event) => {

  const targetUrl = event.req.url;
  
  if (targetUrl.startsWith('/api/dashboard/')) {

    const session = await getServerSession(event);

    if (!session) {
      throw createError({
        statusMessage: 'Unauthenticated',
        statusCode: 403
      });
    };
  }

  if (targetUrl.startsWith('/api/dashboard/publication')) {

    const session = await getServerSession(event);

    const slug = event.context.params.slug

    if (!slug.containes(session.user.email.replace('+', ''))) {
  
      throw createError({
        statusMessage: 'Unauthorized',
        statusCode: 403,
      });
    };
  }
});