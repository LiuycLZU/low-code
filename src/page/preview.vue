<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <router-link to="/"> {{ "< 返回" }}</router-link>
        <span>预览</span>
        <el-button>下载</el-button>
      </div>
    </template>
    <previewPaint/>
  </el-card>
</template>
<script>
export default defineComponent({
  name: "preview",
});
</script>
<script setup>
import { defineComponent } from "vue";
import previewPaint from "@/components/Toolbar/previewPaint.vue"
</script>
<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
}
.box-card {
  width: 80vw;
  padding: 30px 10px;
}
</style>