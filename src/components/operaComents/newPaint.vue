<template>
  <!-- 新建画布 -->
  <el-button @click="dialogFormVisible = true">新建画布</el-button>
  <el-dialog
    v-model="dialogFormVisible"
    title="新建画布"
    width="500px"
    draggable
  >
    <el-form v-model="from">
      <el-form-item label="画布长：" label-width="100px">
        <el-input @input="from.length=from.length.replace(/\D/g,'')"  v-model="from.length" />
      </el-form-item>
      <el-form-item label="画布宽：" label-width="100px">
        <el-input @input="from.length=from.length.replace(/\D/g,'')"  v-model="from.width" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="onsubmit">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script>
export default defineComponent({
  name: "newPaint",
});
</script>
<script setup>
import { defineComponent, reactive, ref } from "vue";
import { usePaintStore } from "@/stores/paint.js";
import { storeToRefs } from "pinia";
let dialogFormVisible = ref(false);
let from = reactive({ length: "", width: "" });
//返回画布数据
const paintStore = usePaintStore();
function onsubmit() {
  paintStore.width = from.width;
  paintStore.length = from.length;
  dialogFormVisible.value = false;
}
</script>
<style scoped></style>