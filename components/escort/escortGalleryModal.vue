<script setup>
  const isModalActive = ref(false);
  const modalGallery = ref([]);
  const modalType = ref(null)
  const modalIndex = ref(0);
  const modalMedia = ref(null);
  const videoControls = ref(false)
  const { $listen } = useNuxtApp();

  $listen('openModal', ({ gallery, index }) => {

    isModalActive.value = true;
    modalGallery.value = gallery;
    modalType.value = gallery[index].fileType;
    modalIndex.value = index;
    modalMedia.value = gallery[index].fileName;
  });

  const showControls = () => {
    videoControls.value = true
  }

  const navigatePrevious = () => {

    modalIndex.value = (modalIndex.value - 1 < 0) ? modalGallery.value.length - 1 : modalIndex.value - 1; 
    modalType.value = modalGallery.value[modalIndex.value].fileType
    modalMedia.value = modalGallery.value[modalIndex.value].fileName;
    if (modalType.value !== 'image') {
      var video = document.getElementById('video');
      video.load();
    }
  };

  const navigateNext = () => {

    modalIndex.value = (modalIndex.value + 1 >  modalGallery.value.length - 1) ? 0:  modalIndex.value + 1;
    modalType.value = modalGallery.value[modalIndex.value].fileType
    modalMedia.value = modalGallery.value[modalIndex.value].fileName;
    if (modalType.value !== 'image') {
      var video = document.getElementById('video');
      video.load();
    }
  };
</script>

<template>
  <div>
    <OModal v-model:active="isModalActive">
      <div class="ltr-is-center-left is-hidden-mobile">
        <OIcon 
          icon="chevron-left" 
          size="large" 
          variant="info" 
          @click.native="navigatePrevious"
        />
      </div>
      <div class="ltr-is-bottom-left is-hidden-tablet">
        <OIcon 
          icon="chevron-left"
          size="large"
          variant="info"
          @click.native="navigatePrevious"
        />
      </div>
      <figure 
        v-if="modalType === 'image'"
        class="image ltr-corner-rounded"
      >
        <NuxtImg
          preset="modal"
          :src="'/gallery/modal/' + modalMedia"
          class="ltr-fit"
        />
      </figure>
      <!-- @canplay="showControls"
        :controls="videoControls" -->
      <video
        v-else
        id="video"
        class="has-rounded-corners ltr-fit"
        autoplay
        muted
        playsInline
      >
        <source
          :src="'/gallery/modal/' + modalMedia"
        />
      </video>
      <div class="ltr-is-center-right is-hidden-mobile">
        <OIcon
          icon="chevron-right"
          size="large"
          variant="info"
          @click.native="navigateNext"
        />
      </div>
      <div class="ltr-is-bottom-right is-hidden-tablet">
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

<style>
.ltr-is-48by48-white svg {
  color: white;
  min-width: 32px;
  min-height: 32px;
}
</style>