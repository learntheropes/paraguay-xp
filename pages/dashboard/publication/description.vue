<script setup>

definePageMeta({
  layout: 'dashboard'
});

const validationSchema = {
  head: {
    required: true,
    betweenCharacters: {
      min: 25,
      max: 150
    }
  },
  about: {
    required: true,
    // minWords: {
    //   min: 200
    // }
  }
}

const {
  locale,
  locales
} = useI18n();

let isModalActive = ref(false);
let cursorStart = ref(0);
let cursorEnd = ref(0);

const openModal = (refs) => {
  isModalActive.value = true;
  cursorStart.value = refs.about.$refs.textarea.selectionStart;
  cursorEnd.value = refs.about.$refs.textarea.selectionEnd;
}

const store = usePublicationStore();

let headChanged = ref(false);
let aboutChanged = ref(false);

let computedHead = computed({
  get() {
    return store.description.head.original;
  },
  set(value) {
    headChanged.value = true;
    store.setHeadOriginal(value)
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

const transalteHead = async () => {

  let head = {
    original: store.description.head.original
  };

  const { data: { language: originalLanguage }} = await useFetch('/api/translation/detect', {
    q: head.original
  });

  head[originalLanguage] = head.original;

  const languagesToTranslate = locales.value.filter((loc) => loc !== originalLanguage);

  const transalteOneLanguage = (originalLanguage, languageToTransalte, head) => useFetch('/api/translation/translate', {
    source: originalLanguage,
    target: languageToTransalte,
    q: head.original
  });

  const promises = languagesToTranslate.map(languageToTransalte => transalteOneLanguage (originalLanguage, languageToTransalte, head));

  const translations = await Promise.all(promises);

  translations.forEach(translation => {

    head[translation.data.target] = translation.data.translatedText;
  });

  store.setHead(head)
}
const transalteAbout = async () => {

  let about = {
    original: store.description.about.original
  }

  const { data: { language: originalLanguage }} = await useFetch('/api/translation/detect', {
    q: about.original
  })

  about[originalLanguage] = about.original

  const languagesToTranslate = locales.value.filter((loc) => loc !== originalLanguage);
  
  const transalteOneLanguage = (originalLanguage, languageToTransalte, about) => useFetch('/api/translation/translate', {
    source: originalLanguage,
    target: languageToTransalte,
    q: about.original
  });

  const promises = languagesToTranslate.map(languageToTransalte => transalteOneLanguage (originalLanguage, languageToTransalte, about));

  const translations = await Promise.all(promises);

  translations.forEach(translation => {

    about[translation.data.target] = translation.data.translatedText;
  });

  store.setAbout(about);
}

const goPrevious = async () => {

  if (headChanged.value === true)await transalteHead();
  if (about.changed.value === true) await transalteAbout();
  await navigateTo(`/${locale.value}/dashboard/publication/registry`);
}

const goNext = async () => {

  if (headChanged.value === true)await transalteHead();
  if (about.changed.value === true) await transalteAbout();
  await navigateTo(`/${locale.value}/dashboard/publication/gallery`);
}

</script>

<template>
  <NuxtLayout>
    <OModal v-model:active="isModalActive" :canCancel="true">
      <EmojisPicker />
    </OModal>
    <VForm
      name="registry"
      :validation-schema="validationSchema"
      @submit="goNext"
    >
      <div class="columns is-centered">
        <div class="column is-one-third">
          <VField
            name="head"
            :label="$t('dashboard.description.head')"
            v-slot="{ handleChange, handleBlur, value, errors }"
            v-model="computedHead"
          >
            <OField
              :label="$t('dashboard.description.head')"
              :variant="errors[0] ? 'danger' : null"
              :message="errors[0] ? errors[0] : ''"
            >
              <OInput
                :label="$t('dashboard.description.head')"
                :placeholder="$t('dashboard.description.headPlaceholder')"
                type="textarea"
                :model-value="value"
                @update:modelValue="handleChange"
                @change="handleChange"
                @blur="handleBlur"
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
                autosize
                expanded
                iconPack="mdi"
                iconRight="emoticon"
                iconRightClickable
                @icon-right-click="openModal($refs)"
              />
            </OField>
          </VField>
        </div>
      </div>
      <div class="level is-mobile">
        <div class="level-left">
          <div class="level-item">
            <OField>
              <OButton
                @click.native="goPrevious"
                variant="primary"
                outlined
              >{{  $t('dashboard.publication.previous') }}</OButton>
            </OField>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <OField>
              <OButton
                native-type="submit"
                variant="primary"
                outlined
              >{{  $t('dashboard.publication.next') }}</OButton>
            </OField>
          </div>
        </div>
      </div>
    </VForm>
  </NuxtLayout>
</template>

<style>
.o-input__icon-right{
  bottom: 0;
  top: unset !important;
  height: unset !important;
}
</style>