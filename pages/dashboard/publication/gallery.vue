<script setup>
import { v4 as uuidv4 } from 'uuid';
import * as faceapi from 'face-api.js';

definePageMeta({
  layout: 'empty'
});

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

  await faceapi.nets.tinyFaceDetector.loadFromUri('/faceApi/tiny_face_detector_model-weights_manifest.json');

  const modal = document.getElementById("modal");
  const preview = document.getElementById("preview");
  const input  = document.getElementById('input');

  input.addEventListener('change', event => {

    isLoading.value = true;

    const files = event.target.files;


    for (const file of files) {

      const image = new Image();
      image.src = window.URL.createObjectURL(file);

      image.onload = async () => {

        try {

          let ctxModal = modal.getContext('2d');
          modal.width = image.width;
          modal.height = image.height;
          ctxModal.drawImage(image, 0,0, modal.width, modal.height);

          const detections = await faceapi.detectAllFaces(image, new faceapi.TinyFaceDetectorOptions());

          if (store.gallery.blur) {

            detections.forEach(detection => {

              const box = {
                spread: 10,
                x: parseInt(detection.box.x.toString()),
                y: parseInt(detection.box.y.toString()),
                width: parseInt(detection.box.width.toString()),
                height: parseInt(detection.box.height.toString())
              }

              ctxModal.filter = 'blur('+ box.spread +'px)';
              ctxModal.drawImage(modal, box.x, box.y, box.width, box.height, box.x, box.y, box.width, box.height);
              ctxModal.filter = 'none';
              ctxModal.fillStyle = 'rgba(255,255,255,0.2)';
              ctxModal.fillRect(box.x, box.y, box.width, box.height);
            });
          }

          const applyWatermark = (txt) => {
            ctxModal.translate(- modal.width, 0);
            ctxModal.rotate( - Math.PI / 4);
            ctxModal.font = "20px Arial";
            ctxModal.fillStyle = 'rgba(128, 128, 128, 0.5)';
            var txtHeight = 25;
            var offset = 25;
            var w = Math.ceil(ctxModal.measureText(txt).width);
            var txt = new Array(w * 10).join(txt + '     ');
            for (var i = 0; i < Math.ceil(modal.height * 2 / txtHeight); i++) {
              ctxModal.fillText(txt, -(i * offset), i * txtHeight);
            }
          }
          applyWatermark('ParaguayXP');

          const ctxPreview = preview.getContext("2d");
          preview.width = 288;
          preview.height = 288;
          ctxPreview.drawImage(modal, - parseInt(detections.length ? detections[0].box.x.toString() : modal.width / 2), - parseInt(detections.length ? detections[0].box.y.toString() : modal.height / 2));

          const id = uuidv4();

          const modalDataUrl = modal.toDataURL('image/webp', 0.6);
          const previewDataUrl = preview.toDataURL('image/webp', 0.3);
          
          temps.value.push({
            id,
            type: 'image',
            preview: previewDataUrl
          })

          await postMedia(id, 'modal', modalDataUrl);
          await postMedia(id, 'preview', previewDataUrl);

          if (Array.from(files).indexOf(file) === files.length - 1) isLoading.value = false;
            
        } catch (error) {

          console.log('error', error);
        }
      }
    }
  })
});

const postMedia = async (id, path, base64String) => {

  await useFetch(`/api/dashboard/publication/${id}`, {
    key: `post-${path}-${id}`,
    method: 'POST',
    headers: {
      'Content-Type': 'image/webp'
    },
    body:{ 
      content: base64String,
      path: `public/gallery/${path}`,
      message: `add ${path} image ${id}`
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
    <canvas id="modal" class="is-hidden-tablet is-hidden-mobile" /> 
    <canvas id="preview" class="is-hidden-tablet is-hidden-mobile" /> 
    <div class="ltr-full-body">
      <LayoutNavbar />
      <main class="ltr-main-content">
        <OLoading :full-page="true" v-model:active="isLoading" iconSize="large"/>
        <div class="container">
          <section class="section">
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
                    accept="image/*"
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
          </section>
        </div>
      </main>
      <LayoutFooter />
    </div>
  </NuxtLayout>
</template>

