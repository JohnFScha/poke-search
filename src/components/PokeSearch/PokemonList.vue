<template>
  <section class="w-full max-w-[1000px]">
    <ul class="flex flex-col items-center">
      <PokemonItem
        v-for="(poke, index) in pokeStore.pokemons.results"
        :key="poke.name"
        :name="poke.name"
        :id="index + 1"
      />
    </ul>
    <div
      ref="loadMoreTrigger"
      class="h-10 flex justify-center items-center w-full"
      v-if="pokeStore.next"
    >
      <LoaderComponent v-if="pokeStore.loading" />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { usePokeStore } from '@/store';
import PokemonItem from './PokemonItem.vue';
import LoaderComponent from '../LoaderComponent.vue';

const pokeStore = usePokeStore();
const loadMoreTrigger = ref<HTMLDivElement | null>(null);

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

let observer: IntersectionObserver | null = null;

onMounted(() => {
  fetchInitialPokemon();
  console.log(pokeStore.next, 'carbdkfkufnkjsangf')

  // Set up the IntersectionObserver for infinite scrolling
  observer = new IntersectionObserver(
    async ([entry]) => {
      if (entry.isIntersecting) {
        await loadMorePokemon();
      }
    },
    { root: null, rootMargin: '0px', threshold: 1.0 }
  );

  if (loadMoreTrigger.value) {
    observer.observe(loadMoreTrigger.value);
  }
});

onUnmounted(() => {
  if (observer && loadMoreTrigger.value) {
    observer.unobserve(loadMoreTrigger.value);
  }
});
</script>
