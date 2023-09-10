<script setup>
definePageMeta({
  layout: 'dashboard'
});

const {
  query: {
    name,
    dateOfBirth
  }
} = useRoute();

const { data } = useAuth();

const publications = await queryContent('escorts')
  .where({
    phone: data.value.user.email
  })
  .find();

const agency = (publications.length) ? publications[0].registry.basic.agency : null;

const activeTab = ref(3);
onMounted(() => (activeTab.value = 0));
</script>

<template>
  <NuxtLayout>
    <OTabs v-model="activeTab" multiline>
      <OTabItem :value="0" :label="$t('dashboard.publications')">
        <DashboardPublications :publications="publications" :name="name" :dateOfBirth="dateOfBirth" />
      </OTabItem>
      <OTabItem v-if="agency" :value="1" :label="$t('agency.singolar')">
        <DashboardAgency :agency="agency" />
      </OTabItem>
      <OTabItem :value="2" :label="$t('dashboard.payments') + ' (2024)'" disabled>
        Coming in 2024
      </OTabItem>
      <OTabItem :value="3" label="" disabled />
    </OTabs>
  </NuxtLayout>
</template>
