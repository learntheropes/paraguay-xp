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

const {
  $i18nCountries
} = useNuxtApp();

const phoneValidationSchema = {
  loginPrefix: {
    required: true
  },
  loginNumber: {
    required: true,
  }
};

const codeValidationSchema = {
  loginCode: {
    required: true,
    // code: true
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
  
if (locale !== 'en' && path === '/en/auth/login') navigateTo(fullPath.replace(`/en/auth/login`, `/${locale}/auth/login`));

const {
  public: {
    deploymentDomain
  }
} = useRuntimeConfig();

const { signIn } = useAuth();

const { data }= await useFetch('https://api.country.is/');
const { value: { country: userCountryCode }} = data;
const userDealCode = find(phoneCodes, { code: userCountryCode }).dial_code;

const phone = ref({
  prefix: userDealCode,
  number: null
});
const showPhone = ref(true);
const token = ref(null);

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

  const route = `/api/auth/callback/whatsapp?callbackUrl=${encodeURIComponent(query.callbackUrl)}&token=${encodeURIComponent(token.value)}&email=${encodeURIComponent(phone.value.prefix + phone.value.number)}`;
  
  navigateTo(`${deploymentDomain}${route}`, {
    external: true,
    redirectCode: 200
  });
}
</script>

<template>
  <NuxtLayout>
    <div class="">
      <VForm
        v-if="showPhone"
        name="phone"
        :validation-schema="phoneValidationSchema"
        @submit="sendWhatsapp"
      >        
        <VField
          name="loginPrefix"
          :label="$t('auth.loginPrefix')"
          v-slot="{ handleChange, handleBlur, value, errors }"
          v-model="phone.prefix"
        >
          <OField
          :label="$t('auth.loginPrefix')"
          :variant="errors[0] ? 'danger' : null"
          :message="errors[0] ? errors[0] : ''"
          >
            <OSelect
              :model-value="value"
              @update:modelValue="handleChange"
              @change="handleChange"
              @blur="handleBlur"
            >
              <option
                v-for="phoneCode of sortBy(phoneCodes, 'dial_code')"
                :key="phoneCode.code"
                :value="phoneCode.dial_code"
                class="is-hidden-tablet"
                expanded
              >{{ phoneCode.dial_code }}</option>
              <option
                v-for="country of $i18nCountries.list()"
                :key="country.countryCode"
                :value="country.dialCode"
                class="is-hidden-mobile"
                expanded
              >{{ country.countryName }} {{ country.dialCode }}</option>
            </OSelect>
          </OField>
        </VField>
        <VField
          name="loginNumber"
          v-slot="{ handleChange, handleBlur, value, errors }"
          v-model="phone.number"
        >
          <OField
            :label="$t('auth.loginNumber')"
            :variant="errors[0] ? 'danger' : null"
            :message="errors[0] ? errors[0] : ''"
          >
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
  </NuxtLayout>
</template>
