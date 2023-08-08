export default eventHandler(async event => {

  const { q, source, target } = await readBody(event);

  const { 
    data: { 
      translations: [
        { 
          translatedText 
        }
      ]
    }
  } = await googleTranslate('/language/translate/v2', {
    body: {
      q,
      source,
      target,
      format: 'text'
    }
  })

  return {
    translatedText, 
    target
  };
});