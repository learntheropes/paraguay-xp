<script setup>
import maxBy from 'lodash.maxby'
import minBy from 'lodash.minby'
import shuffle from 'lodash.shuffle'

const i18nHead = useLocaleHead({})
useHead({
  htmlAttrs: {
    lang: (i18nHead) ? i18nHead.value.htmlAttrs.lang : null
  },
  link: [...(i18nHead.value.link || [])],
  meta: [...(i18nHead.value.meta || [])]
})

const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: 'id',
  addSeoAttributes: true
})

const store = useEscortsStore();

if (!store.init) {

  const escorts = await queryContent('escorts')
  .where({
    until:{
      $gte: new Date()
    }
  })
  .only([
    'name', 
    'slug', 
    'media', 
    'birthTime', 
    'agency', 
    'rate', 
    'apartment', 
    'hotel', 
    'dinner', 
    'travel', 
    'area', 
    'blur', 
    'updatedAt', 
    'extra', 
    'head'
  ])
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

  store.setLevels([
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
  <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">
    <Head>
      <template v-for="link in head.link" :key="link.id">
        <Link :id="link.id" :rel="link.rel" :href="link.href" :hreflang="link.hreflang" />
      </template>
      <template v-for="meta in head.meta" :key="meta.id">
        <Meta :id="meta.id" :property="meta.property" :content="meta.content" />
      </template>
    </Head>
    <Body>
      <div class="full-body">
        <LayoutNavbar />
        <main class="main-content">
          <slot />
        </main>
        <!-- <div v-if="showChevron" class="is-hidden-mobile is-bottom-right">
          <b-tooltip :label="$t('scrollToTop')" position="is-left">
            <b-icon icon="chevron-up" type="is-black" size="is-medium" @click.native="scrollToTop"></b-icon>
          </b-tooltip>
        </div> -->
        <LayoutFooter />
      </div>
    </Body>
  </Html>
</template>

<!-- <script>
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
@media screen and (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

.full-body {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}
.main-content {
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
p a {
  text-decoration: underline;
}
li a {
  text-decoration: underline;
}
.content h2 {
  font-size: 1.25rem;
}
.content h3 {
  font-size: 1rem;
}
</style>
