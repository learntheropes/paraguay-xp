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
});

const store = useEscortsStore();

if (!store.init) {

  const escorts = await queryContent('escorts')
  .where({
    approved: {
      $eq: true
    },
    until:{
      $gte: new Date()
    }
  })
  .only([
    'preview', 
    'updatedAt' 
  ])
  .find();

  const min = minBy(escorts, e => parseInt(e.preview.rate)).preview.rate;
  const max = maxBy(escorts, e => parseInt(e.preview.rate)).preview.rate;
  store.setMin(min);
  store.setMax(max);
  
  const deltaStep = (max - min) / 5;
  const esmeraldRate = Math.ceil((min + deltaStep) / 100000) * 100000;
  const platinumRate = Math.ceil((min + (deltaStep * 2)) / 100000) * 100000;
  const palladiumRate = Math.ceil((min + (deltaStep * 3)) / 100000) * 100000;
  const diamondRate = Math.ceil((min + (deltaStep * 4)) / 100000) * 100000;

  const goldEscorts = escorts.filter(escort => escort.preview.rate < esmeraldRate);
  const esmeraldEscorts = escorts.filter(escort => escort.preview.rate >= esmeraldRate && escort.preview.rate < platinumRate);
  const platinumEscorts = escorts.filter(escort => escort.preview.rate >= platinumRate && escort.preview.rate < palladiumRate);
  const palladiumEscorts = escorts.filter(escort => escort.preview.rate >= palladiumRate && escort.preview.rate < diamondRate);
  const diamondEscorts = escorts.filter(escort => escort.preview.rate >= diamondRate);

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
      <div class="ltr-full-body">
        <LayoutNavbar />
        <main class="ltr-main-content">
          <section class="section">
            <slot />
          </section>
        </main>
        <LayoutFooter />
      </div>
    </Body>
  </Html>
</template>

<style>
@media screen and (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
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
  text-decoration-style: dotted;
  font-weight: 500;
}
li a {
  text-decoration: underline;
  text-decoration-style: dotted;
  font-weight: 500;
}
.button {
  text-decoration: none !important;
}
.content h2 {
  font-size: 1.25rem;
}
.content h3 {
  font-size: 1rem;
}
</style>
