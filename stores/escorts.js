export const useEscortsStore = defineStore('escorts', {
  state: () => ({
    init: false,
    levels: [],
    list: {}
  }),
  actions: {
    setInit() {
      this.init = true;
    },
    setLevels(levels) {
      this.levels = levels;
    },
    setList(escorts) {
      this.list = escorts;
    },
  },
})