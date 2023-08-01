<script setup>
import find from 'lodash.find';
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

const cover = find(medias, { fileType: 'image' });

const isLoading = ref(true);
const isConfirmActive = ref(false);

const onImgLoad = () => {
  isLoading.value = false;
};

const { $dayjs } = useNuxtApp();

const { locale } = useI18n();

const store = usePublicationStore();

const editAdv = async () => {

  const { data: ids } = await useFetch(`api/dashboard/age/${slug}`);
  const escort = await queryContent('escorts', slug).findOne();
  const publication = merge(escort, { age: { ids }});
  store.setPublication(publication);
  await navigateTo(`/${locale.value}/dashboard/publication/1`);
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
      <div @click="editAdv" class="card-image">
        <figure :style="'background-color:black;'" class="image is-square">
          <OLoading :full-page="false" v-model:active="isLoading" />
          <NuxtImg
            preset="preview"
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
        <div @click="editAdv" class="content">
          <p class="title is-5 is-capitalized">
            {{ name }}&nbsp;
            <span class="is-hidden-mobile">({{ $dayjs(new Date()).diff(dateOfBirth, 'years') }})</span>
          </p>
          <p class="subtitle is-6 is-capitalized">
            {{$t('dashboard.publication.activeUntil')}} {{ $dayjs(until).format('DD/MM/YY') }}<br>
            ({{ $dayjs(until).fromNow(true) }})
          </p>
        </div>
      </div>
      <footer class="card-footer">
        <div @click="confirmRemoveAdv" class="card-footer-item">
          <OIcon icon="close-circle" size="large"></OIcon>
        </div>
        <div @click="editAdv" class="card-footer-item">
          <OIcon icon="pencil" size="large"></OIcon>
        </div>
      </footer>
    </div>
    <OModal v-model="isConfirmActive" :width="200" scroll="keep">
      <div class="card">
        <div class="card-content">
          <div class="content">{{ $t('dashboard.publication.deleteConfirm')}}</div>
        </div>
        <footer class="card-footer">
          <div @click="closeConfirm" class="card-footer-item">{{ $t('dashboard.publication.cancel')}}</div>
          <div @click="removeAdv" class="card-footer-item">{{ $t('dashboard.publication.confirm')}}</div>
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
