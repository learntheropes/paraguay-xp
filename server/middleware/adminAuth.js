import { getServerSession } from '#auth';

const {
  public: {
    whatsappAdmin
  }
} = useRuntimeConfig();

export default defineEventHandler(async (event) => {

  const targetUrl = event.req.url;

  if (targetUrl.startsWith('/api/admin')) {

    const session = await getServerSession(event);

    if (!session) {

      throw createError({
        statusMessage: 'Unauthenticated',
        statusCode: 401
      });
    };

    if (session.user.email !== whatsappAdmin) {

      throw createError({
        statusMessage: 'Unauthorized',
        statusCode: 403,
      }); 
    }
  }
});