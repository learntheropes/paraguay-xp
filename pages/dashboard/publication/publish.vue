<script setup>
import find from 'lodash.find';
import nuxtStorage from 'nuxt-storage';
import { NotificationProgrammatic } from "@oruga-ui/oruga-next";

definePageMeta({
  layout: 'dashboard'
});

const store = usePublicationStore();

onMounted(() => {
  const publication = nuxtStorage.sessionStorage.getData('publication');
  if (publication) store.setPublication(JSON.parse(publication));
});

const isLoading = ref(false);

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
    approved: false,
    until: new Date('2023-12-31').toISOString(),
    locale: locale.value,
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
      id: find(store.gallery.medias, { type: 'image' }).id
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

  await useFetch(`/api/whatsapp/message/${data.value.user.email}`, {
    method: 'POST',
    body: {
      message: t('dashboard.publication.savedWaitingApproval')
    }
  });

  nuxtStorage.sessionStorage.removeItem('publication');

  isLoading.value = false;

  NotificationProgrammatic.open({
    mwssage: t('dashboard.publication.savedWaitingApproval'),
    duration: 5000
  });

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  await sleep(5000);

  await navigateTo(`/${locale.value}/dashboard?name=${publication.preview.name}&dateOfBirth=${publication.preview.dateOfBirth}`);
}
</script>

<template>
  <NuxtLayout>
    <dasboardPublicationSteps :activeStep="5" />
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