<template>
  <section class="w-full max-w-[1000px]">
    <ul v-if="favoriteStore.filteredFavorites.length > 0" class="flex flex-col items-center">
      <PokemonItem v-for="(poke, index) in favoriteStore.filteredFavorites" :key="index" :name="poke.name!"
        :id="index + 1" />
    </ul>
    <EmptyList v-else />
  </section>
</template>

<script lang="ts" setup>
import { useFavoriteStore } from '@/store';
import PokemonItem from './PokemonItem.vue';
import EmptyList from '../EmptyList.vue';

const favoriteStore = useFavoriteStore();

</script>