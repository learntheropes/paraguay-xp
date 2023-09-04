<script setup>
import { v4 as uuidv4 } from 'uuid';

definePageMeta({
  layout: 'dashboard'
});

const imageExtensions = [
  "jpg",
  "jpeg",
  "png",
  "gif",
  "bmp",
  "tiff",
  "tif",
  "webp",
  "svg",
  "ico",
];

const videoExtensions = [
  "mp4",
  "avi",
  "mkv",
  "mov",
  "wmv",
  "flv",
  "webm",
  "mpg",
  "mpeg",
  "rm",
  "rmvb",
  "3gp",
  "ts",
  "vob",
  "m2ts",
  "ogv",
  "mts"
];

const store = usePublicationStore();

const { 
  locale,
  t 
} = useI18n();

const blurText = computed(() => (store.gallery.blur) ? t('dashboard.gallery.yes') : t('dashboard.gallery.no'));
const isLoading = ref(false);
let temps = ref([]);

const { $listen } = useNuxtApp();

$listen('removeOne', index => {
  if (index < store.gallery.medias.length) store.removeOneMedia(index)
  else temps.value.splice(index - store.gallery.medias.length, 1);
})

onMounted(async () => {

  const input  = document.getElementById('input');

  const handleFilesSelect = () => {

    isLoading.value = true;

    const files = input.files;

    for (const file of files) {

      const fileExtension = file.name.split('.')[1];
      const fileType = (imageExtensions.indexOf(fileExtension) > -1) ? 'image' : 'video';

      const reader = new FileReader();

      reader.onload = async (event) => {

        const base64DataUrl = event.target.result;

        const id = uuidv4();
          
        temps.value.push({
          id,
          type: fileType,
          preview: base64DataUrl
        });

        await postMedia(id, base64DataUrl, fileType, fileExtension);

        if (Array.from(files).indexOf(file) === files.length - 1) isLoading.value = false;
      };

      reader.readAsDataURL(file);
    }
  }

  input.addEventListener('change', handleFilesSelect);
});

const postMedia = async (id, base64DataUrl, fileType, fileExtension) => {

  await useFetch(`/api/dashboard/publication/_${id}`, {
    key: `post-${id}`,
    method: 'POST',
    headers: {
      'Content-Type': `${fileType}/${fileExtension}`
    },
    body:{ 
      content: base64DataUrl,
      path: `public/gallery/modal`,
      message: `add media _${id}`,
    },
  });
}

const goPrevious = async () => {

  store.concatMedias(temps.value);
  temps.value = [];
  await navigateTo(`/${locale.value}/dashboard/publication/description`);
}

const goNext = async () => {

  store.concatMedias(temps.value);
  temps.value = [];
  await navigateTo(`/${locale.value}/dashboard/publication/publish`);
}
</script>

<template>
  <NuxtLayout>
    <OLoading :full-page="true" v-model:active="isLoading" iconSize="large"/>
    <OField :label="$t('dashboard.gallery.blur')">
      <OSwitch v-model="store.gallery.blur">
        {{ blurText }}
      </OSwitch>
    </OField>
    <div class="columns is-mobile is-multiline">
      <div v-for="(image, index) in store.gallery.medias" :key="image.id" class="column is-half-mobile is-one-third-tablet is-one-quarter-desktop is-one-fifth-fullhd">
        <DashboardPublicationGalleryCard :id="image.id" :src="'/gallery/preview/' + image.id + '.webp'" :index="index" />
      </div>
      <div v-for="(image, index) in temps" :key="image.id" class="column is-half-mobile is-one-third-tablet is-one-quarter-desktop is-one-fifth-fullhd">
        <DashboardPublicationGalleryCard :id="image.id" :src="image.preview" :index="store.gallery.medias.length + index" />
      </div>
      <div class="column is-half-mobile is-one-third-tablet is-one-quarter-desktop is-one-fifth-fullhd">
        <OField class="is-hidden-mobile is-hidden-tablet">
          <input
            id="input"
            ref="input"
            style="display:none"
            type="file"
            accept=".jpg, .jpeg, .png, .gif, .bmp, .tiff, .tif, .webp, .svg, .ico, .mp4, .avi, .mkv, .mov, .wmv, .flv, .webm, .mpg, .mpeg, .rm, .rmvb, .3gp, .ts, .vob, .m2ts, .ogv, .mts"
            multiple
          >
        </OField>
        <div class="card">
          <div class="card-image">
            <figure class="image is-square">
              <img src="/others/white.jpg">
            </figure>
            <div @click.native="$refs.input.click()" class="card-content is-overlay ltr-is-center-center">
              <OIcon icon="plus-circle" size="large" />
            </div>
          </div>
        </div>
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
              @click.native="goNext"
              variant="primary"
              outlined
            >{{  $t('dashboard.publication.next') }}</OButton>
          </OField>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

