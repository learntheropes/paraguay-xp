<script setup>
import maxBy from 'lodash.maxby'
import minBy from 'lodash.minby'
import shuffle from 'lodash.shuffle'

const store = useEscortsStore();

if (!store.init) {

  const escorts = await queryContent('/escorts')
  .only(['type', 'name', 'slug', 'media', 'birthTime', 'agency', 'rate', 'apartment', 'hotel', 'dinner', 'travel', 'area', 'blur', 'createdAt', 'extra', 'head'])
  .find();

  const min = minBy(escorts, 'rate').rate;
  const max = maxBy(escorts, 'rate').rate;
  const deltaStep = (max - min) / 5;
  const esmeraldRate = Math.ceil((min + deltaStep) / 100000) * 100000;
  const platinumRate = Math.ceil((min + (deltaStep * 2)) / 100000) * 100000;
  const palladiumRate = Math.ceil((min + (deltaStep * 3)) / 100000) * 100000;
  const diamondRate = Math.ceil((min + (deltaStep * 4)) / 100000) * 100000;
  const goldEscorts = escorts.filter(escort => escort.rate < esmeraldRate);
  const esmeraldEscorts = escorts.filter(escort => escort.rate >= esmeraldRate && escort.rate < platinumRate);
  const platinumEscorts = escorts.filter(escort => escort.rate >= platinumRate && escort.rate < palladiumRate);
  const palladiumEscorts = escorts.filter(escort => escort.rate >= palladiumRate && escort.rate < diamondRate);
  const diamondEscorts = escorts.filter(escort => escort.rate >= diamondRate);

  const {
    $numberWithDots
  } = useNuxtApp();

  store.setSteps([
    {
      value: `${diamondRate}-999999999`,
      name: `diamond`,
      range: `${$numberWithDots(diamondRate)} +`
    },
    {
      value: `${palladiumRate}-${diamondRate}`,
      name: `palladium`,
      range: `${$numberWithDots(palladiumRate)} - ${$numberWithDots(diamondRate)}`
    },
    {
      value: `${platinumRate}-${palladiumRate}`,
      name: `platinum`,
      range: `${$numberWithDots(platinumRate)} - ${$numberWithDots(palladiumRate)}`
    },
    {
      value: `${esmeraldRate}-${platinumRate}`,
      name: `esmerald`,
      range: `${$numberWithDots(esmeraldRate)} - ${$numberWithDots(platinumRate)}`
    },
    {
      value: `0-${esmeraldRate}`,
      name: `gold`,
      range: `- ${$numberWithDots(esmeraldRate)}`
    },
  ]);
  store.setList({
    gold: shuffle(goldEscorts),
    esmerald: shuffle(esmeraldEscorts),
    platinum: shuffle(platinumEscorts),
    palladium: shuffle(palladiumEscorts),
    diamond: shuffle(diamondEscorts)
  });
  store.setInit();
}


</script>

<template>
  <div class="is-tall">
    <LayoutNavbar />
    <main class="is-tall-container">
      <slot />
    </main>
    <!-- <div v-if="showChevron" class="is-hidden-mobile is-bottom-right">
      <b-tooltip :label="$t('scrollToTop')" position="is-left">
        <b-icon icon="chevron-up" type="is-black" size="is-medium" @click.native="scrollToTop"></b-icon>
      </b-tooltip>
    </div> -->
    <LayoutFooter />
  </div>
</template>

