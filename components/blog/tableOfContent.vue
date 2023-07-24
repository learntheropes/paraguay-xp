<script setup>
const {
  toc,
} = defineProps({
  toc: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="box">
    <div class="title is-5">{{ $t('blog.toc') }}</div>
    <ul>
      <li v-for="section of toc.links" :key="section.id">
        <OButton tag="router-link" :to="`#${section.id}`" variant="primary" inverted>{{ section.text }}</OButton>
        <ul v-if="section.children">
          <li v-for="children of section.children" :key="children.id">
            <span class="icon icon-link"></span>
            <OButton tag="router-link" :to="`#${children.id}`" variant="primary" inverted>{{ children.text }}</OButton>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>