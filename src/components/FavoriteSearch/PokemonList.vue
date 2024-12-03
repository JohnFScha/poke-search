<template>
  <section class="w-full max-w-[1000px]">
    <ul v-if="favoriteStore.favorites.length > 0" class="flex flex-col items-center">
      <PokemonItem v-for="(poke, index) in favoriteStore.favorites" :key="index" :name="poke.name!" :id="index + 1" />
    </ul>
    <ul v-else class="flex flex-col items-center">
      <li class="flex justify-between items-center gap-2 bg-pokewhite rounded-md px-10 py-5 text-3xl lg:text-4xl w-10/12 lg:w-full my-2 lg:my-5">
        <p class="text-pokeblack">You've yet to cacth a pokemon!</p>
      </li>
    </ul>
  </section>
</template>

<script lang="ts" setup>
import { useFavoriteStore } from '@/store';
import PokemonItem from './PokemonItem.vue';
import LoaderComponent from '../LoaderComponent.vue';

const favoriteStore = useFavoriteStore();

</script>