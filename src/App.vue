<template>
  <img src="./static/home.png" width="50" height="50" />
  <h1>Host App: Vue3 + Webpack 5</h1>
  <Comp1 city="老街" temperature="30" />
</template>

<script setup>
import { defineComponent, defineAsyncComponent } from "vue";

const Comp1 = defineAsyncComponent(async () => {
  return (await import("app_v3w5/WC")).WeatherConsumer;
});
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
