<template>
  <img src="./static/home.png" width="50" height="50" />
  <h1>Host App: Vue3 + Webpack 5</h1>
  <Suspense>
    <Comp2 city="老街" :temperature="30" />
    <template #fallback> vue3+webpack5 组件加载失败 </template>
  </Suspense>
  <!-- <Suspense> -->
  <!--   <Comp2 city="庙街" :temperature="-30" /> -->
  <!--   <template #fallback> vue3+vite 组件加载失败 </template> -->
  <!-- </Suspense> -->
  <!-- <Suspense> -->
  <!--   <Comp3 city="高碑店" :temperature="-10" /> -->
  <!--   <template #fallback> vue2+webpack4 组件加载失败 </template> -->
  <!-- </Suspense> -->

  <div id="comp5-ctn"></div>
  <Comp5 text="vue2webpack5 button" @btnClick="onButtonClick" />
</template>

<script setup>
import { defineAsyncComponent } from "vue";
import { vue2ToVue3 } from "./utils/module";
import Vue2Button from "app_v2w5/Button";

const Comp2 = defineAsyncComponent(async () => {
  return (await import("app_v3w5/WC")).WeatherConsumer;
});
// const Comp2 = defineAsyncComponent(async () => {
//   const mod = await import("app_v3vite");
//   return mod.default;
// });
// const V2Btn = vue2ToVue3(Vue2Button, "V2Btn");
const Comp5 = vue2ToVue3(Vue2Button, "comp5-ctn");
const onButtonClick = (e) => {
  console.log(111, e);
};
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
