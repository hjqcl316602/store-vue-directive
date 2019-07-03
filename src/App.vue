<template>
  <div id="app">
    <div>
      dsd sss
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      value: "red"
    };
  },
  mounted() {
    setTimeout(() => {
      this.value = "blue";
    }, 2000);
  }
};
</script>

<style>
.flex-box {
  height: 50px;
  background-color: red;
  color: #fff;
}
</style>
