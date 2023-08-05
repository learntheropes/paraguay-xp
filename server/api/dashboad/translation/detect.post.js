export default eventHandler(async event => {

  const { q } = await readBody(event);

  const { 
    data: { 
      detections: [
        [
          { 
            language 
          }
        ]
      ]
    }
  } = await googleTranslate('/language/translate/v2/detect', {
    body: {
      q
    },

  })

  return {
    language
  };
});