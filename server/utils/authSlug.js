export const authSlug = async (event) => {

  const targetUrl = event.req.url;

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
}