import { createStore } from "vuex";

const store = createStore({
  state: {
    MealsInCart: [],
  },
  mutations: {
    setMealsInCart: (state, payload) => {
      state.MealsInCart = payload;
    },
    ADD_MEAL_TO_CART: (state, meal) => {
      state.MealsInCart.push(meal);
    },
    REMOVE_MEAL_FROM_CART: (state, meal) => {
      state.MealsInCart = state.MealsInCart.filter(function (item) {
        return item.idMeal !== meal.idMeal;
      });
    },
  },
  getters: {
    cart: (state) => {
      return state.MealsInCart;
    },
  },
  actions: {
    addtocart: ({ commit }, meal) => {
      commit("ADD_MEAL_TO_CART", meal);
    },
    removeFromCart: ({ commit }, meal) => {
      commit("REMOVE_MEAL_FROM_CART", meal);
    },
  },
  modules: {},
});
export default store;

//filter(function (item) {
//   return item.idMeal !== meal.idMeal;
// });
