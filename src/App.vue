<script  lang="ts">


import headView from './views/headViews.vue';
import leftView from './views/leftViews.vue';
import centerView from './views/centerViews.vue';
import rightView from './views/rightViews.vue';

export default {
  name: 'LowCode',
  components: {
    headView,
    leftView,
    centerView,
    rightView
  }
}

</script>

<template>
  <div id="app">
    <head-view></head-view>
    <div class="content-box">
      <left-view></left-view>
      <center-view></center-view>
      <right-view></right-view>
    </div>
  </div>
</template>

<style scoped>
.content-box{
  display: flex;
  height: calc(100vh - 60px);
}

</style>
