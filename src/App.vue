<template>
  <img src="./static/home.png" width="50" height="50" />
  <h1>Host App: Vue3 + Webpack 5</h1>
  <Comp1 />
</template>

<script setup>
import { defineComponent, defineAsyncComponent } from "vue";

const Comp1 = defineAsyncComponent(() => import("app_v3w5/WC"));
</script>

<style scoped>
h1 {
  width: 100%;
  text-align: center;
  margin-top: 10px;
}

img {
  display: block;
  margin: auto;
}
</style>

