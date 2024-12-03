import { PokeGlobalResponse } from "@/interfaces/pokeGlobal";
import { PokeInfo, PokeSingleResponse } from "@/interfaces/pokeSingle";

export async function getAllPokemon(): Promise<PokeGlobalResponse | undefined> {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=0`);
    if (!response.ok) {
      console.log('No pokemon in sight!');
    }
    const data: PokeGlobalResponse = await response.json();
    return data
  } catch (error) {
    console.error("Error fetching characters:", error);
  }
}

export async function getPokeByName(poke: string): Promise<PokeInfo | undefined> {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke}`);
    if (!response.ok) {
      console.log('Pokemon ran away!');
    }
    const {id, name, weight, height, types}: PokeSingleResponse = await response.json();
    return {id, name, weight, height, types}
  } catch (error) {
    console.error("Error fetching characters:", error);
  }
}