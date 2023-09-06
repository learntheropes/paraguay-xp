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
  const modalSlug = ref(null);
  const modalType = ref(null);
  const modalGallery = ref([]);
  const modalIndex = ref(0);
  const modalSrc = ref(null);
  const { $listen } = useNuxtApp();

  $listen('openModal', ({ slug, medias, index }) => {
    isModalActive.value = true;
    modalSlug.value = slug;
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
            :src="'/gallery/' + modalSlug + '/modal/' + modalSrc"
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
        <div v-else>
          <video
            @canplay="onLoad"
            :controls="!isLoading"
            autoplay
            muted
            playsInline
            :class="($device.isMobile) ? 'ltr-fit-mobile' : 'ltr-fit-tablet'"
          >
            <source
              :src="'/gallery/' + modalSlug + '/modal/' + modalSrc"
            />
          </video>
          <OIcon
            v-if="isLoading"
            pack="mdi"
            icon="loading"
            size="large"
            spin
            class="is-overlay is-fixed-center"
          />
        </div>
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
.is-fixed-center {
  .mdi-loading {
    color: white;
  }
}
</style>

<style scoped>
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