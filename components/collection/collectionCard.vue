<script setup>
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

const {
  age: {
    dateOfBirth
  },
  registry: {
    basic: {
      name,
      agency
    },
    rate,
    services: {
      area
    }
  },
  description: {
    head
  },
  gallery: {
    medias
  },
  slug,
  updatedAt
} = escort;

const cover = medias[0];

const {
  locale,
  t
} = useI18n();

const agencyName = (agency === 'indipendent') ? t('agency.indipendent') : agency;

const {
  name: routeName
} = useRoute();
const isNews = routeName === `news___${locale.value}`;
const isArea = routeName === `area-slug___${locale.value}`;

const {
  $numberWithDots,
  $dayjs
} = useNuxtApp();
</script>

<template>
  <div class="card">
    <div class="card-image">
      <NuxtLink :to="localePath({ name: 'escort-slug', params: { slug }})">
        <figure :style="'background-color:black;'" class="image is-square">
          <img
            :src="('/gallery/preview/' + cover.fileName).split('.')[0] + '.webp'"
            :alt="$t('escort.gallery.previewOf') + ' ' + name"
            :title="$t('escort.gallery.previewOf') + ' ' + name"
            :loading="(index == 0) ? 'eager' : 'lazy'"
            width="288"
            height="288"
          />
        </figure>
        <div class="card-content is-overlay ltr-is-top-right">
          <span class="tag is-success is-hidden-mobile">{{ $numberWithDots(rate) }} {{ $t('index.currency') }}</span>
          <span class="tag is-success is-hidden-tablet ltr-is-smaller-top-right">{{ $numberWithDots(rate) }} {{ $t('index.currency') }}</span>
        </div>
        <div class="card-content is-overlay ltr-is-bottom-left">
          <span class="tag is-success is-hidden-mobile is-capitalized">{{ agencyName }}</span>
          <span class="tag is-success is-hidden-tablet ltr-is-smaller-bottom-left is-capitalized">{{ agencyName }}</span>
        </div>
        <div v-if="!isArea" class="card-content is-overlay ltr-is-bottom-right">
          <span class="tag is-success is-hidden-mobile is-capitalized">{{ area }}</span>
          <span class="tag is-success is-hidden-tablet ltr-is-smaller-bottom-right is-capitalized">{{ area }}</span>
        </div>
      </NuxtLink>
    </div>
    <div class="card-content">
      <div class="content">
        <h3 class="title is-6 is-capitalized">
          {{ name }}&nbsp;
          <span class="is-hidden-mobile">
            ({{ $dayjs(new Date()).diff(dateOfBirth, 'years') }})
          </span>
        </h3>
        <div v-if="isNews" class="subtitle is-7">
          {{ $dayjs(updatedAt).fromNow() }}
        </div>
        <div v-else class="subtitle is-7">
          {{ head[locale] }}
        </div>
      </div>
    </div>
  </div>
</template>
