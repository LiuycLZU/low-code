<template>
  <div class="home">
    <Toolbar />
  </div>
  <div class="center">
    <!-- 组件栏 -->
    <el-card class="components">
      <template #header>
        <span class="alignLeft">组件</span>
      </template>
      <zButton
    /></el-card>
    <!-- 画布栏 -->
    <el-card class="paint" body-style="height:80%">
      <template #header>
        <div class="newPaint">
          <p class="alignLeft">画布</p>
          <newPaint ref="newPaintRef" /></div
      ></template>
      <zPaint
    /></el-card>
    <!-- 编辑栏 -->
    <el-card class="attr">
      <template #header> <span class="alignLeft">编辑属性</span> </template
      ><attrEdit
    /></el-card>
  </div>
</template>
<script>
export default defineComponent({
  name: "desktop",
});
</script>
<script setup>
import { defineComponent, ref } from "vue";
import zButton from "@/components/zButton.vue";
import zPaint from "@/components/zPaint.vue";
import attrEdit from "@/components/attredit/attrEdit.vue";
import newPaint from "@/components/operaComents/newPaint.vue";
import Toolbar from "@/components/Toolbar/Toolbar.vue"
import { banZoom } from "@/utils/util.js";
banZoom();
let newPaintRef = ref(null);
</script>
<style scoped>
.center {
  display: flex;
}
.components {
  height: 100vh;
  width: 20vw;
  margin-right: 20px;
}
.paint {
  height: 100vh;
  width: 60vw;
  margin-right: 20px;
}
.attr {
  height: 100vh;
  width: 20vw;
}
.alignLeft {
  width: 100%;
  text-align: start;
  display: inline-block;
}
.newPaint {
  display: flex;
  justify-content: space-between;
}
</style>