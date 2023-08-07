export default defineNuxtPlugin(nuxtApp => {

  return {
    provide: {
      parseContentBody: (body) => {
        return body.children.map(
          one => (one.type === 'text') ? one.value : one.children.map(
            two => (two.type === 'text') ? two.value : two.children.map(
              three => (three.type === 'text') ? three.value : three.children[0].value
            )
          ).join('')
        ).join('\n');
      }
    }
  }
});