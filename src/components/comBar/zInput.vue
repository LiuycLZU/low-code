<template>
  <!-- 按钮组件 -->
  <div>
    <el-button @mousedown="createCom" type="primary">输入框</el-button
    ><!-- 用户点击按钮 -->
    <div class="positionFixed" ref="zComDiv" :style="domStyle.style">
      <el-form-item :label="domStyle.style.label">
        <el-input v-model="domStyle.style.model" :width="domStyle.style.width"></el-input>
      </el-form-item>
    </div>

    <!-- 用户点击按钮之后和鼠标一起动 -->
  </div>
</template>
<script>
export default defineComponent({
  name: "zInput",
});
</script>
<script setup>
import { defineComponent, reactive, ref } from "vue";
import { usePaintStore } from "@/stores/paint.js";
import { ComZoom } from "@/utils/comBar.js";
import { left } from "@popperjs/core";
let zComDiv = ref(null);
let com;
let domStyle = reactive({
  style: {
    display: "none",
    top: "0px",
    left: "0px",
    width: "150px",
    height: "20px",
    label: "标签",
    type: "zInput",
    model:"",
    inputName:"button"+Date.now().valueOf(),
  },
});
const paintStore = usePaintStore();
//鼠标按下滑动过程：鼠标按下+鼠标移动+鼠标抬起

function createCom() {
  //用户按下鼠标事件,见第三行
  com = new ComZoom("zInput", 40, 100, domStyle, zComDiv.value.ref);
  com.componentMove();
  com.componentRelease();
}
</script>
<style scoped></style>