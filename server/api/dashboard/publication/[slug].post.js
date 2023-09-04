export default eventHandler(async event => {

  const slug = event.context.params.slug;
  const contentType = getHeader(event, 'Content-Type');
  const { content, path, message } = await readBody(event);

  if (contentType === 'image/webp') {    
    await addFile({
      path: `${path}/${slug}`,
      content,
      message,
    });
  } else {

    await updateFile({
      path: `${path}/${slug}`,
      content,
      message,
    });
  }
  
  setResponseStatus(event, 201);
  return true;
});