<script setup>
definePageMeta({
  layout: 'auth',
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: `/dashboard`,
  }
});
const {
  query: {
    error
  }
} = useRoute();

const { t } = useI18n();

let translatedErrorMessage;
switch(error) {
  case 'Configuration':
    translatedErrorMessage = t('error.configuration')
    break;
  case 'AccessDenied':
    translatedErrorMessage = t('error.accessDenied')
    break;
  case 'Verification':
    translatedErrorMessage = t('error.verification')
    break;
  default:
    translatedErrorMessage = t('error.generic')
};

const goBack = () => {
  const router = useRouter();
  router.back();
}
</script>

<template>
  <div class="hero is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <p class="title">{{ translatedErrorMessage }}</p>
        <button @click="goBack" class="button is-primary is-outlined">{{ $t('error.tryAgain') }}</button>
      </div>
    </div>
  </div>
</template>