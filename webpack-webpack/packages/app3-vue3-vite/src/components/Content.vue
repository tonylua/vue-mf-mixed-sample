<template>
  <div @click="click" style="padding: 10px 1em; font-size: 30px">
    Vite Content {{ msg }}
  </div>
</template>
<script>
export default {
  props: ["msg"],
  methods: {
    click() {
      alert("im from Vite");
    },
  },
};
</script>
