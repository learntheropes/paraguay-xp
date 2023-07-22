export const useEscortsStore = defineStore('escorts', {
  state: () => ({
    init: false,
    steps: [],
    list: {}
  }),
  actions: {
    setInit() {
      this.init = true;
    },
    setSteps(steps) {
      this.steps = steps;
    },
    setList(escorts) {
      this.list = escorts;
    },
  },
})