<!-- <script>
import maxBy from 'lodash.maxby'
import minBy from 'lodash.minby'
import shuffle from 'lodash.shuffle'
import layoutNavbar from '~/components/layout/navbar'
import layoutFooter from '~/components/layout/footer'
export default {
  name: 'Default',
  components: {
    layoutNavbar,
    layoutFooter
  },
  head() {
    return {
        meta: [
          {
            hid: 'title',
            name: 'title',
            itemprop: 'title',
            content: this.$t('seo.tags')
          },
          {
            hid: 'description',
            name: 'description',
            itemprop: 'description',
            content: `${this.$t('seo.indexDescription')}`
          },
          {
            hid: 'og:title',
            property: 'og:title',
            content: this.$t('seo.tags')
          },
          {
            hid: 'og:description',
            property: 'og:description',
            content: `${this.$t('seo.indexDescription')}`
          }
        ]
      }
  },
  data: () => ({
    showChevron: false
  }),
  async fetch () {
    
    if (!this.$store.state.escorts.init) {
      const now = new Date().toISOString()
      const escorts = await this.$content('escorts')
        .where({ approved: true, until: { $gte: now} })
        .only(['type', 'name', 'name1', 'name2', 'slug', 'media', 'birthTime', 'birthTime1', 'birthTime2', 'agency', 'rate', 'apartment', 'hotel', 'dinner', 'travel', 'area', 'blur', 'createdAt', 'extra', 'head'])
        .fetch()
      const min = minBy(escorts, 'rate').rate
      const max = maxBy(escorts, 'rate').rate
      const deltaStep = (max - min) / 5
      const esmeraldRate = Math.ceil((min + deltaStep) / 100000) * 100000
      const platinumRate = Math.ceil((min + (deltaStep * 2)) / 100000) * 100000
      const palladiumRate = Math.ceil((min + (deltaStep * 3)) / 100000) * 100000
      const diamondRate = Math.ceil((min + (deltaStep * 4)) / 100000) * 100000
      const goldEscorts = escorts.filter(escort => escort.rate < esmeraldRate)
      const esmeraldEscorts = escorts.filter(escort => escort.rate >= esmeraldRate && escort.rate < platinumRate)
      const platinumEscorts = escorts.filter(escort => escort.rate >= platinumRate && escort.rate < palladiumRate)
      const palladiumEscorts = escorts.filter(escort => escort.rate >= palladiumRate && escort.rate < diamondRate)
      const diamondEscorts = escorts.filter(escort => escort.rate >= diamondRate)
      this.$store.commit('escorts/setSteps', [
        {
          value: `${diamondRate}-999999999`,
          name: `diamond`,
          range: `${this.$utils.numberWithDots(diamondRate)} +`
        },
        {
          value: `${palladiumRate}-${diamondRate}`,
          name: `palladium`,
          range: `${this.$utils.numberWithDots(palladiumRate)} - ${this.$utils.numberWithDots(diamondRate)}`
        },
        {
          value: `${platinumRate}-${palladiumRate}`,
          name: `platinum`,
          range: `${this.$utils.numberWithDots(platinumRate)} - ${this.$utils.numberWithDots(palladiumRate)}`
        },
        {
          value: `${esmeraldRate}-${platinumRate}`,
          name: `esmerald`,
          range: `${this.$utils.numberWithDots(esmeraldRate)} - ${this.$utils.numberWithDots(platinumRate)}`
        },
        {
          value: `0-${esmeraldRate}`,
          name: `gold`,
          range: `- ${this.$utils.numberWithDots(esmeraldRate)}`
        },
      ])
      this.$store.commit('escorts/setList', {
        gold: shuffle(goldEscorts),
        esmerald: shuffle(esmeraldEscorts),
        platinum: shuffle(platinumEscorts),
        palladium: shuffle(palladiumEscorts),
        diamond: shuffle(diamondEscorts)
      })
      this.$store.commit('escorts/setInit', true)
      this.$store.commit('filter/setRate', [min, max])
      this.$store.commit('filter/setDefaultRate', [min, max])

      const minAgeEscort = minBy(escorts, o =>  (o.type === 'individual') ? this.$escort.age(o) : Math.min(...[this.$escort.age1(o), this.$escort.age2(o)]) )
      const maxAgeEscort = maxBy(escorts, o =>  (o.type === 'individual') ? this.$escort.age(o) : Math.max(...[this.$escort.age1(o), this.$escort.age2(o)]) )
      const minAge = (minAgeEscort.type === 'individual') ? this.$escort.age(minAgeEscort) : Math.min(...[this.$escort.age1(minAgeEscort), this.$escort.age2(minAgeEscort)])
      const maxAge = (maxAgeEscort.type === 'individual') ? this.$escort.age(maxAgeEscort) : Math.max(...[this.$escort.age1(maxAgeEscort), this.$escort.age2(maxAgeEscort)])
      this.$store.commit('filter/setAge', [minAge, maxAge])
      this.$store.commit('filter/setDefaultAge', [minAge, maxAge])
    }
  },
  // mounted () {
  //   if (!this.$store.state.bookmarks.init) {
  //     const bookmarks = this.$auth.$storage.getCookie('bookmarks')
  //     if (bookmarks && bookmarks.length) this.$store.commit('bookmarks/setList', bookmarks)
  //     this.$store.commit('bookmarks/setInit', true)
  //   }
  //   setInterval(() => {
  //     this.showChevron = (window.pageYOffset > 0) ? true : false
  //   }, 1000)
  // },
  // methods: {
  //   scrollToTop () {
  //     if (process.client) window.scrollTo({ top: 0, behavior: 'smooth' })
  //   }
  // }
}
</script> -->

<style>
.is-tall {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}
.is-tall-container {
  flex: 1;
}
.card {
  border-radius: 6px;
  overflow:hidden;
}
.card-content {
  padding: 0.7em
}
.card-equal-height {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.card-equal-height .card-footer {
  margin-top: auto;
}
.has-new-line {
  white-space: pre-wrap;
}
.is-bottom-right {
  background: none;
  position: fixed;
  bottom: 20px;
  right: 20px;
}
</style>

<!-- <style lang="scss">
.nuxt-content {
  p {
    a {
      text-decoration: underline;
    } 
  }
  ul {
    li {
      a {
        text-decoration: underline;
      }  
    }
  }
  h2 {
    font-size: large;
    a{ 
      span {
        display: none;
      }
    }
  }
  h3 {
    font-size: medium;
    a{ 
      span {
        display: none;
      }
    }
  }
}
</style> -->