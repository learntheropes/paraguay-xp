<script setup>
definePageMeta({
  layout: 'dashboard'
});

const isLoading = ref(false);
const store = usePublicationStore();

const { 
  locale,
  t 
} = useI18n();

const error = computed(() => {
  return (!store.accept) ? t('error.publish') : null
});

const acceptText = computed(() => (store.accept) ? t('dashboard.gallery.yes') : t('dashboard.gallery.no'));

const goPrevious = async () => {

await navigateTo(`/${locale.value}/dashboard/publication/gallery`);
}

const publish = async () => {

  if (!store.accept) return;

  if (!store.age.dateOfBirth || !store.age.idFront || !store.age.idBack) {
    throw createError({
      statusCode: 500,
    });
  }

  isLoading.value = true;
  const { data } = useAuth();

  const slug = `${store.registry.basic.name.replace(/\s/, '-').toLowerCase()}-${data.value.user.email.replace('+', '')}`;

  await useFetch(`/api/dashboard/publication/${slug}.json`, {
    method: 'POST',
    body: {
      content: store.age,
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
    slug: slug,
    dateOfBirth: store.age.dateOfBirth,
    name: store.registry.basic.name,
    agency: store.registry.basic.agency,
    rate: store.registry.rate,
    title: store.description.title,
    services: store.registry.services,
    extra: store.registry.extra,
    cover: {
      id: store.gallery.medias[0].id,
      preview: store.gallery.medias[0].preview
    }
  }

  await useFetch(`/api/dashboard/publication/${publication.slug}.json`, {
    method: 'POST',
    body: {
      content: publication,
      path: `content/escorts`,
      message: `create content/escorts/${slug}.json`
    },
  });

  isLoading.value = false;

  await navigateTo(`/${locale.value}/dashboard`);

}
</script>

<template>
  <NuxtLayout>
    <div class="columns is-centered">
      <div class="column is-one-third">
          <OField
            :label="$t('dashboard.publish.accept')"
            :variant="error ? 'danger' : null"
            :message="error ? error : null"
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