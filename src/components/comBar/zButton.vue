<template>
  <!-- 按钮组件 -->
  <div>
    <el-button @mousedown="createZButton" type="primary">按钮</el-button
    ><!-- 用户点击按钮 -->
    <el-button type="primary" class="zButtonDefult positionFixed" ref="zButtonDiv"
      >按钮</el-button
    ><!-- 用户点击按钮之后和鼠标一起动 -->
  </div>
</template>
<script>
export default defineComponent({
  name: "zButton",
});
</script>
<script setup>
import { defineComponent, ref, nextTick, getCurrentInstance } from "vue";
import { getMousePos } from "@/utils/util.js";
import { usePaintStore } from "@/stores/paint.js";
import { ComZoom } from "@/utils/comBar.js";
let zButtonDiv = ref(null);
let button;
let { appContext } = getCurrentInstance();
const paintStore = usePaintStore();
//鼠标按下滑动过程：鼠标按下+鼠标移动+鼠标抬起
function createZButton() {
  //用户按下鼠标事件,见第三行
  button = new ComZoom("zButton", 20, 40, zButtonDiv.value.ref);
  button.componentMove();
  button.componentRelease();
}
</script>
<style scoped></style>