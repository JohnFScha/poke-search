<template>
  <section class="flex min-h-screen flex-col justify-start items-center gap-5 text-pokeblack">
    <h2 class="text-3xl lg:text-6xl font-semibold ">Uh-oh!</h2>
    <p class="text-xl lg:text-3xl text-center">You look lost in your journey!</p>
    <router-link to="/pokesearch"
      class="btn h-auto rounded-full bg-pokered text-pokewhite border-0 text-lg lg:text-2xl px-4 lg:p-4 hover:bg-pokeredmuted">
      Go back home
    </router-link>
  </section>
</template>

<script lang="ts" setup>
</script>