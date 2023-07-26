<script setup>
import find from 'lodash.find';
import sortBy from 'lodash.sortby'
import {
  locales,
  defaultLocale,
} from '~/assets/js/locales';
import phoneCodes from '~/assets/js/countryPhoneCodes'

definePageMeta({
  layout: "auth",
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: (locale) => `/${locale}/dashboard`
  }
});

const { data } = await useFetch('/api/whatsapp/get-state');

const isWhatsappConnected = data.value.state === 'CONNECTED';

const {
  $i18nCountries
} = useNuxtApp();

const phoneValidationSchema = {
  loginNumber: {
    required: true,
  }
};

const codeValidationSchema = {
  loginCode: {
    required: true,
  }
};

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
  
if (locale !== 'en' && path === '/en/auth/login') await navigateTo(fullPath.replace(`/en/auth/login`, `/${locale}/auth/login`));

const userLocale = useCookie('userLocale', { maxAge: 60 * 10 });
userLocale.value = locale;
const {
  public: {
    deploymentDomain
  }
} = useRuntimeConfig();

const { signIn } = useAuth();

const phone = ref({
  prefix: null,
  number: null
});
const showPhone = ref(true);
const token = ref(null);

onMounted(async () => {
  const { country } = await $fetch('https://api.country.is');
  phone.value.prefix = find(phoneCodes, { code: country }).dial_code;
})

const sendWhatsapp = async () => {
  try {

    await signIn('whatsapp', {
      email: phone.value.prefix + phone.value.number,
      redirect: false,
      callbackUrl: `/${locale}/dashboard`,
    });

    showPhone.value = false
  } catch (error) {
    navigateTo(`/${locale}/auth/error`)
  }
};

const verifyCode = () => {

  const route = `/api/auth/callback/whatsapp?callbackUrl=`
    + `${encodeURIComponent(query.callbackUrl)}`
    + `&token=${encodeURIComponent(token.value)}` 
    + `&email=${encodeURIComponent(phone.value.prefix + phone.value.number)}`;
  
  navigateTo(`${deploymentDomain}${route}`, {
    external: true,
    redirectCode: 200
  });
}
</script>

<template>
  <NuxtLayout>
    <div v-if="isWhatsappConnected">
      <VForm
        v-if="showPhone"
        name="phone"
        :validation-schema="phoneValidationSchema"
        @submit="sendWhatsapp"
      >        
        <VField
          name="loginNumber"
          :label="$t('auth.loginNumber')"
          v-slot="{ handleChange, handleBlur, value, errors }"
          v-model="phone.number"
        >
          <OField
            :label="$t('auth.loginNumber')"
            :variant="errors[0] ? 'danger' : null"
            :message="errors[0] ? errors[0] : ''"
          >
            <OSelect
              v-model="phone.prefix"
              class="is-hidden-tablet"
            >
              <option
                v-for="phoneCode of sortBy(phoneCodes, 'dial_code')"
                :key="phoneCode.code"
                :value="phoneCode.dial_code"
              >{{ phoneCode.dial_code }}</option>
            </OSelect>
            <OSelect
              v-model="phone.prefix"
              class="is-hidden-mobile"
            >
              <option
                v-for="country of $i18nCountries.list()"
                :key="country.countryCode"
                :value="country.dialCode"
              >{{ country.countryName }} | {{ country.dialCode }}</option>
            </OSelect>
            <OInput
              :label="$t('auth.loginNumber')"
              :model-value="value"
              @update:modelValue="handleChange"
              @change="handleChange"
              @blur="handleBlur"
              expanded
            />
          </OField>
        </VField>
        <OField>
          <OButton
            native-type="submit"
            expanded
          >{{ $t('auth.sendWhatsapp') }}</OButton>
        </OField>
      </VForm>

      <VForm
        v-else
        name="code"
        :validation-schema="codeValidationSchema"
        @submit="verifyCode"
      >
        <VField
          name="loginCode"
          :label="$t('auth.loginCode')"
          v-slot="{ handleChange, handleBlur, value, errors }"
          v-model="token"
        >
          <OField
            :label="$t('auth.loginCode')"
            :variant="errors[0] ? 'danger' : null"
            :message="errors[0] ? errors[0] : ''"
          >
            <OInput
              :label="$t('auth.loginCode')"
              :model-value="value"
              @update:modelValue="handleChange"
              @change="handleChange"
              @blur="handleBlur"
              expanded
            />
          </OField>
        </VField>
        <OField>
          <OButton
            native-type="submit"
            expanded
          >{{ $t('auth.verifyCode') }}</OButton>
        </OField>
      </VForm>
      <section class="section">
        <div class="ltr-has-new-line">{{  $t('auth.magicLinkInstructions') }}</div>
      </section>
    </div>
    <AuthDisconnected v-else />
  </NuxtLayout>
</template>
