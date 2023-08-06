<script setup>
import merge from 'lodash.merge';
import { NotificationProgrammatic } from "@oruga-ui/oruga-next";

const {
  publication,
} = defineProps({
  publication: {
    type: Object,
    required: true
  }
});

const {
  age: {
    dateOfBirth
  },
  gallery: {
    medias
  },
  registry: {
    basic: {
      name
    }
  },
  slug,
  until
} = publication;

const cover = medias[0];

const isLoading = ref(true);
const isConfirmActive = ref(false);

const onImgLoad = () => {
  isLoading.value = false;
};

const { $dayjs } = useNuxtApp();

const { locale } = useI18n();

const store = usePublicationStore();

const editAdv = async () => {

  const { data: age } = await useFetch(`api/dashboard/publication/${slug}`, {
    query: {
      path: 'content/age'
    }
  });
  const escort = await queryContent('escorts', slug).findOne();
  const publication = merge(escort, { age });
  store.setPublication(publication);
  await navigateTo(`/${locale.value}/dashboard/publication/registry`);
};

const removeAdv = async () => {

  await useFetch(`/api/dashboard/publication/${slug}`, {
    method: 'delete'
  });

  isConfirmActive.value = false;
  NotificationProgrammatic.open(t('dashboard.publication.publicationDelated'));
};

const confirmRemoveAdv = () => {

  isConfirmActive.value = true;
};

const closeConfirm = () => {

  isConfirmActive.value = false;
};
</script>

<template>
  <div>
    <div class="card card-equal-height">
      <div @click.native="editAdv" class="card-image">
        <figure :style="'background-color:black;'" class="image is-square">
          <OLoading :full-page="false" v-model:active="isLoading" />
          <img
            :src="('/gallery/preview/' + cover.fileName).split('.')[0] + '.webp'"
            :alt="$t('escort.gallery.previewOf') + ' ' + name"
            :title="$t('escort.gallery.previewOf') + ' ' + name"
            loading="lazy"
            width="288"
            height="288"
            @load="onImgLoad"
          />
        </figure>
      </div>
      <div class="card-content">
        <div @click.native="editAdv" class="content">
          <p class="title is-5">
            <span class="is-capitalized">{{ name }}</span>
            &nbsp;
            <span class="is-hidden-mobile">({{ $dayjs(new Date()).diff(dateOfBirth, 'years') }})</span>
          </p>
          <p class="subtitle is-6">
            {{$t('dashboard.publication.activeUntil')}} {{ $dayjs(until).format('DD/MM/YY') }}<br>
          </p>
        </div>
      </div>
      <footer class="card-footer">
        <div @click.native="confirmRemoveAdv" class="card-footer-item">
          <OIcon icon="close-circle" size="large"></OIcon>
        </div>
        <div @click.native="editAdv" class="card-footer-item">
          <OIcon icon="pencil" size="large"></OIcon>
        </div>
      </footer>
    </div>
    <OModal v-model:active="isConfirmActive" :width="200" scroll="keep">
      <div class="card">
        <div class="card-content">
          <div class="content">{{ $t('dashboard.publication.deleteConfirm')}}</div>
        </div>
        <footer class="card-footer">
          <div @click.native="closeConfirm" class="card-footer-item">{{ $t('dashboard.publication.cancel')}}</div>
          <div @click.native="removeAdv" class="card-footer-item">{{ $t('dashboard.publication.confirm')}}</div>
        </footer>      
      </div>
    </OModal>
  </div>
</template>

<style>
.is-white {
  color: white;
}
</style>
