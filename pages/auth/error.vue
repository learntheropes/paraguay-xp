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

const {
  public: {
    deploymentDomain
  }
} = useRuntimeConfig();

const {
  locale,
  t
} = useI18n();

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

const tryAgain = async () => {
  // const router = useRouter();
  // router.back();
  await navigateTo({
  path: `/${locale.value}/auth/login`,
  query: {
    callbackUrl: `${deploymentDomain}/${locale.value}/dashboard`,
    // error: 'undefined'
  }
})
}
</script>

<template>
  <div class="hero is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <p class="content">{{ translatedErrorMessage }}</p>
        <button @click="tryAgain" class="button is-primary is-outlined">{{ $t('error.tryAgain') }}</button>
      </div>
    </div>
  </div>
</template>