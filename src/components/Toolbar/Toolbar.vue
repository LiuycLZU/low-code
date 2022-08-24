<template>
  <div>
    <div class="toolbar">
      <el-button style="margin-left: 10px" @click="openPreview">预览</el-button>
      <a href="#" download="index.html"><el-button>保存</el-button></a>
    </div>

    <!-- 预览 -->
    <Preview
      v-if="isShowPreview"
      :is-screenshot="isScreenshot"
      @close="handlePreviewChange"
    />
  </div>
</template>
<script>
export default defineComponent({
  name: "Toolbar",
});
</script>
<script setup>
import { defineComponent, ref } from "vue";
import Preview from "@/components/Toolbar/Preview.vue";
let isShowPreview = ref(false);
function openPreview() {
  isShowPreview.value = true;
}
</script>

<!-- 标题栏样式 -->
<style lang="scss" scoped>
.toolbar {
  padding: 15px 10px;
  white-space: nowrap;
  overflow-x: auto;
  background: rgb(255, 255, 255);
  border-bottom: 1px solid #ddd;
  padding: 5px 10px;
  margin: 70px 0px 10px 0px;
}
</style>
