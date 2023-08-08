
export default eventHandler(async event => {

  const slug = event.context.params.slug;

  await deleteFile({
    path: `content/escorts/${slug}.json`,
    message: `delete publication of ${slug}`
  });

  await deleteFile({
    path: `content/ages/${slug}.json`,
    message: `delete age of ${slug}`
  })
  
  setResponseStatus(event, 201);
  return;
});