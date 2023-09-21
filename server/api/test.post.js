export default defineEventHandler(event => {

  const site = getHeader(event, 'sec-fetch-site')
  console.log('sec-fetch-site', site)
  return true;
})
