<script setup>

definePageMeta({
  layout: 'dashboard'
});

const {
  locale,
  locales
} = useI18n();

let isModalActive = ref(false);
let cursorStart = ref(0);
let cursorEnd = ref(0);

const openModal = () => {
  isModalActive.value = true;
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
    store.setAboutOriginal(value)
  }
});

const { $listen } = useNuxtApp();

$listen('closeModal', () => {

  isModalActive = false
});

$listen('addEmoji', emoji => {
  const left = computedAbout.substring(0, cursorStart.value)
  const right = computedAbout.substring(cursorEnd.value, computedAbout.length)
  computedAbout = left + emoji + right
  // this.$refs.about.$refs.textarea.focus()
  isModalActive.value = false
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
    <OModal v-model:active="isModalActive" :onCancel="closeModal" :canCancel="true">
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
            :label="$t('dashboard.registry.basic.name')"
            v-slot="{ handleChange, handleBlur, value, errors }"
            v-model="computedHead"
          >
            <OField
              :label="$t('dashboard.registry.basic.name')"
              :variant="errors[0] ? 'danger' : null"
              :message="errors[0] ? errors[0] : ''"
            >
              <OInput
                :label="$t('dashboard.registry.basic.name')"
                :model-value="value"
                @update:modelValue="handleChange"
                @change="handleChange"
                @blur="handleBlur"
                expanded
              />
            </OField>
          </VField>

          <VField
            name="about"
            :label="$t('description')"
            :placeholder="$t('descriptionPlaceholder')"
            v-slot="{ handleChange, handleBlur, value, errors }"
            v-model="computedAbout"
          >
            <OField
              :label="$t('description')"
              :variant="errors[0] ? 'danger' : null"
              :message="errors[0] ? errors[0] : ''"
            >
              <OInput
                :label="$t('description')"
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
                @icon-right-click="openModal"
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
<!-- 
<template>
  <div class="container">
    <b-field
      :label="$t('head')"
      :type="{ 'is-danger': errors.first($t('head')) }"
      :message="errors.first($t('head'))"
    >
      <b-input
        v-model="head"
        :name="$t('head')"
        :placeholder="$t('headPlaceholder')"
        v-validate="{ required: true, min: 20, max: 65 }"
      ></b-input>
    </b-field>
    <b-field
      :label="$t('description')"
      :type="{ 'is-danger': errors.first($t('description')) }"
      :message="errors.first($t('description')) || descriptionFreeWorning"
    >
      <b-input
        v-model="content"
        :name="$t('description')"
        :placeholder="$t('descriptionPlaceholder')"
        ref="content"
        v-validate="{ required: true, minWords: 10 }"
        type="textarea"
        rows="20"
        icon-right="emoticon"
        icon-right-clickable
        @icon-right-click="activateModal"
      ></b-input>
    </b-field>
    <b-modal
      v-model="isModalActive"
      :can-cancel="['escape']"
      :full-screen="true"
      scroll="keep"
    >
      <emojis-picker
        @addEmoji="addEmoji"
        @closeModal="closeModal"
      />
    </b-modal>
    <account-publication-navigator :activeTab="activeTab" @goPrev="goPrev" @goNext="goNext" />
  </div>
</template>

<script>
import cloneDeep from 'lodash.clonedeep'
import { mapState, mapMutations } from 'vuex'
import EmojisPicker from '~/components/emojis/picker'
import AccountPublicationNavigator from '~/components/account/publication/navigator'
export default {
  name: 'AccountPublicationDescription',
  components: {
    EmojisPicker,
    AccountPublicationNavigator
  },
  props: [
    'activeTab',
    'minWords'
  ],
  data: () => ({
    changed: false,
    isModalActive: false,
    cursorStart: 0,
    cursorEnd: 0
  }),
  computed: {
    ...mapState({
      publication: state => state.publication
    }),
    head: {
      get () {
        return this.publication.head.original
      },
      set (value) {
        this.changed = true
        this.setHead({ original: value })
      }
    },
    content: {
      get () {
        return this.publication.content.original
      },
      set (value) {
        this.changed = true
        this.setContent({ original: value })
      }
    },
    wordsCount () {
      return (this.content) ? this.content.split(' ').length : 0
    },
    descriptionFreeWorning () {
      return (this.wordsCount < this.minWords) ? this.$t('descriptionFreeWorning', { missingWords: this.minWords - this.wordsCount }): null
    }
  },
  methods: {
    ...mapMutations('publication', ['setHead', 'setContent']),
    closeModal () {
      this.isModalActive = false
    },
    activateModal () {
      this.isModalActive = true
      this.cursorStart = this.$refs.content.$refs.textarea.selectionStart
      this.cursorEnd = this.$refs.content.$refs.textarea.selectionEnd
    },
    addEmoji (emoji) {
      const left = this.content.substring(0, this.cursorStart)
      const right = this.content.substring(this.cursorEnd, this.content.length)
      this.content = left + emoji + right
      this.$refs.content.$refs.textarea.focus()
      this.isModalActive = false
    }
  }
}
</script> -->