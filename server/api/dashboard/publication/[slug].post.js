export default eventHandler(async event => {

  const slug = event.context.params.slug;
  
  const {
    content,
    path,
    message
  } = await readBody(event);

  await updateFile({
    path: `${path}/${slug}.json`,
    content,
    message,
  })
  
  setResponseStatus(event, 201);
  return content;
});