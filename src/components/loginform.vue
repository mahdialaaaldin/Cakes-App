<script setup>
import { onMounted, reactive, ref } from "vue";
import axios from "axios";
const username = ref("");
const password = ref("");
function onSubmit() {
  if (!username.value || !password.value) {
    alert("empty");
  } else {
    let success = false;

    // info.users.forEach((user) => {
    //   if (user.username == username.value && user.password == password.value) {
    //     alert("login successuf");
    //     console.log(user.username);
    //     success = true;
    //   }
    // });

    for (const user of info.users) {
      if (user.username == username.value && user.password == password.value) {
        alert("login successuf");
        console.log(user.username);
        success = true;
        break;
      }
    }
    if (!success) alert("login failed");
    //  console.log()
  }
  //console.log(username.value);
}
const info = reactive({
  users: [],
});
onMounted(async () => {
  const response = await axios.get(
    "https://api.npoint.io/c6f6a1c0315bd26c9509"
  );
  info.users = response.data.users;
  // console.log(info.users);
});
</script>

<template>
  <form v-on:submit.prevent="onSubmit">
    <input type="text" placeholder="username" v-model="username" />
    <input type="password" placeholder="password" v-model="password" />
    <button>Login</button>
  </form>
</template>

<style scoped>
form {
  background-color: aqua;
  border: 1px solid pink;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  padding: 2em;
}
input {
  margin-bottom: 1em;
}
</style>
