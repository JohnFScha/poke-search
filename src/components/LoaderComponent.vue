<template>
  <section class="min-h-screen flex justify-center items-center bg-pokewhite">
    <img :src="loader" alt="Loading" class="animate-spin" />
  </section>
</template>

<script setup>
import loader from '@/assets/Loader.png'
</script>