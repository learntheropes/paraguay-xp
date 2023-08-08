<script setup>
definePageMeta({
  layout: 'dashboard'
});

const isLoading = ref(false);
const store = usePublicationStore();

const error = () => {
  if (!store.accept) return t('error.publish')
  else return null;
}

const { 
  locale,
  t 
} = useI18n();

const acceptText = computed(() => (store.accept) ? t('dashboard.gallery.yes') : t('dashboard.gallery.no'));

const goPrevious = async () => {

await navigateTo(`/${locale.value}/dashboard/publication/gallery`);
}

const publish = async () => {

  if (!store.accept) return;

  isLoading.value = true;
  const { data } = useAuth();

  const age = store.age;
  const slug = `${store.registry.basic.name.replace(/\s/, '-').toLowerCase()}-${data.value.user.email.replace('+', '')}`;

  await useFetch(`/api/dashboard/publication/${slug}`, {
    method: 'POST',
    body: {
      content: age,
      path: `content/ages`,
      message: `create content/ages/${slug}.json`
    },
  });

  const publication = {
    phone: data.value.user.email,
    slug: slug,
    accept: store.accept,
    registry: store.registry,
    description: store.description,
    gallery: store.gallery
  }

  publication.preview = {
    dateOfBirth: store.age.dateOfBirth,
    name: store.registry.basic.name,
    agency: store.registry.basic.agency,
    area: store.registry.basic.area,
    rate: store.registry.rate,
    title: store.description.title,
    cover: store.gallery.medias[0],
    slug: store.slug,
  }

  await useFetch(`/api/dashboard/publication/${publication.slug}`, {
    method: 'POST',
    body: {
      content: publication,
      path: `content/escorts`,
      message: `create content/escorts/${slug}.json`
    },
  });

  isLoading.value = false;
}
</script>

<template>
  <NuxtLayout>
    <div class="columns is-centered">
      <div class="column is-one-third">
          <OField
            :label="$t('dashboard.publish.accept')"
            :variant="error() ? 'danger' : null"
            :message="error() ? error() : null"
          >
            <OSwitch v-model="store.accept">{{ acceptText }}</OSwitch>
          </OField>
          <div class="is-7">{{ $t('dashboard.publish.acceptPubication') }}</div>
      </div>
    </div>
    <div class="level is-mobile">
      <div class="level-left">
        <div class="level-item">
          <OField>
            <OButton
              @click.native="goPrevious"
              variant="primary"
              outlined
            >{{  $t('dashboard.publication.previous') }}</OButton>
          </OField>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <OField>
            <OButton
              @click.native="publish"
              variant="primary"
              outlined
            >{{  $t('navbar.publish') }}</OButton>
          </OField>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>