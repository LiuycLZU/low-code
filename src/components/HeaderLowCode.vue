<template>
  <div class="header">
    <h1 id="bt">{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  data(){
    return {
      msg:'LowCode'
    }
  }
}
</script>

<style scoped>
    .header {
      width: 100%;
      height: 100px;
      line-height: 100px;
      background-color: #a0cc39;
    }
    h1{
      margin-top: 0;
    }
</style>