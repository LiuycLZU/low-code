<template>
  <div class="footer">
    <h1>{{msg}}</h1>
  </div>
</template>

<script>

export default {
  data() {
    return {msg: '我找的bug都队'}
  }
}
</script>

<style scoped>
.footer {
  width: 100%;
  height: 100px;
  background-color: #288da4;
}
h1{
  text-align: center;
  margin: 0 auto;
}
</style>