<template>
  <div class="hello">
    <h1>{{ num }}</h1>
    <i>[from vue2+webpack4]</i>
  </div>
</template>

<script>
export default {
  name: "HelloDynamic",
  props: {
    num: Number,
  },
};
</script>

<style scoped>
h1 {
  margin: 10px 0 0;
}
</style>
