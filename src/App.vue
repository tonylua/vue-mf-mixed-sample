<template>
  <img src="./static/home.png" width="50" height="50" />
  <h1>Host App: Vue3 + Webpack 5</h1>

  <Suspense>
    <Comp2 city="v3w5老街" :temperature="temp2" />
    <template #fallback> vue3+webpack5 组件加载失败 </template>
  </Suspense>

  <div id="comp5-container">
    <Comp5 class="v2-btn" text="v2w5 button" @btnClick="onButtonClick" />
  </div>
</template>

<script setup>
import { defineAsyncComponent, ref } from "vue";
import { vue2ToVue3 } from "./utils/module";
import Vue2Button from "app_v2w5/Button";

const temp2 = ref(30);
const Comp2 = defineAsyncComponent(async () => {
  return (await import("app_v3w5/WC")).WeatherConsumer;
});
const Comp5 = vue2ToVue3(Vue2Button, "comp5-container");
const onButtonClick = (e) => {
  temp2.value += 1;
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

<style>
.v2-btn {
  padding: 5px 8px;
}
</style>
