<script setup>
  const isModalActive = ref(false);
  const modalGallery = ref([]);
  const modalIndex = ref(0);
  const modalSrc = ref(null);
  // const size = ref(null)
  const { $listen } = useNuxtApp();

  $listen('openModal', ({ medias, index }) => {

    isModalActive.value = true;
    modalGallery.value = medias;
    modalIndex.value = index;
    modalSrc.value = medias[index].id;
  });

  const isLoading = ref(true);

  const onLoad = () => {
    isLoading.value = false;
    // size.value = document.getElementById('img').offsetWidth;
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
    modalSrc.value = modalGallery.value[modalIndex.value].id;
  };

  const navigateNext = () => {

    onUnload();
    modalIndex.value = (modalIndex.value + 1 >=  modalGallery.value.length) ? 0:  modalIndex.value + 1;
    modalSrc.value = modalGallery.value[modalIndex.value].id;
  };

  const onSwipe = (direction) => {

    if (direction === 'left') navigateNext();
    else if (direction === 'right') navigatePrevious();
  };
</script>

<template>
  <OModal v-model:active="isModalActive" onCancel="closeModal">
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
      <!-- <OLoading
        :full-page="false"
        v-model:active="isLoading"
        iconClass="ltr-is-white"
        overlayClass="ltr-is-transparent"
      /> -->
      <figure 
        class="image"
      >
        <img
          loading="lazy"
          @load="onLoad"
          :src="'/gallery/modal/' + modalSrc + '.webp'"
          :class="($device.isMobile) ? 'ltr-fit-mobile' : 'ltr-fit-tablet'"
        />
      </figure>
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
</style>

<style scoped>
.ltr-is-center-center {
  min-height: 100px;
  min-width: 100px;
}
</style>