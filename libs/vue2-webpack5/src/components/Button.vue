<template>
  <button @click="click">{{ text }}</button>
</template>

<script setup>
// import { defineProps, defineEmits } from "vue-demi";

const props = defineProps({
  text: {
    type: String,
    default: "button",
  },
});

const emit = defineEmits(["btnClick", "onBtnClick"]);

const click = (e) => {
  emit("btnClick", e);
  emit("onBtnClick", e);
};
</script>
