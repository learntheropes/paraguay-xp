export const usePublicationStore = defineStore('publication', {
  state: () => ({
    phone: null,
    slug: null,
    accept: false,
    approved: false,
    until: null,
    age: {
      dateOfBirth: null,
      idFront: null,
      idBack: null,
      dateMatch: false,
      ageAtRegistration: null
    },
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
    },
    registry: {
      availability: {
        fromDay: 0,
        toDay: 6,
        fromHour: 0,
        toHour: 24
      },
      basic: {
        name: null,
        category: 'indipendent',
        agency: 'indipendent',
        nationality: 'PY',
      },
      body: {
        height: null,
        breast: null,
        waist: null,
        hips: null
      },
      extra: [],
      languages: {
        spanish: 'native',
        english: null,
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
    },
    gallery: {
      medias: [],
      blur: false
    }
  }),

  persist: {
    storage: persistedState.sessionStorage,
    key: 'publication'
  },

  actions: {
    setAge(age) {
      this.age = age;
    },
    setIdFront(base64) {
      this.age.idFront = base64;
    },
    setIdBack(base64) {
      this.age.idBack = base64;
    },
    setDateOfBirth(value) {
      this.age.dateOfBirth = value.toLocaleDateString();
    },
    setAgeAtRegistration(num) {
      this.age.ageAtRegistration = num;
    },
    setDateMatch(bool) {
      this.age.dateMatch = bool;
    },
    setPublication({ 
      age,
      phone,
      slug,
      accept,
      description, 
      registry, 
      gallery
    }) {
      this.age = age
      this.description = description;
      this.registry = registry;
      this.gallery = gallery;
      this.phone = phone
      this.slug = slug;
      this.accept = accept;
    },
    setAccept(bool) {
      this.accept = bool;
    },
    setCategory(category) {
      this.registry.basic.category = category;
    },
    setAgency(agency) {
      this.registry.basic.agency = agency;
    },
    setOneExtra(value) {
      this.registry.extra.push(value);
    },
    removeOneExtra(value) {
      const index = this.registry.extra.indexOf(value);
      this.registry.extra.splice(index,1);
    },
    concatMedias(temps) {
      temps.forEach(temp => delete temp.preview);
      this.gallery.medias = this.gallery.medias.concat(temps);
    }, 
    addOneMedia(media) {
      this.gallery.medias.push(media);
    },
    removeOneMedia(index) {
      this.gallery.medias.splice(index,1);
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
    },
    setRate(str) {
      this.registry.rate = parseInt(str);
    }
  }
})