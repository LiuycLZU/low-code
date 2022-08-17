<template>
  <div>
    <h2>{{mag}}</h2>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Bye",
  data(){
    return {
      mag:'我找的bug都队'
    }
  }
}
</script>

<style scoped>
  h2{
    margin-top: 0;
  }
</style>