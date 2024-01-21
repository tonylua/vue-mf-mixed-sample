<template>
  <img src="./static/home.png" width="50" height="50" />
  <h1>Host App: Vue3 + Webpack 5</h1>
  <Suspense>
    <Comp1 city="老街" temperature="30" />
    <template #fallback> vue3+webpack5 组件加载失败 </template>
  </Suspense>
  <Suspense>
    <Comp2 city="庙街" temperature="-30" />
    <template #fallback> vue3+vite 组件加载失败 </template>
  </Suspense>
</template>

<script setup>
import { defineComponent, defineAsyncComponent } from "vue";

const Comp1 = defineAsyncComponent(async () => {
  return (await import("app_v3w5/WC")).WeatherConsumer;
});
const Comp2 = defineAsyncComponent(async () => {
  return import("app_v3vite/WC");
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
