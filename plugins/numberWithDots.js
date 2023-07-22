export default defineNuxtPlugin(nuxtApp => {

  return {
    provide: {
      numberWithDots: (number) => {
        return (number) ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : null;
      }
    }
  }
});