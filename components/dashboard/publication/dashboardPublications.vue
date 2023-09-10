<script setup>
const {
  publications,
  name,
  dateOfBirth
} = defineProps({
  publications: {
    type: Array || null,
  },
  name: {
    type: String || null,
  },
  dateOfBirth: {
  }
});
</script>

<template>
  <div>
    <div class="columns is-mobile is-multiline">
      <div v-for="publication in publications" :key="publication.slug" class="column is-half-mobile is-one-third-tablet is-one-quarter-desktop is-one-fifth-fullhd">
        <DashboardExistingPublicationCard :publication="publication" class="card-equal-height" />
      </div>
      <div v-if="name && dateOfBirth" class="column is-half-mobile is-one-third-tablet is-one-quarter-desktop is-one-fifth-fullhd">
        <DashboardTempPublicationCard :name="name" :dateOfBirth="dateOfBirth" class="card-equal-height" />
      </div>
      <div class="column is-half-mobile is-one-third-tablet is-one-quarter-desktop is-one-fifth-fullhd">
        <DashboardNewPublicationCard class="card-equal-height" />
      </div>
    </div>
  </div>
</template>