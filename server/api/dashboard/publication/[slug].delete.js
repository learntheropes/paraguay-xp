
export default eventHandler(async event => {

  const slug = event.context.params.slug;
  const { name } = await readBody(event);
  const contentType = getHeader(event, 'Content-Type');

  if (contentType === 'image/webp') {

    await deleteFile({
      path: `public/gallery/${name}/modal/${slug}`,
      message: `delete modal image ${slug} of ${name}`
    });
  
    await deleteFile({
      path: `public/gallery/${name}/preview/${slug}`,
      message: `delete preview image ${slug} of ${name}`
    });
  } else {

    await deleteFile({
      path: `content/escorts/${slug}.json`,
      message: `delete publication of ${slug}`
    });
  
    await deleteFile({
      path: `content/ages/${slug}.json`,
      message: `delete age of ${slug}`
    });
  }
  
  setResponseStatus(event, 204);
  return true;
});