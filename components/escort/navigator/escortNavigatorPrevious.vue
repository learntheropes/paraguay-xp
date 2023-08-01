<script setup>
import find from 'lodash.find';

const {
  escort,
} = defineProps({
  escort: {
    type: Object,
    required: true
  }
});

const {
  age: {
    dateOfBirth
  },
  gallery: {
    medias
  },
  registry: {
    basic: {
      name,
      agency
    }
  },
  slug
} = escort;

const cover = medias[0];

const { t } = useI18n();

const agencyName = (agency === 'indipendent') ? t('agency.indipendent') : agency;

const { $dayjs } = useNuxtApp();
</script>

<template>
  <NuxtLink
    :to="localePath({ name: 'escort-slug', params: { slug }})"
    class="columns is-mobile is-gapless is-vcentered"
  >
    <div class="column is-narrow">
      <OIcon icon="chevron-left" size="large" />
    </div>
    <div class="column is-narrow">
      <figure :style="'background-color:black;'" class="image is-48x48 has-rounded-corners">
        <NuxtImg
          preset="navigator"
          :src="('/gallery/preview/' + cover.fileName).split('.')[0] + '.webp'"
          :alt="$t('escort.gallery.previewOf') + ' ' + name"
          :title="$t('escort.gallery.previewOf') + ' ' + name"
          loading="lazy"
          width="48"
          height="48"
        />
      </figure>      
    </div>
    <div class="column is-narrow">
      <div class="content margin-left">
        <p class="title is-4 is-capitalized">
          {{ name }}&nbsp;
          <span class="is-hidden-mobile">
            ({{ $dayjs(new Date()).diff(dateOfBirth, 'years') }})
          </span>
        </p>
        <p class="subtitle is-6 is-capitalized">{{ agencyName }}</p>
      </div>      
    </div>
  </NuxtLink>
</template>

<style scoped>
.margin-left {
  margin-left: 12px;
}
.has-rounded-corners {
  border-radius: 6px;
}
</style>
