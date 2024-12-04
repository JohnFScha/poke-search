<template>
  <footer class="bg-pokewhite justify-center w-full flex py-7 sticky bottom-0 shadow-footer-shadow">
    <section class="flex justify-center gap-10 w-full max-w-[900px]">
      <router-link 
      to="/pokesearch"
      :class="`btn h-auto text-lg lg:text-2xl py-2 lg:py-4 border-0 rounded-full text-pokewhite w-2/5 lg:w-1/2 ${isActive('/pokesearch') ? 'bg-pokered hover:bg-pokeredmuted' : 'bg-pokelightgray hover:bg-pokedarkgray'}`"
      >
      <List :fill="'white'" :stroke="'white'" :stroke-width="3" :size="30"  />
        List
      </router-link>
      <router-link 
      to="/favorites"
      :class="`btn h-auto text-lg lg:text-2xl py-2 lg:py-4 border-0 rounded-full text-pokewhite w-2/5 lg:w-1/2 ${isActive('/favorites') ? 'bg-pokered hover:bg-pokeredmuted' : 'bg-pokelightgray hover:bg-pokebackground'}`"
      >
      <Star :fill="'white'" :stroke="'white'" :size="30" />
        Favorites
      </router-link>
    </section>
  </footer>
</template>

<script lang="ts" setup>

import { useRoute } from 'vue-router';
import {Star, List} from 'lucide-vue-next'
const route = useRoute();

const isActive = (path: string) => {
  return route.path === path;
};

</script>