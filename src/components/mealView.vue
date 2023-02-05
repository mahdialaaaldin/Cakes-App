<script setup>
import axios from "axios";
import { computed, onMounted, reactive, ref, watch } from "vue";
import Button from "./Button.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const loading = ref(true);
const meal = ref([]);
onMounted(() => {
  loading.value = false;
  let api = ref("");
  if (route.params.id == "random")
    api.value = "https://www.themealdb.com/api/json/v1/1/random.php";
  else
    api.value = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${route.params.id}`;
  axios
    .get(api.value)
    .then((response) => {
      meal.value = response.data.meals.length > 0 ? response.data.meals[0] : [];
      console.log(response.data.meals[0], response);
    })
    .catch((error) => {
      console.log(error);
    });
});
</script>

<template>
  <div v-if="loading">loading</div>
  <div class="meal" v-else>
    <h1 class="title">{{ meal.strMeal }}</h1>
    <div class="meal_image">
      <img :src="meal.strMealThumb" :alt="meal.strMealThumb" class="meal_img" />
    </div>

    <div class="meal_paragraph">
      <i>{{ meal.strCategory }}</i>
      <p>{{ meal.strInstructions }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.meal {
  margin: 2em auto;
  padding-bottom: 2em;
  display: flex;
  flex-direction: column;
  align-content: stretch;
  justify-content: center;
  align-items: center;
  border-radius: 2em;
  background-color: grey;
  color: white;
  width: 40%;
  .meal_paragraph {
    padding: 10px 30px;
  }
  i {
    opacity: 0.7;
  }
  .meal_img {
    max-width: 100%;
    border-radius: 20px;
  }
  .meal_image {
    padding: 3px 50px;
  }
  .addToCart {
    height: 2em;
    width: 2em;
  }
  .btns {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .view {
    align-items: center;
    background-clip: padding-box;
    background-color: #fa6400;
    border: 1px solid transparent;
    border-radius: 0.25rem;
    box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    display: inline-flex;
    font-family: system-ui, -apple-system, system-ui, "Helvetica Neue",
      Helvetica, Arial, sans-serif;
    font-size: 16px;
    font-weight: 600;
    justify-content: center;
    line-height: 1.25;
    margin: 0;
    min-height: 3rem;
    padding: calc(0.875rem - 1px) calc(1.5rem - 1px);
    position: relative;
    text-decoration: none;
    transition: all 250ms;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: baseline;
    width: auto;
    &:hover,
    &:focus {
      background-color: #fb8332;
      box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
    }
    &:active {
      background-color: #c85000;
      box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
      transform: translateY(0);
    }
  }
}
</style>
