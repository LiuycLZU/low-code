<template>
  <!-- 画布中button -->
  <el-button
    type="primary"
    class="absolution noMarign"
    ref="pButtonDiv"
    @dblclick="attrEdit"
    >按钮</el-button
  >
</template>
<script>
export default defineComponent({
  props: ["buttonId"],
  name: "pButton",
});
</script>
<script setup>
import {
  defineComponent,
  ref,
  getCurrentInstance,
  onMounted,
  nextTick,
} from "vue";
import emitter from "@/utils/mitt.js";
import { mouse } from "@/utils/zoom.js";
import { getMousePos } from "@/utils/util.js";
let { props } = getCurrentInstance();
let pButtonDiv = ref(null);

//拖动
function comZoom() {}
//双击函数
function attrEdit() {
  let style = pButtonDiv.value.ref.style;
  let attrStyle = {};
  for (let i = 0; style[i] != undefined; i++) {
    attrStyle[style[i]] = style[style[i]];
  }
  attrStyle["buttonId"] = props.buttonId;
  emitter.emit("attrEdit", attrStyle);
}
//接受属性变化
emitter.on("attrEditOk", (res) => {
  if (res.buttonId === props.buttonId) {
    let style = pButtonDiv.value.ref.style;
    for (let i = 0; style[i] != undefined; i++) {
      style[style[i]] = res[style[i]];
    }
  }
});
let time = Date.now();
function moveFun(e, optionDom, paint) {
  //移动按钮，见第四行
  if (Date.now() - time < 50) {
    //节流
    return;
  }
  time = Date.now();
  console.log(getMousePos());
  console.log(e.y, e.x);
  nextTick(() => {
    optionDom.style.top = e.y - paint.getBoundingClientRect().y + "px";
    optionDom.style.left = e.x - paint.getBoundingClientRect().x + "px";
  });
}
onMounted(() => {
  let m = new mouse(pButtonDiv.value.ref, moveFun);
  m.initZoom();
});
</script>
<style scoped>
.noMarign {
  margin: 0;
  padding: 0;
}
</style>