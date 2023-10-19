<script setup>
const store = usePublicationStore();

const { locale } = useI18n();

const setNewAdv = async () => {

  store.$reset();
  await navigateTo(`/${locale.value}/dashboard/publication/age`);
};

</script>
<template>
  <div class="card card-equal-height">
    <div class="card-image">
      <figure @click.native="setNewAdv" :style="'background-color:black;'" class="image is-square" />
      <div @click.native="setNewAdv" class="is-overlay is-center-center">
        <OIcon icon="plus" size="large" variant="info" />
      </div>
    </div>
    <div class="card-content">
      <div class="content">
        <div class="title is-5">
          <div @click.native="setNewAdv">
            {{ $t('dashboard.publication.newPublication') }}
          </div>
        </div>
        <div class="subtitle is-6">
          <div @click.native="setNewAdv">
            {{ $t('dashboard.publication.addNewPublication') }}
          </div>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <div class="card-footer-item">
        <div @click.native="setNewAdv">
          <OIcon icon="plus-circle" size="large" />
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
a {
  text-decoration: none;
}
.is-center-center {
  min-height: 100px;
  align-items: center;
  justify-content: center;
  display: flex;
}
</style>
