<template>
  <!-- 画布中button -->
  <el-button
    type="primary"
    class="absolution noMarign"
    ref="pButtonDiv"
    :style="styleDom.style"
    @dblclick="attrEdit"
    @mousedown="mouseDown"
    >{{ styleDom.style.buttonCon }}</el-button
  >
</template>
<script>
export default defineComponent({
  props: ["id", "styledom"],
  name: "pButton",
});
</script>
<script setup>
import { defineComponent, ref, getCurrentInstance, reactive } from "vue";
import emitter from "@/utils/mitt.js";
import { mouse } from "@/utils/zoom.js";
let { props } = getCurrentInstance();
let pButtonDiv = ref(null);
let styleDom = reactive({ style: {} });
//样式
for (let i in props.styledom) {
  styleDom.style[i] = props.styledom[i];
}
//双击函数
function attrEdit() {
  let attrStyle = {};
  let style = styleDom.style;
  for (let i in styleDom.style) {
    attrStyle[i] = styleDom.style[i];
  }
  attrStyle["id"] = props.id;
  emitter.emit("attrEdit", attrStyle);
}
//接受属性变化
emitter.on("attrEditOk", (res) => {
  if (res.id === props.id) {
    let style = styleDom.style;
    for (let i in style) {
      style[i] = res[i];
    }
    res = {};
  }
});
function mouseDown() {
  let m = new mouse(pButtonDiv.value.ref, props.id, styleDom);
  m.initZoom();
}
</script>
<style scoped>
</style>

