<script setup>
import find from 'lodash.find';
import merge from 'lodash.merge';
import { NotificationProgrammatic } from "@oruga-ui/oruga-next";

const {
  publication,
} = defineProps({
  punlication: {
    type: String,
    required: true
  }
});

publication.cover = find(publication.gallery, { fileType: 'image' });

const isLoading = ref(true);
const isConfirmActive = ref(false);

const onImgLoad = () => {
  isLoading.value = false;
}
const { $dayjs } = useNuxtApp();

const { locale } = useI18n();

const editAdv = async () => {

  // const { data: age } = await this.$axios.get(`api/account/age`, {
  //   params: { slug: this.escort.slug }
  // })
  const escort = await queryContent('escorts', publication.slug).findOne();
  const publication = merge(escort, {}) // age
  const store = usePublicationStore();
  store.setPublication(publication);
  await navigateTo(`/${locale.value}/dashboard/publication?tab=1`);
};

const removeAdv = async () => {
  await useFetch(`/api/dashboard/publication/${publication.slug}`, {
    method: 'delete'
  });
  isConfirmActive.value = false;
  NotificationProgrammatic.open(t('publicationDelated'));
};

const confirmRemoveAdv = () => {
  isConfirmActive.value = true;
};

const closeConfirm = () => {
  isConfirmActive.value = false;
};
</script>

<template>
  <div>
    <div class="card card-equal-height">
      <div @click="editAdv" class="card-image">
        <figure :style="'background-color:black;'" class="image is-square">
          <OLoading :is-full-page="false" v-model="isLoading" :can-cancel="false"></OLoading>
          <NuxtImg
            preset="preview"
            :src="('/gallery/preview/' + publication.cover.fileName).split('.')[0] + '.webp'"
            :alt="$t('escort.gallery.previewOf') + ' ' + publication.name"
            :title="$t('escort.gallery.previewOf') + ' ' + publication.name"
            :loading="(index == 0) ? 'eager' : 'lazy'"
            width="288"
            height="288"
          />
        </figure>
      </div>
      <div class="card-content">
        <div @click="editAdv" class="content">
          <p class="title is-5 is-capitalized">
            {{ publication.name }}&nbsp;
            <span class="is-hidden-mobile">({{ $dayjs(new Date()).diff(publication.dateOfBirth, 'years') }})</span>
          </p>
          <p class="subtitle is-6 is-capitalized">
            {{$t('activeUntil')}} {{ $dayjs(publication.until).format('DD/MM/YY') }}<br>
            ({{ $dayjs(escort.until).fromNow(true) }}
          </p>
        </div>
      </div>
      <footer class="card-footer">
        <div @click="confirmRemoveAdv" class="card-footer-item">
          <OIcon icon="close-circle" size="large"></OIcon>
        </div>
        <div @click="editAdv" class="card-footer-item">
          <OIcon icon="pencil" size="large"></OIcon>
        </div>
      </footer>
    </div>
    <OModal v-model="isConfirmActive" :width="200" scroll="keep">
      <div class="card">
        <div class="card-content">
          <div class="content">{{ $t('deleteConfirm')}}</div>
        </div>
        <footer class="card-footer">
          <div @click="closeConfirm" class="card-footer-item">{{ $t('cancel')}}</div>
          <div @click="removeAdv" class="card-footer-item">{{ $t('confirm')}}</div>
        </footer>      
      </div>
    </OModal>
  </div>
</template>

<script>
import merge from 'lodash.merge'
import { mapState, mapMutations } from 'vuex'
export default {
  props: [
    'escort'
  ],
  computed: {
    ...mapState({
      publication: state => state.publication
    }),
  },
  methods: {
    ...mapMutations(['loadPublication']),
    async editAdv () {
      const { data: age } = await this.$axios.get(`api/account/age`, {
        params: { slug: this.escort.slug }
      })
      const escort = await this.$content('escorts', this.escort.slug).fetch()
      const publication = merge(escort, age)
      this.loadPublication(publication)
      this.$router.push(`/${this.$i18n.locale}/account/publication?tab=1`)
    },
    confirmRemoveAdv () {
      this.isConfirmActive = true
    },
    async removeAdv () {
      await this.$axios.delete(`/api/account/publication`, {
        data: {
          slug: this.escort.slug
        }
      })
      this.isConfirmActive = false
      this.$buefy.toast.open({
        message: this.$t('publicationDelated'),
        duration: 4000
      })
    },
    closeConfirm () {
      this.isConfirmActive = false
    }
  }
}
</script>

<style scoped>
  .is-center-center {
    align-items: center;
    justify-content: center;
    display: flex;
  }
  </style>