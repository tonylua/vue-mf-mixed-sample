<template>
  <img src="./static/home.png" width="50" height="50" />
  <h1>Remote App: Vue3 Webpack5</h1>
  <weather-consumer city="顿涅斯克" temperature="-10" />
</template>

<script setup>
import { defineAsyncComponent } from "vue";

const WeatherConsumer = defineAsyncComponent(() =>
  import("./components/WeatherConsumer").then((mod) => mod.WeatherConsumer)
);
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

