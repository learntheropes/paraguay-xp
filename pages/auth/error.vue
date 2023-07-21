<script setup>
definePageMeta({
  layout: 'auth',
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: `/dashboard`,
  }
});
const { query: { error } } = useRoute();

const { t } = useI18n();

let message
switch(error) {
  case 'Configuration':
    message = t('error.configuration')
    break;
  case 'AccessDenied':
    message = t('error.accessDenied')
    break;
  case 'Verification':
    message = t('error.verification')
    break;
  default:
    message = t('error.generic')
}
</script>

<template>
  <NuxtLayout>
    <div>{{ message }}</div>
  </NuxtLayout>
</template>