<template>
  <nav class="flex items-center gap-2 bg-pokewhite rounded-md p-4 my-10 text-xl lg:text-4xl w-10/12 lg:w-full max-w-[1000px]">
    <Search class="text-pokelightgray" :size="35" />
    <input
      v-model="pokeStore.searchPoke"
      @input="pokeStore.throwPokeBall(pokeStore.searchPoke)"
      type="text"
      placeholder="Search"
      class="flex-grow bg-transparent outline-none text-2xl text-pokedarkgray placeholder-pokelightgray w-full"
    />
  </nav>
</template>

<script lang="ts" setup>
import { Search } from 'lucide-vue-next';
import { usePokeStore } from '@/store';

const pokeStore = usePokeStore();
</script>
