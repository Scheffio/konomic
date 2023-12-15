<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
body, html {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100vh;
    background-color: #181818;
}

a {
  text-decoration: none;
  user-select: none;
  color: #41B883;
}

.router-link-exact-active {
        border-bottom: 2px solid #41B883;
    }
</style>
