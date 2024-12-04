<template>
  <section v-if="pokeStore.filteredPokemons.length > 0" class="w-full max-w-[1000px] mb-[8rem]">
    <ul class="flex flex-col items-center">
      <button v-if="pokeStore.prev" @click="pokeStore.loadPrevBatch()"
        class="flex text-pokewhite justify-between items-center gap-2 bg-pokered rounded-md px-10 py-6 text-3xl lg:text-4xl w-10/12 lg:w-full my-2 mb-10 lg:my-5">
        Load more pokes!
      </button>
      <PokemonItem v-for="(poke, index) in pokeStore.filteredPokemons" :key="poke.name" :name="poke.name"
        :id="index + 1" />
      <button v-if="pokeStore.next" @click="pokeStore.loadNextBatch()"
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

onMounted (async() => {
  await fetchInitialPokemon();
});


</script>
