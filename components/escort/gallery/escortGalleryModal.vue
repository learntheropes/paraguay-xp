<script setup>
  import { Watermark } from '@watermarkify/vue-watermark'

  const watermarkOptions = ref({
    content: 'Paraguay XP',
    gap: [20, 20],
    offset: [10, 10],
    zIndex: 5,
    rotate: -20,
  })

  const isModalActive = ref(false);
  const modalType = ref(null);
  const modalGallery = ref([]);
  const modalIndex = ref(0);
  const modalSrc = ref(null);
  const { $listen } = useNuxtApp();

  $listen('openModal', ({ medias, index }) => {
    console.log('openModal')
    isModalActive.value = true;
    modalType.value = medias[index].type;
    modalGallery.value = medias;
    modalIndex.value = index;
    modalSrc.value = medias[index].id;
  });

  const isLoading = ref(true);

  const onLoad = () => {
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
    modalIndex.value = (modalIndex.value - 1 < 0) ? modalGallery.value.length - 1 : modalIndex.value - 1; 
    modalType.value = modalGallery.value[modalIndex.value].type;
    modalSrc.value = modalGallery.value[modalIndex.value].id;
  };

  const navigateNext = () => {

    onUnload();
    modalIndex.value = (modalIndex.value + 1 >=  modalGallery.value.length) ? 0:  modalIndex.value + 1;
    modalType.value = modalGallery.value[modalIndex.value].type;
    modalSrc.value = modalGallery.value[modalIndex.value].id;
  };

  const onSwipe = (direction) => {

    if (direction === 'left') navigateNext();
    else if (direction === 'right') navigatePrevious();
  };
</script>

<template>
  <OModal v-model:active="isModalActive" :onCancel="closeModal" :canCancel="['escape', 'x']">
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
      <Watermark :options="watermarkOptions">
        <figure 
          class="image"
          v-if="modalType === 'image'"
        >
          <img
            loading="lazy"
            @load="onLoad"
            :src="'/gallery/modal/' + modalSrc"
            :class="($device.isMobile) ? 'ltr-fit-mobile' : 'ltr-fit-tablet'"
          />
          <OIcon
            v-if="isLoading"
            pack="mdi"
            icon="loading"
            size="large"
            spin
            class="is-overlay is-fixed-center"
          />
        </figure>
        <video
          v-else
          @canplay="onLoad"
          autoplay
          muted
          playsInline
          :class="($device.isMobile) ? 'ltr-fit-mobile' : 'ltr-fit-tablet'"
        >
          <source
            :src="'/gallery/modal/' + modalSrc"
          />
        </video>
      </Watermark>
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
</template>

<style>
.mdi-close {
  color: white;
}
.mdi-loading {
  color: white;
}
</style>

<style scoped>
/* .ltr-is-center-center {
  min-height: 100px;
  min-width: 100px;
} */
.is-fixed-center {
  min-height: 48px;
  min-width: 48px;
  position: fixed;
  left: 50%;
  top: 50%;
  margin-top: -24px;
  margin-left: -24px;
}
</style>