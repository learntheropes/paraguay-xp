export const usePublicationStore = defineStore('publication', {
  state: () => ({
    age: {
      dateOfBirth: null,
      dateMatch: false,
      faceMatch: 0
    },
    description: {
      head: {
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
    },
    registry: {
      availability: {
        fromDay: null,
        toDay: null,
        fromHour: null,
        toHour: null
      },
      basic: {
        name: null,
        category: null,
        agency: null,
        nationality: null,
      },
      body: {
        height: null,
        breast: null,
        waist: null,
        hips: null
      },
      extra: [],
      languages: {
        spanish: null,
        spanish: null,
        portuguese: null
      },
      rate: null,
      services: {
        virtual: false,
        incall: false,
        area: null,
        outcall: false,
        dinner: false,
        travel: false
      }
    }
  }),
  gallery: {
    medias: [],
    blur: false
  },
  actions: {
    setPublication(publication) {
      this = publication;
    },
    setAge(age) {
      this.age = age;
    },
    setDescription(description) {
      this.description = description;
    },
    setRegistry(registry) {
      this.registry = registry;
    },
    setGallery(gallery) {
      this.gallery = gallery;
    }
  }
})