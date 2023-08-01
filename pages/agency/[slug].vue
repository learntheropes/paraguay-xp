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

const title = (agency === 'indipendent') ? t('agency.titleIndipendent') : t('agency.title', { agency });

const description = (agency === 'indipendent') ? t('agency.descriptionIndipendent') : t('agency.description', { agency });

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
// const { phone } = await queryContent('escorts').where({ registr: { basic: { agency: decodeURIComponent(slug).replace(/-/g,' ')}}}).findOne();
// const message = encodeURIComponent(`Hola *${$capitalize(title)}*. He visto su pagina en *ParaguayXP*. Me gustaria recibir mas informacion cerca las chicas`);
// const whatsappUrl = `https://api.whatsapp.com/send/?phone=${phone.replace('+','')}&text=${message}`;
</script>

<template>
  <NuxtLayout>
    {{ phone }}
    <div class="container">
      <h1 class="title is-3">{{ title }}</h1>
      <div class="subtitle is-5">{{ description }}</div>
      <AgencyLevels :agency="agency" />
      <CollectionNavigator :slug="slug" />
    </div>
  </NuxtLayout>
</template>