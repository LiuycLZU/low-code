<template>
  <div class="center">
    <el-card class="components">
      <template #header>
        <span class="alignLeft">组件</span>
      </template>
      <zButton
    /></el-card>
    <el-card class="paint">
      <template #header>
        <span class="alignLeft">画布</span>
        <newPaint ref="newPaintRef" /> </template
      ><zPaint
    /></el-card>
    <el-card class="attr">
      <template #header> <span class="alignLeft">编辑属性</span> </template
      ><attrEdit
    /></el-card>
  </div>
</template>
<script>
export default defineComponent({
  components: { newPaint },
  name: "desktop",
});
</script>
<script setup>
import { defineComponent, ref } from "vue";
import zButton from "@/components/zButton.vue";
import zPaint from "@/components/zPaint.vue";
import attrEdit from "@/components/attredit/attrEdit.vue";
import newPaint from "@/components/operaComents/newPaint.vue";
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
</style>