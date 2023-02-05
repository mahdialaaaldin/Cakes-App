<script setup>
//import loginform from "./components/loginform.vue";
import Header from "./components/Header.vue";
import Meals from "./components/Meals.vue";
</script>

<template>
  <div>
    <Header title="Our restaurant" />
    <router-view />
    <!-- <loginform /> -->
  </div>
</template>
<style>
#app {
  font-family: system-ui, -apple-system, system-ui, "Helvetica Neue", Helvetica,
    Arial, sans-serif;
}
</style>

