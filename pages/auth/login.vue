<script setup>
import find from 'lodash.find';
import {
  locales,
  defaultLocale,
} from '~/assets/js/locales';

definePageMeta({
  layout: "auth",
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: (locale) => `/${locale}/dashboard`
  }
});

const {
  fullPath,
  path,
  query
} = useRoute();

const locale = (
  query
  && query.callbackUrl
  && find(locales, { code: query.callbackUrl.split('/')[3] })
)
  ? query.callbackUrl.split('/')[3]
  : defaultLocale;
  
if (locale !== 'en' && path === '/en/auth/login') navigateTo(fullPath.replace(`/en/auth/login`, `/${locale}/auth/login`));

const {
  public: {
    deploymentDomain
  }
} = useRuntimeConfig();

const { signIn } = useAuth();

const phone = ref(null);
const showPhone = ref(true);
const token = ref(null);

const sendWhatsapp = async () => {
  try {

    await signIn('whatsapp', {
      email: phone.value,
      redirect: false,
      callbackUrl: `/${locale}/dashboard`,
    });

    showPhone.value = false
  } catch (error) {
    navigateTo(`/${locale}/auth/error`)
  }
};
const verifyCode = () => {

  const route = `/api/auth/callback/whatsapp?callbackUrl=${encodeURIComponent(query.callbackUrl)}&token=${encodeURIComponent(token.value)}&email=${encodeURIComponent(phone.value)}`;
  
  navigateTo(`${deploymentDomain}${route}`, {
    external: true,
    redirectCode: 200
  });
}
</script>

<template>
  <NuxtLayout>
    <h1>Login</h1>
    <form v-if="showPhone" @submit.prevent="sendWhatsapp">
      <input v-model="phone" />
      <input type="submit" :value="$t('auth.sendWhatsapp')" />
    </form>
    <form v-else @submit.prevent="verifyCode">
      <input v-model="token" />
      <input type="submit" :value="$t('auth.verifyCode')" />
    </form>
  </NuxtLayout>
</template>
