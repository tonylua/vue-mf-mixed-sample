<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <i>[from vue2+webpack4]</i>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
};
</script>

<style scoped>
h1 {
  margin: 10px 0 0;
}
</style>
