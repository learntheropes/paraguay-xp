export const useAgencyStore = defineStore('agency', {
  state: () => ({
    slug: null,
    accept: false,
    approved: false,
    description: {
      title: {
        original: null,
        en: null,
        es: null,
        pt: null
      },
      about: {
        original: null,
        en: null,
        es: null,
        pt: null
      }
    }
  }),

  actions: {
    setPublication({ 
      description,
    }) {
      this.description = description;
    },
    setTitleOriginal(str) {
      this.description.title.original = str;
    },
    setTitle(obj) {
      this.description.title = obj;
    },
    setAboutOriginal(str) {
      this.description.about.original = str;
    },
    setAbout(obj) {
      this.description.about = obj;
    }
  }
})