<template>
  <el-button @click="dialogFormVisible = true">新建画布</el-button>
  <el-dialog v-model="dialogFormVisible" title="新建画布" width="500px" draggable>
    <el-form v-model="from">
      <el-form-item label="画布长：" label-width="100px">
        <el-input type="number" v-model="from.length" />
      </el-form-item>
      <el-form-item label="画布宽：" label-width="100px">
        <el-input type="number" v-model="from.width" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="onsubmit"
          >确定</el-button
        >
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
import emitter from "@/utils/emit"
let dialogFormVisible = ref(false);
let from = reactive({length:'',width:''});
function onsubmit(){
    return from;
}

</script>
<style scoped></style>