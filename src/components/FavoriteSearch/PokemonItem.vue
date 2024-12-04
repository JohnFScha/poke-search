<template>
  <li
    class="flex justify-between items-center gap-2 bg-pokewhite rounded-md px-10 py-5 text-xl lg:text-4xl w-10/12 lg:w-full my-2 lg:my-5">
    <p class="text-pokeblack cursor-pointer" @click="openModal(props.name)">{{ upperName }}</p>
    <button v-if="isFavorite" @click="favoriteStore.removeFavorite(props.name)"
      class="btn btn-circle bg-pokebackground border-0 hover:bg-pokebackground">
      <Star :stroke-width="0" class="fill-pokeyellow size-4 lg:size-8" />
    </button>
    <button v-else @click="favoriteStore.addFavorite({ name: props.name, id: props.id })"
      class="btn btn-circle bg-pokebackground border-0 hover:bg-pokebackground">
      <Star :stroke-width="0" class="fill-pokedarkgray size-4 lg:size-8" />
    </button>
  </li>

  <!-- Modal -->
  <dialog :id="`my_modal_${props.id}`" class="modal rounded-sm" ref="modalRef">
    <div v-if="pokeStore.loadingPoke"
      class="modal-box flex justify-center items-center min-h-[700px] max-w-[1000px] bg-white">
      <img :src="loader" alt="Loading" class="animate-spin" />
    </div>
    <div v-else class="modal-box p-0 bg-white relative max-w-[1000px]">
      <PokeModalContent :pokemon="pokeStore.pokemon!" />
      <form method="dialog" class="absolute top-3 right-3">
        <button>
          <img :src="cancel" alt="cancel" width="30" height="30">
        </button>
      </form>
    </div>
  </dialog>
</template>

<script lang="ts" setup>
import { computed, defineProps, ref } from 'vue';
import { Star } from 'lucide-vue-next'
import { useFavoriteStore, usePokeStore } from '@/store';
import PokeModalContent from '../PokeModalContent.vue';
import loader from '@/assets/Loader.png'
import cancel from '@/assets/cancel.png'

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
const pokeStore = usePokeStore();

const modalRef = ref<HTMLDialogElement | null>(null); // Reference to modal

const upperName = computed(() => {
  return props.name.charAt(0).toUpperCase() + props.name.slice(1,);
})

const isFavorite = computed(() =>
  favoriteStore.favorites.some((fav) => fav.name === props.name)
);

const openModal = async (name: string) => {
  if (modalRef.value) {
    modalRef.value.showModal(); // Show the modal
    await pokeStore.throwPokeBall(name); // Fetch comics for the character
  }
};

</script>