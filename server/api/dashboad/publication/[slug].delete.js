
export default eventHandler(async event => {

  const slug = event.context.params.slug;

  await deleteFile({
    path: `content/escorts/${slug}.json`
  });

  await deleteFile({
    path: `content/ages/${slug}.json`
  })
  
  setResponseStatus(event, 201);
  return;
});