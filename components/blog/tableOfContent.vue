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
      <li v-for="section of toc.links" :key="section.id" class="block">
        <NuxtLink :to="`#${section.id}`">{{ section.text }}</NuxtLink>
        <ul v-if="section.children">
          <li v-for="children of section.children" :key="children.id" class="block">
            <span class="icon icon-link"></span>
            <NuxtLink :to="`#${children.id}`">{{ children.text }}</NuxtLink>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>