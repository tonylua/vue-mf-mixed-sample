<template>
  <h1>This is a title from v3w5 {{ msg }}</h1>
</template>

<script setup>
const props = defineProps({
  msg: {
    type: String,
    default: "",
  },
});
</script>
