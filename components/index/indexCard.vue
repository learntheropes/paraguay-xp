<template>
  <div></div>
</template>
<!-- <template>
  <div tabindex="0" @keyup.enter="navigate(escort.slug)" class="card">
    <div class="card-image">
      <nuxt-link :to="localePath({ name: 'escort-slug', params: { slug: escort.slug }})">
        <figure :style="'background-color:grey;'" class="image is-square">
          <b-loading :is-full-page="false" v-model="isLoading" :can-cancel="false"></b-loading>
          <img
            v-if="escort.media[0].fileType === 'image'"
            @load="onImgLoad"
            :src="'/img/public/preview/' + escort.media[0].fileName"
            :alt="this.$t('fotoOf')+' '+name"
            :title="this.$t('fotoOf')+' '+name"
            loading="lazy"
            width="288"
            height="288"
          />
          <img
            v-else
            @load="onImgLoad"
            :src="'/img/public/preview/' + escort.media[0].fileName"
            :alt="this.$t('videoOf')+' '+name"
            :title="this.$t('videoOf')+' '+name"
            loading="lazy"
            width="288"
            height="288"
          />
        </figure>
        <div v-if="!isBookmarks" class="card-content is-overlay is-overlay-top-right is-hidden-mobile">
          <b-tag type="is-white">{{ $utils.numberWithDots(escort.rate) }} {{ $t('PYG')}}</b-tag>
        </div>
        <div v-if="!isBookmarks && !isAreaPage" class="card-content is-overlay is-overlay-bottom-right is-hidden-mobile">
          <b-tag v-if="escort.area" type="is-white">{{ escort.area }}</b-tag>
        </div>
        <div v-if="!isBookmarks" class="card-content is-overlay is-overlay-top-right is-hidden-tablet is-smaller-top">
          <b-tag type="is-white">{{ $utils.numberWithDots(escort.rate) }} {{ $t('PYG')}}</b-tag>
        </div>
        <div v-if="!isBookmarks && !isAreaPage" class="card-content is-overlay is-overlay-bottom-right is-hidden-tablet is-smaller-bottom">
          <b-tag v-if="escort.area" type="is-white">{{ escort.area }}</b-tag>
        </div>
      </nuxt-link> 
    </div>
    <div class="card-content">
      <div class="content">
        <h3 v-if="isIndividual" class="title is-6 is-capitalized">
          <nuxt-link :to="localePath({ name: 'escort-slug', params: { slug: escort.slug }})">
            {{ escort.name }} <span class="is-hidden-mobile">({{ age }})</span>
          </nuxt-link>
        </h3>
        <h3 v-else class="title is-6">
          <nuxt-link :to="localePath({ name: 'escort-slug', params: { slug: escort.slug }})">
            <span class="is-capitalized">{{ escort.name1 }}  <span class="is-hidden-mobile">({{ age1 }})</span></span> {{ $t('and') }} <span class="is-capitalized">{{ escort.name2 }}  <span class="is-hidden-mobile">({{ age2 }})</span></span>
          </nuxt-link>
        </h3>
        <div v-if="isHistory" class="subtitle is-7 is-capitalized">
          {{ $moment(escort.createdAt).fromNow() }}
        </div>
        <div v-else-if="!isHistory && $device.isMobile" class="subtitle is-7 is-capitalized">
            {{ agency }}
        </div>
        <div v-else-if="!isHistory && !$device.isMobile" class="subtitle is-7 is-capitalized">
          <nuxt-link :to="localePath({ name: 'agency-slug', params: { slug: escort.agency.replace(/\s/g,'-') }})">
            {{ agency }}
          </nuxt-link>
        </div>
        <div class="content is-size-7">
          {{ escort.head[$i18n.locale] }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'escort'
  ],
  data: () => ({
    isLoading: true
  }),
  computed: {
    isIndividual () {
      return this.$escort.isIndividual(this.escort)
    },
    name () {
      return this.$escort.name(this.escort)
    }, 
    age () {
      return this.$escort.age(this.escort)
    },
    age1 () {
      return this.$escort.age1(this.escort)
    },
    age2 () {
      return this.$escort.age2(this.escort)
    },
    agency() {
      return this.$escort.agency(this.escort)
    },
    rate () {
      return this.$utils.numberWithDots(this.escort.rate)
    },
    isBookmarks() {
      return this.$route.name === `bookmarks___${this.$i18n.locale}`
    },
    isHistory() {
      return this.$route.name === `history___${this.$i18n.locale}`
    },
    isAreaPage() {
      return this.$route.name === `area-slug___${this.$i18n.locale}`
    },
  },
  methods: {
    onImgLoad () {
      this.isLoading = false
    },
    navigate (slug) {
      this.$router.push(`/${this.$i18n.locale}/escort/${slug}`)
    }, 
  }
}
</script>

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
</style> -->