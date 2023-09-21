<script setup>
import { localeCodes } from '~/assets/js/localization';

const {
  agency
} = defineProps({
  agency: {
    type: String,
    required: true
  }
});

const slug = agency.replace('/\s/g', '-').toLowerCase()

const validationSchema = {
  title: {
    required: true,
    betweenCharacters: {
      min: 25,
      max: 150
    }
  },
  about: {
    required: true,
    minWords: {
      min: 20
    }
  }
};

const isLoading = ref(false);

let isModalActive = ref(false);
let cursorStart = ref(0);
let cursorEnd = ref(0);

const openModal = (refs) => {
  isModalActive.value = true;
  cursorStart.value = refs.about.$refs.textarea.selectionStart;
  cursorEnd.value = refs.about.$refs.textarea.selectionEnd;
}

let titleChanged = ref(false);
let aboutChanged = ref(false);

const store = useAgencyStore();

let computedTitle = computed({
  get() {
    return store.description.title.original;
  },
  set(value) {
    titleChanged.value = true;
    store.setTitleOriginal(value)
  }
});

let computedAbout = computed({
  get() {
    return store.description.about.original;
  },
  set(value) {
    aboutChanged.value = true;
    store.setAboutOriginal(value);
  }
});

const { $listen } = useNuxtApp();

$listen('addEmoji', emoji => {
  const about = computedAbout.value || '';
  const left = about.substring(0, cursorStart.value);
  const right = about.substring(cursorEnd.value, about.length);
  aboutChanged.value = true;
  store.setAboutOriginal(left + emoji + right);
  isModalActive.value = false;
});

const translate = async q => {

  const response = {
    original: q
  };

  const { data } = await useFetch('/api/dashboard/translation/detect', {
    key: q.replace(/\s/, '-'),
    method: 'POST',
    body: {
      q
    }
  });

  const originalLanguage = data.value.language;

  response[originalLanguage] = q;

  const languagesToTranslate = localeCodes.filter((code) => code !== originalLanguage);

  const transalteOneLanguage = (originalLanguage, languageToTransalte) => useFetch('/api/dashboard/translation/translate', {
    key: `${languageToTransalte}-${q.replace(/\s/, '-')}`,
    method: 'POST',
    body: {
      source: originalLanguage,
      target: languageToTransalte,
      q
    }
  });

  const promises = languagesToTranslate.map(languageToTransalte => transalteOneLanguage(originalLanguage, languageToTransalte));

  const translations = await Promise.all(promises);

  translations.forEach(translation => {

    response[translation.data.value.target] = translation.data.value.translatedText;
  });

  return response;
}

const transalteTitle = async () => {

  if (titleChanged.value) {
    const translations = await translate(store.description.title.original);
    store.setTitle(translations);
    titleChanged.value = false;
  }
};

const transalteAbout = async () => {

  if (aboutChanged.value) {
    const translations = await translate(store.description.about.original);
    store.setAbout(translations);
    aboutChanged.value = false;
  }
};

const { t } = useI18n();

const error = computed(() => {
  return (!store.accept) ? t('error.publish') : null
});

const acceptText = computed(() => (store.accept) ? t('dashboard.gallery.yes') : t('dashboard.gallery.no'));

const publish = async () => {

  isLoading.value = true;
  await transalteTitle();
  await transalteAbout();

  await useFetch(`/api/dashboard/publication/${slug}.json`, {
    method: 'POST',
    body: {
      content: store.description,
      path: `content/agencies`,
      message: `create content/agencies/${slug}.json`
    },
  });

  await useFetch(`/api/whatsapp/message/${data.value.user.email}`, {
    method: 'POST',
    body: {
      message: t('dashboard.publication.savedWaitingApproval')
    }
  });

  nuxtStorage.sessionStorage.removeItem('publication');

  isLoading.value = false;

  NotificationProgrammatic.open({
    mwssage: t('dashboard.publication.savedWaitingApproval'),
    duration: 5000
  });

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  await sleep(5000);

  isLoading.value = false;

  const { $event } = useNuxtApp();
  $event('setActiveTab', 0);
}
</script>

<template>
  <div>
    <OLoading :full-page="true" v-model:active="isLoading" iconSize="large"/>
    <OModal v-model:active="isModalActive" :canCancel="true">
      <EmojisPicker />
    </OModal>
    <VForm
      name="agency"
      :validation-schema="validationSchema"
      @submit="publish"
    >
      <div class="columns is-centered">
        <div class="column is-one-third">
          <VField
            name="title"
            :label="$t('dashboard.description.title')"
            v-slot="{ handleChange, handleBlur, value, errors }"
            v-model="computedTitle"
          >
            <OField
              :label="$t('dashboard.description.title')"
              :variant="errors[0] ? 'danger' : null"
              :message="errors[0] ? errors[0] : ''"
            >
              <OInput
                :label="$t('dashboard.description.title')"
                :placeholder="$t('dashboard.description.titlePlaceholder')"
                type="textarea"
                :model-value="value"
                @update:modelValue="handleChange"
                @change="handleChange"
                @blur="handleBlur"
                :rows="2"
                autosize
                expanded
              />
            </OField>
          </VField>
          <VField
            name="about"
            :label="$t('dashboard.description.about')"
            v-slot="{ handleChange, handleBlur, value, errors }"
            v-model="computedAbout"
          >
            <OField
              :label="$t('dashboard.description.about')"
              :variant="errors[0] ? 'danger' : null"
              :message="errors[0] ? errors[0] : ''"
            >
              <OInput
                :label="$t('dashboard.description.about')"
                :placeholder="$t('dashboard.description.aboutPlaceholder')"
                ref="about"
                type="textarea"
                :model-value="value"
                @update:modelValue="handleChange"
                @change="handleChange"
                @blur="handleBlur"
                :rows="10"
                autosize
                expanded
                iconPack="mdi"
                iconRight="emoticon"
                iconRightClickable
                @icon-right-click="openModal($refs)"
              />
            </OField>
          </VField>
          <OField
            :label="$t('dashboard.publish.accept')"
            :variant="error ? 'danger' : null"
            :message="error ? error : null"
          >
            <OSwitch v-model="store.accept">{{ acceptText }}</OSwitch>
          </OField>
        </div>
      </div>
      <div class="level is-mobile">
        <div class="level-right">
          <div class="level-item">
            <OField>
              <OButton
                native-type="submit"
                variant="primary"
                outlined
              >{{  $t('navbar.publish') }}</OButton>
            </OField>
          </div>
        </div>
      </div>
    </VForm>
  </div>
</template>

<style>
.o-input__icon-right{
  bottom: 0;
  top: unset !important;
  height: unset !important;
}
</style>