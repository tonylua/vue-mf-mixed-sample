<template>
  <div class="consumer" @click="onClick">
    <h1 style="color: orange" v-html="desc"></h1>
    {{ city }}: {{ centigrade }}
    <br />
    <div class="el-foo-bar custom-style">i am from app3@vue3+vite</div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from "vue";

const props = defineProps({
  city: {
    type: String,
    default: "unknown",
  },
  temperature: Number,
});

const emit = defineEmits(["msg"]);

const onClick = () => {
  console.log("app3 onClick", props.city);
  emit("msg", props.city);
};

const centigrade = computed(() => `${props.temperature || "--"}℃`);

const desc = "&lt;vue3-weather-consumer /&gt;";
</script>

<style scope>
.consumer {
  border: 1px solid var(--vue3-color, #336699);
  border-radius: 10px;
  width: 300px;
  box-sizing: border-box;
  padding: 20px;
}
</style>
