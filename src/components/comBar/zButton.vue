<template>
  <!-- 按钮组件 -->
  <div>
    <el-button @mousedown="createZButton" type="primary">按钮</el-button
    ><!-- 用户点击按钮 -->
    <el-button
      :style="domStyle.style"
      type="primary"
      class="zButtonDefult positionFixed"
      ref="zButtonDiv"
      >{{ domStyle.style.buttonCon }}</el-button
    ><!-- 用户点击按钮之后和鼠标一起动 -->
  </div>
</template>
<script>
export default defineComponent({
  name: "zButton",
});
</script>
<script setup>
import { defineComponent, ref, reactive } from "vue";
import { usePaintStore } from "@/stores/paint.js";
import { ComZoom } from "@/utils/comBar.js";
let zButtonDiv = ref(null);
let button;
const paintStore = usePaintStore();
let domStyle = reactive({
  style: {
    display: "none",
    top: "0px",
    left: "0px",
    width: "40px",
    height: "20px",
    type: "zButton",
    buttonCon: "提交",
  },
});
//鼠标按下滑动过程：鼠标按下+鼠标移动+鼠标抬起
function createZButton() {
  //用户按下鼠标事件,见第三行
  button = new ComZoom("zButton", 20, 40, domStyle, zButtonDiv.value.ref);
  button.componentMove();
  button.componentRelease();
}
</script>
<style scoped></style>