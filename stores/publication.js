import nuxtStorage from 'nuxt-storage';

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

  actions: {
    updateStorage() {
      const publication = {
        description: this.description,
        registry: this.registry,
        gallery: this.gallery,
        phone: this.phone,
        slug: this.slug,
        accept: this.accept
      }
      nuxtStorage.localStorage.setData('publication', JSON.stringify(publication), 7, 'd');
    },
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
      phone,
      slug,
      accept,
      description, 
      registry, 
      gallery
    }) {
      this.description = description;
      this.registry = registry;
      this.gallery = gallery;
      this.phone = phone
      this.slug = slug;
      this.accept = accept;
      this.updateStorage();
    },
    setAccept(bool) {
      this.accept = bool;
      this.updateStorage();
    },
    setCategory(category) {
      this.registry.basic.category = category;
      this.updateStorage();
    },
    setAgency(agency) {
      this.registry.basic.agency = agency;
      this.updateStorage();
    },
    setOneExtra(value) {
      this.registry.extra.push(value);
      this.updateStorage();
    },
    removeOneExtra(value) {
      const index = this.registry.extra.indexOf(value);
      this.registry.extra.splice(index,1);
      this.updateStorage();
    },
    concatMedias(temps) {
      temps.forEach(temp => delete temp.preview);
      this.gallery.medias = this.gallery.medias.concat(temps);
      this.updateStorage();
    }, 
    addOneMedia(media) {
      this.gallery.medias.push(media);
      this.updateStorage();
    },
    removeOneMedia(index) {
      this.gallery.medias.splice(index,1);
      this.updateStorage();
    },
    setTitleOriginal(str) {
      this.description.title.original = str;
      this.updateStorage();
    },
    setTitle(obj) {
      this.description.title = obj;
      this.updateStorage();
    },
    setAboutOriginal(str) {
      this.description.about.original = str;
      this.updateStorage();
    },
    setAbout(obj) {
      this.description.about = obj;
      this.updateStorage();
    },
    setRate(str) {
      this.registry.rate = parseInt(str);
      this.updateStorage();
    }
  }
})