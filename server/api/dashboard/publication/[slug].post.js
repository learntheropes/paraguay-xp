export default eventHandler(async event => {

  const slug = event.context.params.slug;
  const contentType = getHeader(event, 'Content-Type');
  const { content, path, message } = await readBody(event);

  if (contentType === 'image/webp') {

    const contentBuffer = Buffer.from(content.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    await addFile({
      path: `${path}/${slug}.webp`,
      content: contentBuffer,
      message,
    });
  } else {

    await authSlug(event);

    await updateFile({
      path: `${path}/${slug}`,
      content,
      message,
    });
  }
  
  setResponseStatus(event, 201);
  return true;
});