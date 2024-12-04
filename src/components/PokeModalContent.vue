<template>
  <div v-if="pokemon">
    <div class="flex flex-col w-full">
      <figure class="w-full flex justify-center items-center">
        <img :src="pokemon?.sprite" :alt="pokemon?.name" width="300" height="300">
      </figure>
      <div>
        <ul class="flex flex-col p-5 gap-2 lg:gap-5 text-xl lg:text-3xl">
          <li class="border-b pb-3">
            <span class="text-pokeblack">Name:</span> {{ capitalize(pokemon.name) }}
          </li>
          <li class="border-b pb-3">
            <span class="text-pokeblack">Weight:</span> {{ pokemon.weight }}
          </li>
          <li class="border-b pb-3">
            <span class="text-pokeblack">Height:</span> {{ pokemon.height }}
          </li>
          <li class="border-b pb-3 w-full">
            <span class="text-pokeblack">Types:</span>
            <span v-for="(type, index) in pokemon.types" :key="index" class="ml-3">
              {{ capitalize(type.type.name) }}<span v-if="index !== pokemon.types.length - 1">,</span>
            </span>
          </li>
        </ul>
      </div>
      <div class="flex w-full items-center justify-between p-5">
        <button @click="shareWithFriends"
          class="btn h-auto rounded-full bg-pokered text-pokewhite border-0 text-lg lg:text-2xl px-4 lg:p-4 hover:bg-pokeredmuted">
          Share to my friends
        </button>

        <button v-if="isFavorite" @click="favoriteStore.removeFavorite(pokemon.name)"
          class="btn btn-circle bg-pokebackground border-0 hover:bg-pokebackground">
          <Star :size="35" :stroke-width="0" class="fill-pokeyellow" />
        </button>
        <button v-else @click="favoriteStore.addFavorite({ name: pokemon.name, id: pokemon.id })"
          class="btn btn-circle bg-pokebackground border-0 hover:bg-pokebackground">
          <Star :size="35" :stroke-width="0" class="fill-pokedarkgray" />
        </button>
      </div>
    </div>
  </div>

  <div v-else>No pokemon found!</div>
</template>

<script lang="ts" setup>
import { PokeInfo } from '@/interfaces/pokeSingle';
import { capitalize, computed, defineProps, PropType } from 'vue';
import { useFavoriteStore } from '@/store';
import { Star } from 'lucide-vue-next'

const favoriteStore = useFavoriteStore();

const props = defineProps({
  pokemon: {
    type: Object as PropType<PokeInfo>,
  }
})

const isFavorite = computed(() =>
  favoriteStore.favorites.some((fav) => fav.name === props?.pokemon?.name)
);

function shareWithFriends() {
  if (props.pokemon) {
    const name = capitalize(props.pokemon.name);
    const types = props.pokemon.types.map((type) => capitalize(type.type.name)).join(', ');
    const clipboardText = `Pokémon: ${name}\nTypes: ${types}`;

    navigator.clipboard.writeText(clipboardText)
      .then(() => {
        alert('Copied to the clipboard!')
      })
      .catch((err) => {
        console.error('Failed to copy to clipboard: ', err);
      });
  }
}

</script>

<style scoped>
figure {
  background-image: url('../assets/backdrop.png');
  background-size: cover;
}
</style>