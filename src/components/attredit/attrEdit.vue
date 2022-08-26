<template>
  <!-- 编辑属性页面 -->
  <div>
    <el-form :model="form" label-width="75px" :inline="true">
      <el-form-item
        v-for="item in formArrComputed"
        :key="item.name"
        :label="item.label + ':'"
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
import { defineComponent, ref, computed } from "vue";
import emitter from "@/utils/mitt.js";
import { arrToObject, deepClone } from "@/utils/util.js";
import { usePaintStore } from "@/stores/paint.js";
import { ElMessage } from "element-plus";

let formArr = ref([]);
let paintStore = usePaintStore();
let nameLabrl = {
  width: "宽度",
  height: "高度",
  top: "Y轴",
  left: "X轴",
  label: "标签名",
  model: "内容",
  buttonCon: "按钮内容",
  inputName: "组件名",
}; //属性的name对应相应的label

//监听“on”
emitter.on("attrEdit", (res) => {
  formArr.value.length = 0;
  for (let value in res) {
    formArr.value.push({
      name: value,
      value: res[value],
      label: nameLabrl[value] ? nameLabrl[value] : value,
    });
  }
});
//确定事件
function onSubmit() {
  let obj = arrToObject(formArr.value);
  if (
    parseInt(obj.left) + parseInt(obj.width) > parseInt(paintStore.length) ||
    parseInt(obj.left) < 0 ||
    parseInt(obj.top) < 0 ||
    parseInt(obj.top) + parseInt(obj.height) > parseInt(paintStore.width)
  ) {
    ElMessage({
      message: "组件想要逃出画布！！！",
      type: "warning",
    });
    return false;
  }
  emitter.emit("attrEditOk", obj);
  for (let i = 0; i < paintStore.domArr.length; i++) {
    if (paintStore.domArr[i].id === obj.id) {
      paintStore.domArr[i].style = deepClone(obj);
    }
  }
  console.log(formArr.value);
  formArr.value.length = 0;
}
function delect() {
  let obj = arrToObject(formArr.value);
  for (let i = 0; i < paintStore.domArr.length; i++) {
    if (paintStore.domArr[i].id === obj.id) {
      paintStore.domArr.splice(i,1);
    }
  }
  formArr.value.length = 0;
}
let formArrComputed = computed(() => {
  return formArr.value.filter(
    (i) => !["id", "display", "type"].includes(i.name)
  );
});
</script>
<style scoped></style>