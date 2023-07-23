<script setup>
import find from 'lodash.find'
const {
  escort,
} = defineProps({
  escort: {
    type: Object,
    required: true
  }
});

escort.cover = find(escort.media, { fileType: 'image' });

const {
  locale
} = useI18n();

const {
  name
} = useRoute();

const isBookmarks = name === `bookmarks___${locale.value}`;
const isHistory = name === `history___${locale.value}`;
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
        <figure :style="'background-color:grey;'" class="image is-square">
          <img
            :src="('/img/' + escort.cover.fileName).split('.')[0] + '.webp'"
            :alt="$t('fotoOf')+' '+ escort.name"
            :title="$t('fotoOf')+' '+ escort.name"
            loading="lazy"
            width="288"
            height="288"
          />
        </figure>

        <div v-if="!isBookmarks" class="card-content is-overlay is-overlay-top-right is-hidden-mobile">
          <span class="tag is-success">{{ $numberWithDots(escort.rate) }} {{ $t('index.PYG')}}</span>
        </div>
        <div v-if="!isBookmarks" class="card-content is-overlay is-overlay-top-right is-hidden-tablet is-smaller-top">
          <span class="tag is-success">{{ $numberWithDots(escort.rate) }} {{ $t('index.PYG')}}</span>
        </div>
        <div v-if="!isBookmarks && !isArea" class="card-content is-overlay is-overlay-bottom-right is-hidden-mobile">
          <span class="tag is-success">{{ escort.area }}</span>
        </div>
        <div v-if="!isBookmarks && !isArea" class="card-content is-overlay is-overlay-bottom-right is-hidden-tablet is-smaller-bottom">
          <span class="tag is-success">{{ escort.area }}</span>
        </div>

      </NuxtLink>
    </div>
    <div class="card-content">
      <div class="content">
        <h3 class="title is-6 is-capitalized">
          <nuxt-link :to="localePath({ name: 'escort-slug', params: { slug: escort.slug }})">
            {{ escort.name }}&nbsp;
            <span class="is-hidden-mobile">
              ({{ $dayjs(new Date()).diff(escort.birthTime, 'years') }})
            </span>
          </nuxt-link>
        </h3>
        <div v-if="isHistory" class="subtitle is-7">
          {{ $dayjs(escort.updatedAt).fromNow() }}
        </div>
        <div v-else class="subtitle is-7">
          {{ escort.head[locale] }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.is-overlay-top-right {
  align-items: flex-start;
  justify-content: right;
  display: flex;
}
.is-overlay-bottom-right {
  align-items: flex-end;
  justify-content: right;
  display: flex;
}
.is-smaller-top {
  transform: scale(0.7);
  transform-origin: 100% 0%;
}
.is-smaller-bottom {
  transform: scale(0.7);
  transform-origin: 100% 100%;
}
.card-image:hover img {
  transform: scale(1.15);
}
.image {
  overflow: hidden;
}
</style>