<script setup>
  const isModalActive = ref(false);
  const modalGallery = ref([]);
  const modalIndex = ref(0);
  const modalSrc = ref(null);
  const { $listen } = useNuxtApp();

  $listen('openModal', ({ medias, index }) => {

    isModalActive.value = true;
    modalGallery.value = medias;
    modalIndex.value = index;
    modalSrc.value = medias[index].modal;
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
    modalSrc.value = modalGallery.value[modalIndex.value].modal;
  };

  const navigateNext = () => {

    onUnload();
    modalIndex.value = (modalIndex.value + 1 >=  modalGallery.value.length) ? 0:  modalIndex.value + 1;
    modalSrc.value = modalGallery.value[modalIndex.value].modal;
  };

  const onSwipe = (direction) => {

    if (direction === 'left') navigateNext();
    else if (direction === 'right') navigatePrevious();
  };
</script>

<template>
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
          class="image"
        >
          <img
            preset="modal"
            loading="lazy"
            @load="onLoad"
            :src="'/gallery/modal/' + modalSrc"
            class="ltr-fit-mobile"
          />
        </figure>
      </div>
      <div class="is-hidden-mobile">
        <figure 
          class="image"
        >
          <img
            id="image"
            preset="modal"
            loading="lazy"
            @load="onLoad"
            :src="modalSrc"
            class="ltr-fit-tablet"
          />
        </figure>
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
</template>

<style scoped>
.ltr-is-center-center {
  min-height: 100px;
  min-width: 100px;
}
</style>