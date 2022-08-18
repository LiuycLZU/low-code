<template>
<!-- 按钮组件 -->
  <div>
    <el-button @mousedown="createZButton" type="primary">按钮</el-button
    ><!-- 用户点击按钮 -->
    <el-button type="primary" class="zButtonDefult" ref="zButtonDiv"
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
let zButtonDiv = ref(null);
let button;
let { appContext } = getCurrentInstance();
//鼠标按下滑动过程：鼠标按下+鼠标移动+鼠标抬起
class zButton {
  //按钮类
  constructor(height, width, top = getMousePos().y, left = getMousePos().x) {
    this.type = "zButton";
    this.height = height;
    this.width = width;
    this.top = top;
    this.left = left;
  }
  moveFun() {
    //移动按钮，见第四行
    if (Date.now() - this.time < 50) {
      //节流
      return;
    }
    this.time = Date.now();
    nextTick(() => {
      this.top = getMousePos().y;
      this.left = getMousePos().x;
      // console.log(this.top,this.left);
      let style = zButtonDiv.value.ref.style;
      style.display = "inline-flex";
      style.top = this.top + "px";
      style.left = this.left + "px";
      style.height = this.height + "px";
      style.width = this.width + "px";
    });
  }
  reset() {
    nextTick(() => {
      let style = zButtonDiv.value.ref.style;
      style.display = "none";
      style.top = 0 + "px";
      style.left = 0 + "px";
      style.height = 20 + "px";
      style.width = 40 + "px";
      style.display = "none";
    });
  }
  componentMove() {
    //监听鼠标移动事件
    this.moveFunBind = this.moveFun.bind(this);
    document.addEventListener("mousemove", this.moveFunBind);
  }
  componentStop() {
    //取绑鼠标监听事件
    document.removeEventListener("mousemove", this.moveFunBind);
    this.moveFunBind = null;
    if (
      getMousePos().x > 570 &&
      getMousePos().x < 1000 &&
      getMousePos().y > 0 &&
      getMousePos().y < 370
    ) {
      console.log('@');
      appContext.config.globalProperties.$mitt.emit("receiveComponents", {
        type: button.type,
        width: button.width,
        height: button.height,
        top: button.top,
        left: button.left,
      });
    }
    this.reset();
    this.componentReleaseOver();
  }
  componentRelease() {
    //监听鼠标抬起事件
    this.onmouseup = this.componentStop.bind(this);
    document.addEventListener("mouseup", this.onmouseup);
  }
  componentReleaseOver() {
    //取绑鼠标抬起事件
    document.removeEventListener("mouseup", this.onmouseup);
  }
}
function createZButton() {
  //用户按下鼠标事件,见第三行
  button = new zButton(20, 40);
  button.componentMove();
  button.componentRelease();
}
</script>
<style scoped></style>