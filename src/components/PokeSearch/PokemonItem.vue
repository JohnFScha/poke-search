<template>
  <li
    class="flex justify-between items-center gap-2 bg-pokewhite rounded-md px-10 py-5 text-3xl lg:text-4xl w-10/12 lg:w-full my-2 lg:my-5">
    <p class="text-pokeblack">{{ upperName }}</p>
    <button v-if="isFavorite" @click="favoriteStore.removeFavorite(props.id, props.name)" class="btn btn-circle bg-pokebackground border-0 hover:bg-pokebackground">
      <Star :size="35" :stroke-width="0" class="fill-pokeyellow" />
    </button>
    <button v-else @click="favoriteStore.addFavorite({name: props.name, id: props.id})" class="btn btn-circle bg-pokebackground border-0 hover:bg-pokebackground">
      <Star :size="35" :stroke-width="0" class="fill-pokedarkgray" />
    </button>
  </li>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue';
import { Star } from 'lucide-vue-next'
import { useFavoriteStore } from '@/store';

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  id: {
    type: Number,
    required: true
  }
})

const favoriteStore = useFavoriteStore();

const upperName = computed(() => {
  return props.name.charAt(0).toUpperCase() + props.name.slice(1,);
})

const isFavorite = computed(() =>
  favoriteStore.favorites.some((fav) => fav.name === props.name)
);

</script>
