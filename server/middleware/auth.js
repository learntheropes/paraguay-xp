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

      setResponseStatus(event, 403);
      return 'Unauthenticated';
    };

    const params = event.context.params;
    const contentType = getHeader(event, 'Content-Type');

    if (
      params
      && params.slug 
      && !params.slug.includes(session.user.email.replace('+', ''))
      && contentType !== 'image/webp' 
    ) {

      setResponseStatus(event, 403);
      return 'Unauthenticated';
    };
  }

  if (targetUrl.startsWith('/api/admin')) {

    if (session.user.email !== whatsappAdmin) {

      setResponseStatus(event, 403);
      return 'Unauthenticated';
    }
  }
});
