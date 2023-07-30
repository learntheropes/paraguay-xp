export const useEscortsStore = defineStore('escorts', {
  state: () => ({
    init: false,
    levels: [],
    list: {},
    min: null,
    max: null
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
    setMin(value) {
      this.min = value
    },
    setMax(value) {
      this.max = value
    }
  },
})