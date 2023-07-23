<script setup>
  const nuxtApp = useNuxtApp();
  const isLoading = ref(false);
  nuxtApp.hook("page:start", () => {
    isLoading.value = true;
  });
  nuxtApp.hook("page:finish", () => {
    isLoading.value = false;
  });
</script>

<template>
  <div>
    <OLoading
      :full-page="true"
      v-model:active="isLoading"
      :can-cancel="false"
    >
      <OIcon
        pack="mdi"
        icon="loading"
        size="large"
        spin
      />
    </OLoading>
    <div class="container">
      <div class="hero is-fullheight">
        <div class="hero-body is-justify-content-center">
          <div class="columns is-centered">
            <div class="column is-two-third is-justify-content-center">
              <slot />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

