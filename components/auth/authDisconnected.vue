<script setup>
const { 
  public: { 
    whatsappAdmin 
  }
} = useRuntimeConfig();

const goBack = () => {
  const router = useRouter();
  router.back();
}
</script>
<template>
  <div class="content is-justify-content-center">
    <div class="block ltr-has-new-line">
      <span>{{ $t('error.disconnected') }}</span>
      &nbsp;
      <NuxtLink :href="'https://wa.me/' + whatsappAdmin.replace('+', '')" target="_blank">{{ whatsappAdmin }}</NuxtLink>
    </div>
    <OButton @click.native="goBack" variant="primary" outlined>{{ $t('auth.goBack') }}</OButton>
  </div>
</template>