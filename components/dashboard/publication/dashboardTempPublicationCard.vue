<script setup>
const {
  name,
  dateOfBirth
} = defineProps({
  name: {
    type: String,
    required: true
  },
  dateOfBirth: {
    required: true
  }
});
</script>

<template>
  <div>
    <div class="card card-equal-height">
      <div class="card-image">
        <figure :style="'background-color:black;'" class="image is-square" />
        <div class="is-overlay is-center-center">
        <OIcon icon="loading" size="large" variant="info" spin/>
      </div>
      </div>
      <div class="card-content">
          <p class="title is-5">
            <span class="is-capitalized">{{ name }}</span>
            &nbsp;
            <span class="is-hidden-mobile">({{ $dayjs(new Date()).diff(dateOfBirth, 'years') }})</span>
          </p>
          <p class="subtitle is-6">
            {{ $t('dashboard.publication.pendindApproval') }}
          </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.is-center-center {
  min-height: 100px;
  align-items: center;
  justify-content: center;
  display: flex;
}
</style>

