export default defineNuxtPlugin(async nuxtApp => {

  return {
    provide: {
      dataURItoBlob: (dataURI) => {

        const dataURISplit = dataURI.split(',')
        const byteString = atob(dataURISplit[1]);
        const mimeString = dataURISplit[0].split(':')[1].split(';')[0]
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);

        for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ab], {type: mimeString});

      }
    }
  };
});
