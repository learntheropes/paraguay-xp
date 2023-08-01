<script setup>
const { data } = useAuth();

const publications = await queryContent('escorts')
  .where({
    phone: data.value.user.email
  })
  .find();

const isPromoPeriod = new Date() <= new Date(Date.parse('01 Oct 2023'))
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
    <!-- <section class="section">
      <div v-if="isPromoPeriod" class="content has-text-weight-bold">
        {{ $t('oneMonthFree') }}
      </div>
      <div class="content has-text-weight-bold">
        {{ $t('photoSession') }}
      </div>  
    </section>  
    <account-payments :publications="publications" /> -->
  </div>
</template>