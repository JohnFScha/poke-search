<template>
  <section v-if="pokeStore.searchPoke.length === 0" class="w-full max-w-[1000px]">
    <ul class="flex flex-col items-center">
      <PokemonItem v-for="(poke, index) in pokeStore.pokemons.results" :key="poke.name" :name="poke.name"
        :id="index + 1" />
      <button @click="loadMorePokemon()"
        class="flex text-pokewhite justify-between items-center gap-2 bg-pokered rounded-md px-10 py-6 text-3xl lg:text-4xl w-10/12 lg:w-full my-2 mb-10 lg:my-5">
        Load more pokes!
      </button>
    </ul>
  </section>
  <section v-else class="w-full max-w-[1000px]">
    <ul v-if="pokeStore.pokemon" class="flex flex-col items-center">
      <PokemonItem :key="pokeStore.pokemon.id" :name="pokeStore.pokemon.name" :id="pokeStore.pokemon.id" />
    </ul>
    <ul v-else class="flex flex-col items-center">
      <EmptyList /> 
    </ul>
  </section>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { usePokeStore } from '@/store';
import PokemonItem from './PokemonItem.vue';
import EmptyList from '../EmptyList.vue';

const pokeStore = usePokeStore();

async function fetchInitialPokemon() {
  if (!pokeStore.pokemons.results.length) {
    await pokeStore.gottaCatchEmAll();
  }
}

async function loadMorePokemon() {
  if (pokeStore.next) {
    await pokeStore.loadNextBatch();
  }
}

onMounted(() => {
  fetchInitialPokemon();
});



</script>
