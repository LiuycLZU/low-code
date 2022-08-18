<template>
<!-- 编辑属性页面 -->
  <div>
    <el-form :model="form" label-width="50px" :inline="true">
      <el-form-item label="x :"> <el-input v-model="form.left" /></el-form-item>
      <el-form-item label="y :"> <el-input v-model="form.top" /></el-form-item>
      <el-form-item label="高度 :">
        <el-input v-model="form.height"
      /></el-form-item>
      <el-form-item label="宽度 :">
        <el-input v-model="form.width"
      /></el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default defineComponent({
  name: "attrEdit",
});
</script>
<script setup>
import { defineComponent, reactive } from "vue";
import emitter from "@/utils/mitt.js";
let form = reactive({});
//监听“on”
emitter.on("attrEdit", (res) => {
  Object.assign(form, res);
  console.log(form);
});
//确定事件
function onSubmit() {
  emitter.emit("attrEditOk",form);
}
</script>
<style scoped></style>