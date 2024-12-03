import { defineStore } from "pinia";
import { ref } from "vue";
import { getAllPokemon, getPokeByName } from "@/api";
import { PokeGlobalResponse } from "@/interfaces/pokeGlobal";
import { PokeInfo } from "@/interfaces/pokeSingle";

export const usePokeStore = defineStore('pokeStore', () => {
  const pokemons = ref<PokeGlobalResponse | undefined>()
  const pokemon = ref<PokeInfo | undefined>()
  const searchPoke = ref('')
  const loading = ref(false)

  async function gottaCatchEmAll() {
    loading.value = true
    try {
      pokemons.value = await getAllPokemon(); 
    } catch (error) {
      console.error("Error fetching characters:", error);
    } finally {
      loading.value = false
    }
  }

  async function throwPokeBall(poke: string) {
    try {
      searchPoke.value = poke; 
      if (poke.trim() === "") {
        await getAllPokemon();
        pokemon.value = undefined
      } else {
        pokemon.value = await getPokeByName(poke);
      }
    } catch (error) {
      console.error("Error refreshing character list:", error);
    }
  }

  return {
    loading,
    pokemon,
    pokemons,
    searchPoke,
    gottaCatchEmAll, 
    throwPokeBall
  }
})

export const useFavoriteStore = defineStore('favorites', () => {
  const favorites = ref<Partial<PokeInfo>[]>(JSON.parse(localStorage.getItem('favorites') || '[]')); 
  const searchQuery = ref('');
  
  function addFavorite(character: Partial<PokeInfo>) {
    if (!favorites.value.some((fav) => fav.id === character.id)) {
      favorites.value.push(character);
      localStorage.setItem('favorites', JSON.stringify(favorites.value));
    }
  }

  function removeFavorite(pokeId?: number, pokeName?: string) {
    favorites.value = favorites.value.filter((fav) => fav.id !== pokeId || fav.name !== pokeName);
    localStorage.setItem('favorites', JSON.stringify(favorites.value));
  }

  function searchFavorites(query: string) {
    return favorites.value.filter(fav => 
      fav.name?.toLowerCase().includes(query.toLowerCase())
    );
  }

  return {
    favorites,
    addFavorite,
    removeFavorite,
    searchQuery,
    searchFavorites
  }
})