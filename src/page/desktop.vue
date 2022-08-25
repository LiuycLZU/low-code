<template>
  <div class="center">
    <!-- 组件栏 -->
    <el-card class="components">
      <template #header>
        <span class="alignLeft">组件</span>
      </template>
      <comBarAll />
    </el-card>
    <!-- 画布栏 -->
    <el-card class="paint" body-style="height:80%">
      <template #header>
        <div class="newPaint">
          <p class="alignLeft">画布</p>
          <el-button class="mrs" @click="saveData">保存</el-button>
          <el-tooltip content="别忘记保存了哦，ヾ(๑╹ヮ╹๑)ﾉ"
            ><el-button class="mrs" @click="openPreview"
              >预览</el-button
            ></el-tooltip
          >
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
import { useRouter } from "vue-router";
//js
import { banZoom } from "@/utils/util.js";
import emiter from "@/utils/mitt.js";
//组件
import comBarAll from "@/components/comBarAll.vue";
import zPaint from "@/components/zPaint.vue";
import attrEdit from "@/components/attredit/attrEdit.vue";
import newPaint from "@/components/operaComents/newPaint.vue";
banZoom();
const router1 = useRouter();
let newPaintRef = ref(null);
//保存数据
function saveData() {
  emiter.emit("preview");
}
//预览事件
function openPreview() {
  router1.push("preview");
}
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