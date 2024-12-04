import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { getAllPokemon, getPokeByName } from "@/api";
import { PokeGlobalResponse } from "@/interfaces/pokeGlobal";
import { PokeInfo } from "@/interfaces/pokeSingle";

export const usePokeStore = defineStore("pokeStore", () => {
  const pokemons = ref<PokeGlobalResponse>({
    count: 0,
    next: "",
    previous: "",
    results: [],
  });
  const pokemon = ref<PokeInfo | undefined>();
  const searchPoke = ref("");
  const loading = ref(false);
  const loadingPoke = ref(false);
  const next = ref<string | null>(null);

  async function gottaCatchEmAll() {
    loading.value = true;
    try {
      const data = await getAllPokemon();

      if (data) {
        pokemons.value = data;
        next.value = data.next;
      }
    } catch (error) {
      console.error("Error fetching characters:", error);
    } finally {
      loading.value = false;
    }
  }

  async function loadNextBatch() {
    if (!next.value || loading.value) return;

    loading.value = true;
    try {
      const response = await fetch(next.value);
      const data: PokeGlobalResponse = await response.json();

      if (data) {
        pokemons.value.results.push(...data.results); // Append new results
        next.value = data.next; // Update the `next` URL
      }
    } catch (error) {
      console.error("Error fetching next Pokémon batch:", error);
    } finally {
      loading.value = false;
    }
  }

  async function throwPokeBall(poke: string) {
    loadingPoke.value = true;
    try {
      if (poke.trim() === "") {
        pokemon.value = undefined;
      } else {
        pokemon.value = await getPokeByName(poke.toLocaleLowerCase());
      }
    } catch (error) {
      console.error("Error refreshing character list:", error);
    } finally {
      loadingPoke.value = false;
    }
  }

  const filteredPokemons = computed(() => {
    if (searchPoke.value.length > 3) {
      return pokemons.value.results.filter((poke) => poke.name.includes(searchPoke.value.toLowerCase()));
    } else {
      return pokemons.value.results;
    }
  });

  return {
    loading,
    loadingPoke,
    next,
    loadNextBatch,
    pokemon,
    pokemons,
    filteredPokemons,
    searchPoke,
    gottaCatchEmAll,
    throwPokeBall,
  };
});

export const useFavoriteStore = defineStore("favorites", () => {
  const favorites = ref<Partial<PokeInfo>[]>(JSON.parse(localStorage.getItem("favorites") || "[]"));
  const searchQuery = ref("");

  function addFavorite(character: Partial<PokeInfo>) {
    if (!favorites.value.some((fav) => fav.id === character.id)) {
      favorites.value.push(character);
      localStorage.setItem("favorites", JSON.stringify(favorites.value));
    }
  }

  function removeFavorite(pokeName: string) {
    favorites.value = favorites.value.filter((fav) => fav.name !== pokeName);
    localStorage.setItem("favorites", JSON.stringify(favorites.value));
  }

  const filteredFavorites = computed(() => {
    if (!searchQuery.value.trim()) {
      return favorites.value;
    }
    return favorites.value.filter((fav) => fav.name?.toLowerCase().includes(searchQuery.value.toLowerCase()));
  });

  return {
    favorites,
    addFavorite,
    removeFavorite,
    searchQuery,
    filteredFavorites,
  };
});
