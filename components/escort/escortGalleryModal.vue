<script setup>
  const isModalActive = ref(false);
  const modalGallery = ref([]);
  const modalType = ref(null)
  const modalIndex = ref(0);
  const modalMedia = ref(null);
  const { $listen } = useNuxtApp();

  $listen('openModal', ({ gallery, index }) => {

    isModalActive.value = true;
    modalGallery.value = gallery;
    modalType.value = gallery[index].fileType;
    modalIndex.value = index;
    modalMedia.value = gallery[index].fileName;
  });

  const isLoading = ref(true);

  const changeLoading = (value) => {
    isLoading.value = value
  };

  const navigatePrevious = () => {

    changeLoading(true);
    modalIndex.value = (modalIndex.value - 1 < 0) ? modalGallery.value.length - 1 : modalIndex.value - 1; 
    modalType.value = modalGallery.value[modalIndex.value].fileType
    modalMedia.value = modalGallery.value[modalIndex.value].fileName;
    if (modalType.value !== 'image') {
      const video = document.getElementById('video');
      if (video) video.load();
    }

  };

  const navigateNext = () => {

    changeLoading(true);
    modalIndex.value = (modalIndex.value + 1 >  modalGallery.value.length - 1) ? 0:  modalIndex.value + 1;
    modalType.value = modalGallery.value[modalIndex.value].fileType
    modalMedia.value = modalGallery.value[modalIndex.value].fileName;
    if (modalType.value !== 'image') {
      const video = document.getElementById('video');
      if (video) video.load();
    }
  };
</script>

<template>
  <div>
    <OModal v-model:active="isModalActive" :onCancel="changeLoading(true)">
      <div class="ltr-is-center-left is-hidden-mobile">
        <OIcon 
          icon="chevron-left" 
          size="large" 
          variant="info" 
          @click.native="navigatePrevious"
        />
      </div>
      <div class="is-overlay ltr-is-center-center">
        <OIcon
          v-if="isLoading"
          pack="mdi"
          icon="loading"
          size="large"
          variant="info"
          spin
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

      <div class="ltr-is-center-center is-hidden-tablet">
        <figure 
          v-if="modalType === 'image'"
          class="image"
        >
          <NuxtImg
            id="image"
            preset="modal"
            loading="lazy"
            :src="'/gallery/modal/' + modalMedia"
            class="ltr-fit-mobile"
            @load="changeLoading(false)"
          />
        </figure>
        <video
          v-else
          id="video"
          class="ltr-fit-mobile"
          @canplay="changeLoading(false)"
          :controls="false"
          autoplay
          loop
          muted
          playsInline
        >
          <source :src="'/gallery/modal/' + modalMedia" />
        </video>
      </div>

      <div class="ltr-is-center-center is-hidden-mobile">
        <figure 
          v-if="modalType === 'image'"
          class="image ltr-fit-tablet"
        >
          <NuxtImg
            id="image"
            preset="modal"
            loading="lazy"
            :src="'/gallery/modal/' + modalMedia"
            class="ltr-fit-tablet"
            @load="changeLoading(false)"
          />
        </figure>
        <video
          v-else
          id="video"
          class="ltr-fit-tablet"
          @canplay="changeLoading(false)"
          :controls="false"
          autoplay
          loop
          muted
          playsInline
        >
          <source :src="'/gallery/modal/' + modalMedia" />
        </video>
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