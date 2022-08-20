<template>
  <div class="left">
    <div class="LeftHeader">组件</div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Left"
}
</script>

<style scoped>
.left {
  width: 20%;
  height: 100%;
  background-color: aquamarine;
  float: left;
}
.LeftHeader {
  width: 100%;
  height: 40px;
  line-height: 40px;
  background: aquamarine;
  text-align: center;
  font-size: 20px;
  display: inline-block;
}
</style>