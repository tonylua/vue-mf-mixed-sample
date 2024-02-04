<template>
  <img src="./static/home.png" width="50" height="50" />
  <h1>Host App: Vue3 + Webpack 5</h1>

  <fieldset>
    <legend>remote: vue3 + webpack5</legend>
    <Suspense>
      <Comp2 city="v3w5老街" :temperature="temp2" />
      <template #fallback> vue3+webpack5 组件加载... </template>
    </Suspense>
  </fieldset>

  <fieldset>
    <legend>remote: vue3 + webpack5</legend>
    <div id="comp5-container">
      <Comp5 class="v2-btn" text="v2w5 button" @btnClick="onButtonClick" />
    </div>
  </fieldset>

  <fieldset>
    <legend>remote: vue3 + vite</legend>
    <Suspense>
      <Comp3 msg="😄DYNAMIC" />
      <template #fallback> vue3+vite 组件加载... </template>
    </Suspense>
  </fieldset>

  <fieldset>
    <legend>remote: vue2 + webpack4</legend>
    <div id="comp4-container">
      <Comp4 class="v2-btn" msg="哈啰摩托" />
    </div>
  </fieldset>

  <fieldset>
    <legend>remote: vue3 + webpack5</legend>
    <Suspense>
      <Comp6 msg="😏DYNAMIC" />
      <template #fallback> vue3+webpack5 组件动态加载... </template>
    </Suspense>
  </fieldset>
</template>

<script setup>
import { defineAsyncComponent, ref } from "vue";
import { vue2ToVue3 } from "./utils/module";
import { getRemoteDynamic } from "./utils/dynamic-federated";

// 同步组件，配置在 webpack 中
import remoteVue2Instance1 from "app_v2w4/vue2";
import Vue2Hello from "app_v2w4/Hello";
import remoteVue2Instance2 from "app_v2w5/vue2";
import Vue2Button from "app_v2w5/Button";
const Comp4 = vue2ToVue3(remoteVue2Instance1, Vue2Hello, "comp4-container");
const Comp5 = vue2ToVue3(remoteVue2Instance2, Vue2Button, "comp5-container");
// 同样是声明在 webpack 中，但是远程组件中有异步依赖
const Comp2 = defineAsyncComponent(async () => {
  return (await import("app_v3w5/WC")).WeatherConsumer;
});
// 动态加载 vue3 + vite
const Comp3 = defineAsyncComponent(
  async () =>
    (
      await getRemoteDynamic(
        {
          remoteType: "vite",
          remoteAppName: "app3",
          remoteEntryURL: "http://localhost:3003/assets/remoteEntry.js",
        },
        "Content"
      )
    ).find((item) => item.name === "Content")?.component
);
// 动态加载 vue3 + webpack5
const Comp6 = defineAsyncComponent(
  async () =>
    (
      await getRemoteDynamic(
        {
          remoteType: "webpack",
          remoteAppName: "app2",
          remoteEntryURL: "http://localhost:3002/remoteEntry.js",
        },
        "Title"
      )
    ).find((item) => item.name === "Title")?.component
);

const temp2 = ref(30);
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
::v-deep button {
  background-color: #ccc;
}
fieldset {
  margin: 5px 10px;
  background-color: #fff;
  padding: 5px;
}
legend {
  background-color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  color: #333;
}
</style>

<style>
.v2-btn {
  padding: 5px 8px;
}
</style>
