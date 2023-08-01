<script setup>
import pathPolyfill from 'path'
import * as faceapi from 'face-api.js';


  const isModalActive = ref(false);
  const modalGallery = ref([]);
  const modalType = ref(null)
  const modalIndex = ref(0);
  const modalSrc = ref(null);
  const { $listen } = useNuxtApp();

  $listen('openModal', ({ medias, index }) => {

    isModalActive.value = true;
    modalGallery.value = medias;
    modalType.value = medias[index].fileType;
    modalIndex.value = index;
    modalSrc.value = medias[index].fileName;
  });

  const isLoading = ref(true);

  const onLoad = () => {
    blurImage()
    isLoading.value = false;
  };

  const onUnload = () => {
    isLoading.value = true
  }

  const closeModal = () => {
    isModalActive.value = false
    isLoading.value = true
  }

  const navigatePrevious = () => {

    onUnload();
    isBlurred.value = false;
    modalIndex.value = (modalIndex.value - 1 < 0) ? modalGallery.value.length - 1 : modalIndex.value - 1; 
    modalType.value = modalGallery.value[modalIndex.value].fileType;
    modalSrc.value = modalGallery.value[modalIndex.value].fileName;

    if (modalType.value !== 'image') {

      const video = document.getElementById('video');
      if (video) video.load();
    }

  };

  const navigateNext = () => {

    onUnload();
    isBlurred.value = false;
    modalIndex.value = (modalIndex.value + 1 >=  modalGallery.value.length) ? 0:  modalIndex.value + 1;
    modalType.value = modalGallery.value[modalIndex.value].fileType
    modalSrc.value = modalGallery.value[modalIndex.value].fileName;

    if (modalType.value !== 'image') {
      
      const video = document.getElementById('video');
      if (video) video.load();
    }
  };

  const onSwipe = (direction) => {

    if (direction === 'left') navigateNext();
    else if (direction === 'right') navigatePrevious();
  };

  const isBlurred = ref(false);

  const blurImage = async () => {

    if (!isBlurred.value && process.client) {

      const canvas = document.getElementById("canvas");
      const image = document.getElementById("image");

      // ssdMobilenetv1 is slower but most accurate
      await faceapi.nets.tinyFaceDetector.loadFromUri('/faceApi/tiny_face_detector_model-weights_manifest.json');
      const detections = await faceapi.detectAllFaces(image, new faceapi.TinyFaceDetectorOptions());

      let ctx = canvas.getContext('2d');
      canvas.width = image.clientWidth;
      canvas.height = image.clientHeight;
      ctx.drawImage(image, 0,0, canvas.width, canvas.height); 

      detections.forEach(detection => {
        let box = {
          spread: 10,
          x: parseInt(detection.box.x.toString()),
          y: parseInt(detection.box.y.toString()),
          width: parseInt(detection.box.width.toString()),
          height: parseInt(detection.box.height.toString())
        }
        ctx.filter = 'blur('+ box.spread +'px)';
        ctx.drawImage(canvas, box.x, box.y, box.width, box.height, box.x, box.y, box.width, box.height);
        ctx.filter = 'none';
        ctx.fillStyle = 'rgba(255,255,255,0.2)';
        ctx.fillRect(box.x, box.y, box.width, box.height);
      })

      function draw(txt) {
        ctx.translate(- canvas.width, 0);
        ctx.rotate( - Math.PI / 4);
        ctx.font = "20px Arial";
        ctx.fillStyle = 'rgba(128, 128, 128, 0.5)';
        var txtHeight = 25;
        var offset = 25;
        var w = Math.ceil(ctx.measureText(txt).width);
        var txt = new Array(w * 10).join(txt + '     ');
        for (var i = 0; i < Math.ceil(canvas.height * 2 / txtHeight); i++) {
          ctx.fillText(txt, -(i * offset), i * txtHeight);
        }
      }
      draw('Paraguay XP');
      isBlurred.value = true
      image.src = canvas.toDataURL();
      console.log('done')
    }
  }
</script>

<template>
  <div>
    <canvas id="canvas"></canvas>
    <OModal v-model:active="isModalActive" :onCancel="closeModal" :canCancel="true">
      <div class="ltr-is-center-left is-hidden-mobile">
        <OIcon 
          icon="chevron-left" 
          size="large" 
          variant="info" 
          @click.native="navigatePrevious"
        />
      </div>
      <div class="ltr-is-fixed-bottom-left is-hidden-tablet">
        <OIcon 
          icon="chevron-left"
          size="large"
          variant="info"
          @click.native="navigatePrevious"
        />
      </div>
      <div class="ltr-is-center-center" v-touch:swipe="onSwipe">
        <OLoading
          :full-page="false"
          v-model:active="isLoading"
          iconClass="ltr-is-white"
          overlayClass="ltr-is-transparent"
        />
        <div class="is-hidden-tablet">
          <figure 
            v-if="modalType === 'image'"
            class="image"
          >
            <img
              preset="modal"
              loading="lazy"
              @load="onLoad"
              :src="'/gallery/modal/' + modalSrc"
              class="ltr-fit-mobile reload"
            />
          </figure>
          <video
            v-else
            id="video"
            class="ltr-fit-mobile"
            @canplay="onLoad"
            :controls="false"
            autoplay
            loop
            muted
            playsInline
          >
            <source :src="'/gallery/modal/' + modalSrc" />
          </video>
        </div>
        <div class="is-hidden-mobile">
          <figure 
            v-if="modalType === 'image'"
            class="image"
          >
            <img
              id="image"
              preset="modal"
              loading="lazy"
              @load="onLoad"
              :src="'/gallery/modal/' + modalSrc"
            />
          </figure>
          <video
            v-else
            id="video"
            class="ltr-fit-tablet"
            @canplay="onLoad"
            :controls="false"
            autoplay
            loop
            muted
            playsInline
          >
            <source :src="'/gallery/modal/' + modalSrc" />
          </video>
        </div>
      </div>
      <div class="ltr-is-center-right is-hidden-mobile">
        <OIcon
          icon="chevron-right"
          size="large"
          variant="info"
          @click.native="navigateNext"
        />
      </div>
      <div class="ltr-is-fixed-bottom-right is-hidden-tablet">
        <OIcon 
          icon="chevron-right" 
          size="large" 
          variant="info" 
          @click.native="navigateNext"
        />
      </div>
    </OModal>
  </div>
</template>

<style scoped>
.ltr-is-center-center {
  min-height: 100px;
  min-width: 100px;
}
</style>