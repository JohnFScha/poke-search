<template>
  <main class="flex flex-col min-h-screen items-center justify-center text-pokeblack gap-10 bg-pokebackground">
    <img :src="pikachu" alt="pikachu" width="500" class="hover:scale-110 transition-all duration-150">
    <section role="heading" class="flex flex-col justify-center items-center gap-10 text-center">
      <h2 class="text-3xl lg:text-6xl font-semibold ">Welcome to Pokédex</h2>
      <p class="text-xl lg:text-3xl w-10/12">The digital encyclopedia created by Professor Oak is an invaluable tool to
        Trainers in
        the
        Pokémon world.</p>
      <router-link
        to="/pokesearch"
        class="btn h-auto rounded-full bg-pokered text-pokewhite border-0 text-lg lg:text-2xl px-4 lg:p-4 hover:bg-pokeredmuted"
        >
        Get started
      </router-link>
    </section>
  </main>
</template>
<script lang="ts" setup>
import pikachu from '@/assets/pikachu.png'
</script>
