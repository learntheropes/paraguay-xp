<script setup>
definePageMeta({
  auth: false,
});

const { t } = useI18n();

const {
  params: {
    slug
  }
} = useRoute();

const { $capitalize } = useNuxtApp();

const agency = (slug === 'indipendent') ? 'indipendent' : $capitalize(decodeURIComponent(slug).replace(/-/g,' ').toLowerCase());

const {
  public: {
    seoTitle
  }
} = useRuntimeConfig();

const title = (agency === 'indipendent') ? t('agency.title') : t('agency.titleAgency', { agency });

const description = (agency === 'indipendent') ? t('agency.description') : t('agency.descriptionAgency', { agency });

useHead({
  title: title + seoTitle,
  meta: [
    {
      id: 'description',
      name: 'description',
      content: description
    },
    {
      id: 'og:title',
      name: 'og:title',
      content: title + seoTitle
    },
    {
      id: 'og:description',
      name: 'og:description',
      content: description
    },
  ],
});
const { phone } = await queryContent('escorts').where({ registry: { basic: { agency: decodeURIComponent(slug).replace(/-/g,' ')}}}).findOne();
const message = encodeURIComponent(`Hola *${$capitalize(title)}*. He visto su pagina en *ParaguayXP*. Me gustaria recibir mas informacion cerca las chicas`);
const whatsappUrl = `https://api.whatsapp.com/send/?phone=${phone.replace('+','')}&text=${message}`;

const { $listen } = useNuxtApp();
$listen('agencyEscorts', escorts => {

  const all = Object.keys(escorts).reduce((arr, level) => {

    escorts[level].forEach(escort => arr.push(escort));
    return arr;
  }, []);

  const { $jsonld } = useNuxtApp();
  useJsonld(() => ([
    $jsonld.logo(),
    $jsonld.organization(),
    $jsonld.website(),
    $jsonld.indexWebPage(),
    $jsonld.agencyCollection(slug, title, all),
  ]));
})
</script>

<template>
  <NuxtLayout>
    <div class="container">
      <div class="columns is-vcentered">
        <div class="column is-half">
          <h1 class="title is-3">{{ title }}</h1>
          <p class="subtitle is-5">{{ description }}</p>
        </div>
        <div v-if="slug !== 'indipendent'" class="column is-half">
          <div class="columns is-mobile is-justify-content-right is-vcentered">
            <div class="column is-narrow is-justify-content-right is-hidden-mobile">
              <p class="title is-3 is-capitalized has-text-right">{{ phone.replace('+595',0) }}</p>
              <p class="subtitle is-5 has-text-right">{{ phone }}</p>
            </div>
            <div class="column is-narrow is-justify-content-right has-text-righ">
              <a :href="whatsappUrl" target="_blank" aria-label="send whatsapp">
                <span class="icon is-large"><i class="mdi mdi-72px mdi-whatsapp"></i></span>
              </a>
            </div>
          </div>     
        </div>
      </div>
      <AgencyLevels :agency="agency" />
      <CollectionNavigator :slug="slug" />
    </div>
  </NuxtLayout>
</template>