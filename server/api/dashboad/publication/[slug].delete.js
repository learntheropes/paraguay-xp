export default eventHandler(async event => {

  const slug = event.context.params.slug

  if (!slug.containes(event.session.user.email.replace('+', ''))) {

    throw createError({
      statusMessage: 'Unauthorized',
      statusCode: 403,
    });
  };

  await useStorage(`content:escorts`).deleteItem(`${slug}.json`);
  await useStorage(`content:ages`).deleteItem(`${slug}.json`);
  
  setResponseStatus(event, 201);
  return;
});