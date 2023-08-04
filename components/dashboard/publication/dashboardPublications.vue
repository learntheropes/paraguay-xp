<script setup>
const { data } = useAuth();

const publications = await queryContent('escorts')
  .where({
    phone: data.value.user.email
  })
  .find();
</script>

<template>
  <div>
    <div class="columns is-mobile is-multiline">
      <div v-for="publication in publications" :key="publication.slug" class="column is-full-mobile is-one-third-tablet is-one-quarter-desktop is-one-fifth-fullhd">
        <DashboardExistingPublicationCard :publication="publication" class="card-equal-height" />
      </div>
      <div class="column is-full-mobile is-one-third-tablet is-one-quarter-desktop is-one-fifth-fullhd">
        <DashboardNewPublicationCard class="card-equal-height" />
      </div>
    </div>
  </div>
</template>