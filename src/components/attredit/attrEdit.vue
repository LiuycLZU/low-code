<template>
  <!-- 编辑属性页面 -->
  <div>
    <el-form :model="form" label-width="50px" :inline="true">
      <el-form-item
        v-for="item in formArr"
        :key="item.name"
        :label="item.name + ':'"
      >
        <el-input v-model="item.value"
      /></el-form-item>
      <el-form-item v-show="formArr.length != 0">
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button @click="delect">删除</el-button>
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
import { defineComponent, ref } from "vue";
import emitter from "@/utils/mitt.js";
import { arrToObject } from "@/utils/util.js";
let form = ref({});
let formArr = ref([]);
//监听“on”
emitter.on("attrEdit", (res) => {
  formArr.value.length = 0;
  form.value = {};
  Object.assign(form.value, res);
  console.log(form.value);
  for (let value in form.value) {
    formArr.value.push({
      name: value,
      value: form.value[value],
    });
  }
});
//确定事件
function onSubmit() {
  emitter.emit("attrEditOk", arrToObject(formArr.value));
  form.value = {};
}
function delect() {
  formArr.value.length = 0;
  form.value = {};
}
</script>
<style scoped></style>