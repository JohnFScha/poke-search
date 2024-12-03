<template>
  <main class="min-h-screen flex flex-col justify-start items-center bg-pokebackground">
    <SearchBar />
    <PokemonList />
  </main>
  <PokeFooter />
</template>

<script lang="ts" setup>
import PokemonList from './FavoriteSearch/PokemonList.vue';
import SearchBar from './FavoriteSearch/SearchBar.vue';
import PokeFooter from './PokeFooter.vue';
</script>