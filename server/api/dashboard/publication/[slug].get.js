export default eventHandler(async event => {

  await authSlug(event);

  const slug = event.context.params.slug;

  const path = getQuery(event);

  return await useStorage(path.replace(/\//, ':')).getItem(`${slug}.json`);
});