
export default eventHandler(async event => {

  const slug = event.context.params.slug;
  const contentType = getHeader(event, 'Content-Type');

  if (contentType === 'image/webp') {

    console.log(`public/gallery/preview/${slug}`)

    await deleteFile({
      path: `public/gallery/modal/${slug}`,
      message: `delete modal image ${slug}`
    });
  
    await deleteFile({
      path: `public/gallery/preview/${slug}`,
      message: `delete preview image ${slug}`
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