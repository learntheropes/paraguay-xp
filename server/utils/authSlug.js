import { getServerSession } from '#auth';

export const authSlug = async (event) => {

  const slug = event.context.params.slug;

  const session = await getServerSession(event);

  if (!slug.includes(session.user.email.replace('+', ''))) {

    throw createError({
      statusMessage: 'Unauthorized',
      statusCode: 403,
    });
  };
}
