<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { Modal } from "usemodal-vue3";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});

const increase = () => {
  store.commit("increaseCount");
};
const increase5 = () => {
  store.commit({
    type: "increaseCountByNumber",
    num: 5,
  });
};
const isModalOpen = ref(false);
</script>

<template>
  <h1>Welcome to {{ title }}</h1>
  <h2>
    <router-link to="/" class="nav-item">Home</router-link>
    <router-link to="/Meals/random" class="nav-item">Random meal</router-link>
    <router-link to="/about" class="nav-item">About</router-link>
  </h2>
</template>

<style lang="scss" scoped>
h1,
h2 {
  background-color: rgb(117, 101, 101);
  color: white;
  font-weight: bold;
  text-align: center;
}
.nav-item {
  margin-right: 2em;
  color: antiquewhite;
  text-decoration: none;
  &:hover {
    color: rgb(216, 189, 153);
  }
}
</style>
