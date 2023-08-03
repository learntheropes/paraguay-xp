export const usePublicationStore = defineStore('publication', {
  state: () => ({
    age: {
      dateOfBirth: null,
      idFront: null,
      idBack: null,
      dateMatch: false,
      ageAtRegistration: null
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
      },
      phone: null,
      slug: null,
      accept: false,
      approved: false,
      until: null
    },
    gallery: {
      medias: [],
      blur: false
    }
  }),

  actions: {
    // setPublication({ 
    //   age, 
    //   description, 
    //   registry, 
    //   gallery, 
    //   phone, 
    //   slug, 
    //   accept, 
    //   approved, 
    //   until
    // }) {
    //   this.age = age;
    //   this.description = description;
    //   this.registry = registry;
    //   this.gallery = gallery;
    //   this.phone = phone
    //   this.slug = slug;
    //   this.accept = accept;
    //   this.approved = approved;
    //   this.until = until;
    // },
    setIdFront(base64) {
      this.age.idFront = base64
    },
    setIdBack(base64) {
      this.age.idBack = base64
    },
    setAgeAtRegistration(dateOfBirth) {
      this.ageAtRegistration = dateOfBirth.toLocaleDateString();
    },
    setDateMatch(dateOfBirth, textFront, textBack) {
      const arr = dateOfBirth.toLocaleDateString().split('/');
      const dateFront = `${arr[1]}-${arr[0]}-${arr[2]}`;
      const dateBack = `${arr[2].substring(2, 4)}${arr[0]}${arr[1]}`;
      this.dateMatch = (textFront.includes(dateFront) || textBack.includes(dateBack)) ? true : false;
    },
    // setAge(age) {
    //   this.age = age;
    // },
    // setDescription(description) {
    //   this.description = description;
    // },
    // setRegistry(registry) {
    //   this.registry = registry;
    // },
    // setGallery(gallery) {
    //   this.gallery = gallery;
    // },
    addOneMedia(media) {
      this.gallery.medias.push(media);
    },
    removeOneMedia(index) {
      this.gallery.medias.splice(index,1);
    },
    // setPhone(phone) {
    //   this.phone = phone;
    // },
    // setSlug(slug) {
    //   this.slug = slug;
    // },
    // setAccept(accept) {
    //   this.accept = accept;
    // },
    // setApproved(approved) {
    //   this.approved = approved;
    // },
    // setUntil(until) {
    //   this.until = until;
    // }
  }
})