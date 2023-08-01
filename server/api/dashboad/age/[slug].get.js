export default eventHandler(async event => {

  const slug = event.context.params.slug

  if (!slug.containes(event.session.user.email.replace('+', ''))) {

    throw createError({
      statusMessage: 'Unauthorized',
      statusCode: 403,
    });
  };

  return await useStorage(`content:ages`).getItem(`${slug}.json`);
});