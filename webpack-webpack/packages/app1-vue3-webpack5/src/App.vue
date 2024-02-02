<template>
  <img src="./static/home.png" width="50" height="50" />
  <h1>Host App: Vue3 + Webpack 5</h1>

  <Suspense>
    <Comp2 city="v3w5老街" :temperature="temp2" />
    <template #fallback> vue3+webpack5 组件加载失败 </template>
  </Suspense>

  <Suspense>
    <Comp3 msg="😄DYNAMIC" />
    <template #fallback> vue3+vite 组件加载失败 </template>
  </Suspense>

  <div id="comp4-container">
    <Comp4 class="v2-btn" msg="哈啰摩托" />
  </div>

  <div id="comp5-container">
    <Comp5 class="v2-btn" text="v2w5 button" @btnClick="onButtonClick" />
  </div>
</template>

<script setup>
import { defineAsyncComponent, ref } from "vue";
import { vue2ToVue3 } from "./utils/module";
import Vue2_1 from "app_v2w4/vue2";
import Vue2Button_1 from "app_v2w4/Hello";
import Vue2_2 from "app_v2w5/vue2";
import Vue2Button_2 from "app_v2w5/Button";
import { importViteESM } from "./utils/vite.fede";

const temp2 = ref(30);
const Comp2 = defineAsyncComponent(async () => {
  return (await import("app_v3w5/WC")).WeatherConsumer;
});
const Comp4 = vue2ToVue3(Vue2_1, Vue2Button_1, "comp4-container");
const Comp5 = vue2ToVue3(Vue2_2, Vue2Button_2, "comp5-container");
const onButtonClick = (e) => {
  temp2.value += 1;
};

const Comp3 = defineAsyncComponent(() =>
  importViteESM("http://localhost:3003/assets/remoteEntry.js", "./Content")
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

<style>
.v2-btn {
  padding: 5px 8px;
}
</style>
