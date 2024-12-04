<template>
  <main v-if="!pokeStore.loading" class="min-h-screen flex flex-col justify-start items-center bg-pokebackground">
    <SearchBar />
    <PokemonList />
    <PokeFooter />
  </main>
  <LoaderComponent v-else />
</template>

<script lang="ts" setup>
import LoaderComponent from './LoaderComponent.vue';
import PokeFooter from './PokeFooter.vue';
import PokemonList from './PokeSearch/PokemonList.vue';
import SearchBar from './PokeSearch/SearchBar.vue';
import { usePokeStore } from '@/store';

const pokeStore = usePokeStore();
</script>
