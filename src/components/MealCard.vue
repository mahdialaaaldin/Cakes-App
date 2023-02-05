<script setup>
import { computed, onMounted, ref, watch } from "vue";
import Button from "./Button.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const { getters, dispatch, state } = useStore();

const MealsInCart = computed(() => state.MealsInCart);

const Router = useRouter();
const props = defineProps({
  meal: {
    type: Object,
    required: true,
  },
});
const cartUrl = ref([
  "https://cdn-icons-png.flaticon.com/512/4290/4290854.png",
  "https://cdn-icons-png.flaticon.com/512/4290/4290701.png",
]);
const url = ref("");
url.value = cartUrl.value[0];
const isExpanded = ref(false);
const btnText = computed(() => (!isExpanded.value ? "View more" : "View less"));
const isInCart = (meal) => {
  return JSON.parse(localStorage.getItem("MealsCart")).find(
    (m) => m.idMeal === meal.idMeal
  );
};
const description = computed(() =>
  isExpanded.value
    ? props.meal.strInstructions
    : props.meal.strInstructions.substring(0, 50) + " . . .  "
);

watch(props.meal, () => {
  url.value = props.meal.inCart ? cartUrl.value[0] : cartUrl.value[1];
});
const handleClick = () => {
  isExpanded.value = !isExpanded.value;
};
const emit = defineEmits(["add", "remove"]);
const addToCart = () => {
  url.value = !props.meal.inCart ? cartUrl.value[0] : cartUrl.value[1];
  !props.meal.inCart ? emit("add") : emit("remove");
};
onMounted(() => {
  url.value = props.meal.inCart ? cartUrl.value[0] : cartUrl.value[1];
});
const goToMeal = () => {
  Router.push(`/Meals/${props.meal.idMeal}`);
};
</script>

<template>
  <div class="meal" @click="goToMeal()">
    <h2 class="title">{{ meal.strMeal }}</h2>
    <div class="meal_image">
      <img :src="meal.strMealThumb" :alt="meal.strMealThumb" class="meal_img" />
    </div>

    <div class="meal_paragraph">
      <i>{{ meal.strCategory }}</i>
      <p>{{ description }}</p>
      <div class="btns">
        <Button @click.stop="handleClick" :label="btnText" class="view" />
        <img
          :src="url"
          alt="addtocart"
          class="addToCart"
          @click.stop="addToCart"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.meal {
  display: flex;
  flex-direction: column;
  align-content: stretch;
  cursor: grab;
  justify-content: center;
  align-items: center;
  border-radius: 0.5em;
  background-color: #909399;
  color: white;
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

    cursor: pointer;
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
    font-size: 13px;
    font-weight: 600;
    justify-content: center;
    line-height: 1.25;
    margin: 0;
    min-height: 2rem;
    padding: calc(0.875rem - 1px) calc(1.5rem - 1px);
    position: relative;
    text-decoration: none;
    transition: all 250ms;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: baseline;
    width: auto;
    height: 1em;
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
