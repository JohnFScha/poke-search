<template>
  <main class="min-h-screen flex flex-col justify-start items-center bg-pokebackground">
    <SearchBar />
    <PokemonList />
  </main>
  <PokeFooter />
</template>

<script lang="ts" setup>
import PokeFooter from './PokeFooter.vue';
import PokemonList from './PokeSearch/PokemonList.vue';
import SearchBar from './PokeSearch/SearchBar.vue';
</script>

<style scoped></style>