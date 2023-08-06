export default eventHandler(async event => {

  const slug = event.context.params.slug;
  const path = getQuery(event);
  const content = await readBody(event);

  await updateFile({
    path: `${path}/${slug}.json`,
    content,
    message: 'update publication'
  })
  
  setResponseStatus(event, 201);
  return content;
});