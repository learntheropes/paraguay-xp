export default eventHandler(async event => {

  const slug = event.context.params.slug;

  await updateFile({
    path: `content/escorts/${slug}.json`,
    content: {
      approved: true
    },
    message: `approve ${slug}`,
  });
  
  setResponseStatus(event, 201);
  return true;
});