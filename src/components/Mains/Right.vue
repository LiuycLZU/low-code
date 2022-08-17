<template>
  <div class="right">
    <div class="RightHeader">修改属性</div><br><br>
    <form label-width="50px" :inline="true">
      x坐标：<input :value="Arrs[0].left"/><br><br>
      y坐标：<input :value="Arrs[0].top"/><br><br>
      插件高度：<input :value="Arrs[0].height"/><br><br>
      插件宽度：<input :value="Arrs[0].width"/><br><br>
      <hr>
      <button>确定</button>
      <button>取消</button>
    </form>
  </div>
</template>

<script>
import {unit} from "@/js/mixin";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Left",
  mixins:[unit]
}
</script>

<style scoped>
.right {
  width: 20%;
  height: 100%;
  border: 1px solid red;
  float: left;
}
.RightHeader{
  width: 100%;
  height: 40px;
  line-height: 40px;
  background: aquamarine;
}
input{
  width: 50px;
}
</style>