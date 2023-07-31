<script setup>
import find from 'lodash.find';

const {
  escort,
  index
} = defineProps({
  escort: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
});

escort.cover = find(escort.gallery.medias, { fileType: 'image' });

const {
  locale,
  t
} = useI18n();

const agency = (escort.registry.basic.agency === 'indipendent') ? t('indipendent') : escort.registry.basic.agency;

const {
  name
} = useRoute();

const isNews = name === `news___${locale.value}`;
const isArea = name === `area-slug___${locale.value}`;

const {
  $numberWithDots,
  $dayjs
} = useNuxtApp();
</script>

<template>
  <div class="card">
    <div class="card-image">
      <NuxtLink :to="localePath({ name: 'escort-slug', params: { slug: escort.slug }})">
        <figure :style="'background-color:black;'" class="image is-square">
          <NuxtImg
            preset="preview"
            :src="('/gallery/preview/' + escort.cover.fileName).split('.')[0] + '.webp'"
            :alt="$t('escort.gallery.previewOf') + ' ' + escort.registry.basic.name"
            :title="$t('escort.gallery.previewOf') + ' ' + escort.registry.basic.name"
            :loading="(index == 0) ? 'eager' : 'lazy'"
            width="288"
            height="288"
          />
        </figure>
        <div class="card-content is-overlay ltr-is-top-right">
          <span class="tag is-success is-hidden-mobile">{{ $numberWithDots(escort.registry.rate) }} {{ $t('index.PYG') }}</span>
          <span class="tag is-success is-hidden-tablet ltr-is-smaller-top-right">{{ $numberWithDots(escort.registry.rate) }} {{ $t('index.PYG') }}</span>
        </div>
        <div class="card-content is-overlay ltr-is-bottom-left">
          <span class="tag is-success is-hidden-mobile is-capitalized">{{ agency }}</span>
          <span class="tag is-success is-hidden-tablet ltr-is-smaller-bottom-left is-capitalized">{{ agency }}</span>
        </div>
        <div v-if="!isArea" class="card-content is-overlay ltr-is-bottom-right">
          <span class="tag is-success is-hidden-mobile is-capitalized">{{ escort.registry.services.area }}</span>
          <span class="tag is-success is-hidden-tablet ltr-is-smaller-bottom-right is-capitalized">{{ escort.registry.services.area }}</span>
        </div>
      </NuxtLink>
    </div>
    <div class="card-content">
      <div class="content">
        <h3 class="title is-6 is-capitalized">
          {{ escort.registry.basic.name }}&nbsp;
          <span class="is-hidden-mobile">
            ({{ $dayjs(new Date()).diff(escort.age.dateOfBirth, 'years') }})
          </span>
        </h3>
        <div v-if="isNews" class="subtitle is-7">
          {{ $dayjs(escort.updatedAt).fromNow() }}
        </div>
        <div v-else class="subtitle is-7">
          {{ escort.description.head[locale] }}
        </div>
      </div>
    </div>
  </div>
</template>
