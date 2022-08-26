<template>
  <!-- 编辑属性页面 -->
  <div>
    <el-form :model="form" label-width="60px" :inline="true">
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
let form = ref({});
let formArr = ref([]);
let paintStore = usePaintStore();
let nameLabrl = {
  width: "宽度",
  height: "高度",
  top: "Y轴",
  left: "X轴",
  label: "标签名",
}; //属性的name对应相应的label

//监听“on”
emitter.on("attrEdit", (res) => {
  formArr.value.length = 0;
  form.value = {};
  Object.assign(form.value, res);
  for (let value in form.value) {
    formArr.value.push({
      name: value,
      value: form.value[value],
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
  console.log(formArr.value);

  emitter.emit("attrEditOk", obj);
  for (let i = 0; i < paintStore.domArr.length; i++) {
    console.log("###",paintStore.domArr.id, obj.id);
    if (paintStore.domArr[i].id === obj.id) {
      paintStore.domArr.style = deepClone(obj);
      console.log("");
    }
  }
  form.value = {};
}
function delect() {
  formArr.value.length = 0;
  form.value = {};
}
let formArrComputed = computed(() => {
  return formArr.value.filter(
    (i) => !["buttonId", "id", "display", "type"].includes(i.name)
  );
});
</script>
<style scoped></style>