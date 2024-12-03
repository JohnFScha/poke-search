<template>
  <section v-if="!pokeStore.loading" class="w-full max-w-[1000px]">
    <ul v-if="pokeStore.pokemon?.id" class="flex flex-col items-center">
      <PokemonItem :name="pokeStore.pokemon.name" :id="pokeStore.pokemon.id" />
    </ul>
    <ul v-else class="flex flex-col items-center">
      <PokemonItem v-for="(poke, index) in pokeStore.pokemons?.results" :key="index" :name="poke.name" :id="index + 1" />
    </ul>
  </section>
  <LoaderComponent v-else />
</template>

<script lang="ts" setup>
import { usePokeStore } from '@/store';
import { onMounted, onUpdated } from 'vue';
import PokemonItem from './PokemonItem.vue';
import LoaderComponent from '../LoaderComponent.vue';

const pokeStore = usePokeStore();

onMounted(async () => {
  await pokeStore.gottaCatchEmAll();
})

onUpdated(() =>  {
  console.log(pokeStore.pokemon)
})

</script>