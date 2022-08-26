<template>
  <!-- 画布中button -->
  <el-button
    type="primary"
    class="absolution noMarign"
    ref="pComDiv"
    :style="props.styledom"
    >{{ props.styledom.buttonCon }}</el-button
  >
</template>
<script>
export default defineComponent({
  props: ["id", "styledom"],
  name: "sButton",
});
</script>
<script setup>
import {
  defineComponent,
  ref,
  getCurrentInstance,
  reactive,
  onMounted,
} from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";
import { usePaintStore } from "@/stores/paint.js";
let paintStore = usePaintStore();
let { props } = getCurrentInstance();
let pComDiv = ref(null);
let styleDom = reactive({ style: {} });
//样式
for (let i in props.styledom) {
  styleDom.style[i] = props.styledom[i];
}
onMounted(() => {
  if (styleDom.style.formUrl != "") {
    console.log(pComDiv.value);
    addEventSubmit(
      pComDiv.value.ref,
      styleDom.style.formUrl,
      paintStore.domArrInput
    );
  }
});

function addEventSubmit(dom, url, list) {
  dom.addEventListener("click", () => {
    let obj = {};
    list.forEach((i) => {
      obj[i.style.inputName] = i.style.model;
    });
    axios
      .post(url, obj)
      .then((res) => {
        ElMessage({
          message: "发送成功",
          type: "success",
        });
      })
      .catch(() => {
        ElMessage({
          message: "发送失败",
          type: "error",
        });
      });
  });
}
</script>
<style scoped>
</style>

