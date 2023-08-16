export default eventHandler(async event => {

  const slug = event.context.params.slug;

  return await useStorage('content:ages').getItem(`${slug}.json`);
});