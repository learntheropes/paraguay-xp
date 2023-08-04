<script setup>
import emojiData from '~/assets/js/emojiByGroup.js';
import find from 'lodash.find';
import filter from 'lodash.filter';

const search = ref(null);

const emojiFiltered = computed(() => {
  if (!search.value) return emojiData
  else {
    return emojiData
      .filter(group => {
        return find(group.emojis, o => o.name.toLowerCase().includes(search.value.toLowerCase()));
      })
      .map(group => {
        return {
          group: group.group,
          emojis: filter(group.emojis, o => o.name.toLowerCase().includes(search.value.toLowerCase()))
        };
      });
  }
});

const { $event } = useNuxtApp();

const emitCloseModal = () => {

  $event('closeModal');
}

const emitAddEmoji = (emoji) => {
  
  $event('addEmoji', emoji);
}
</script>

<template>
  <section key="emojis-box" class="box">
    <nav class="level is-mobile">
      <div class="level-left">
        <div class="level-item">
        </div>
      </div>
      <div class="level-right">
        <p class="level-item">
          <button @click="emitCloseModal" class="delete is-large"></button>
        </p>
      </div>
    </nav>
    <section class="section">
      <b-input
        v-model="search"
        :placeholder="$t('emoji.searchEmojisInEnglish')"
        ref="search"
      ></b-input>
    </section>
    <div v-for="(category, index) in emojiFiltered" :key="index" class="section">
      <div class="title is-6">{{ $t(`emoji.${category.group}`) }}</div>
      <div class="columns is-mobile is-multiline">
        <div v-for="(emoji, i) in category.emojis" :key="index + i" class="column is-mobile is-narrow" @click="emitAddEmoji(emoji.emoji)">
          {{ emoji.emoji }}
        </div>
      </div>
    </div>
  </section>
</template>