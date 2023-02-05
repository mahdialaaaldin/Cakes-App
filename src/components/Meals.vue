<script setup>
import MealCard from "./MealCard.vue";
import axios from "axios";
import { onMounted, reactive, ref, watch, computed } from "vue";
import Input from "./Input.vue";
import Button from "./Button.vue";
import { useStore } from "vuex";
import { Modal } from "usemodal-vue3";
const { getters, dispatch } = useStore();
const MealsInCart = computed(() => getters.cart);

watch(MealsInCart, () => {
  console.log(MealsInCart.value);
});

const Data = reactive({
  meals: [],
  filteredMeals: null,
});
const isModalOpen = ref(false);
const search = ref("");
const loading = ref(false);
const cart = reactive({ value: [] });
watch(search, async (newSearch, oldSearch) => {
  Data.filteredMeals = Data.meals.filter((meal) => {
    return (
      meal.strMeal.toLowerCase().includes(search.value.toLowerCase()) ||
      meal.strCategory.toLowerCase().includes(search.value.toLowerCase())
    );
  });
});
const Meals = computed(() => Data.filteredMeals || Data.meals);
const getData = async (s = "") => {
  try {
    loading.value = true;
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=cake`
    );
    Data.meals = response.data.meals || [];
    for (let meal of Data.meals) {
      meal.inCart = isInCart(meal);
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};
const showModal = () => {
  isModalOpen.value = !isModalOpen.value;
};
const reset = () => {
  search.value = "";
};
const addToCart = (meal) => {
  dispatch("addtocart", meal);

  meal.inCart = true;
};
const removeFromCart = (meal) => {
  dispatch("removeFromCart", meal);

  meal.inCart = false;
};
onMounted(() => {
  getData();
});
const isInCart = (meal) => {
  return MealsInCart.value.find((m) => m.idMeal === meal.idMeal);
};
const vFocus = {
  mounted: (el) => el.focus(),
};
</script>

<template>
  <div>
    <div class="searchDiv">
      <el-input placeholder="search" v-model="search" class="search" clearable>
      </el-input>
      <el-button
        type="info"
        @click="showModal"
        v-show="!isModalOpen"
        class-name="MycartBtn"
      >
        Show My cart 🛒</el-button
      >
      <el-button
        type="danger"
        @click="showModal"
        v-show="isModalOpen"
        class-name="MycartBtn"
        >Close My cart 🛒</el-button
      >
    </div>
    <div class="searchCategory">
      <!-- <el-button type="danger" @click="reset" class-name="reset"
        >Reset</el-button
      > -->
    </div>
    <Modal v-model:visible="isModalOpen" title="Your cart list" width="800">
      <div class="cartItems" v-if="MealsInCart.length == 0">
        You don't have items on your cart
      </div>
      <div class="cartItems" v-else>
        <h2>Your cart items :</h2>
        <div v-for="item in MealsInCart" class="cartItem" :key="item.idMeal">
          <p>{{ item.strMeal }}</p>
          <img
            :src="item.strMealThumb"
            :alt="item.strMealThumb"
            class="item_img"
          />

          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="removeFromCart(item)"
            circle
          ></el-button>
        </div>
      </div>
    </Modal>
    <div class="loading" v-if="loading">Loading ...</div>
    <div v-else>
      <h2 v-if="Meals.length == 0">No results</h2>
      <div class="meals" v-else>
        <MealCard
          v-for="meal in Meals"
          :meal="meal"
          :key="meal.idMeal"
          @add="addToCart(meal)"
          @remove="removeFromCart(meal)"
        />
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.searchDiv {
  display: flex;
  align-items: center;
  padding: 1em;
}
.meals {
  display: grid;
  gap: 1em;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  justify-content: center;
  background: #ecf0f3;
  padding: 50px 10px;
}
.search {
  margin: 1em 1em;
  display: block;
}

.searchCategory {
  display: flex;
  align-items: stretch;
  align-content: flex-start;
  justify-content: center;
  margin-bottom: 1em;
}
button {
  margin-left: 1em;
}
h2 {
  text-align: center;
  color: red;
  margin-top: 3em;
}
.loading {
  margin-top: 5em;
  text-align: center;
  color: grey;
  font-size: 3em;
}
.item_img {
  height: 3em;
}
.cartItems {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
  margin-bottom: 1em;
  border-radius: 2em;
  .cartItem {
    display: grid;
    grid-template-columns: auto auto auto;
    background-color: rgba(19, 18, 18, 0.103);
    padding: 10px;
    width: 50em;
    border-bottom: 1px solid grey;
    &:last-child {
      border-bottom: 0;
    }
    * {
      padding: 20px;
      font-size: 30px;
      width: 7em;
      align-self: center;
    }
    img {
      width: 5em;
      height: 5em;
      padding: 0;
    }
    button {
      padding: 0;
      width: 1em;
      height: 1em;
      align-self: center;
    }
  }
}
</style>
<style>
body {
  overflow-y: v-bind(isOverflowAllowed) !important;
}
</style>





