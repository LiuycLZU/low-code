<template>
  <!-- 画布中button -->
  <el-button
    type="primary"
    class="absolution noMarign"
    ref="pButtonDiv"
    @dblclick="attrEdit"
    @mousedown="mouseDown"
    >按钮</el-button
  >
</template>
<script>
export default defineComponent({
  props: ["id"],
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
import { getMousePos, getElementLeft, getElementTop } from "@/utils/util.js";
import { usePaintStore } from "@/stores/paint.js";
let { props } = getCurrentInstance();
let paintStore = usePaintStore();
let pButtonDiv = ref(null);

//双击函数
function attrEdit() {
  let style = pButtonDiv.value.ref.style;
  let attrStyle = {};
  for (let i = 0; style[i] != undefined; i++) {
    attrStyle[style[i]] = style[style[i]];
  }
  attrStyle["id"] = props.id;
  emitter.emit("attrEdit", attrStyle);
}
//接受属性变化
emitter.on("attrEditOk", (res) => {
  if (res.id === props.id) {
    let style = pButtonDiv.value.ref.style;
    for (let i = 0; style[i] != undefined; i++) {
      style[style[i]] = res[style[i]];
    }
    res.length = 0;
  }
});
function mouseDown() {
  let m = new mouse(pButtonDiv.value.ref, props.id);
  m.initZoom();
}
</script>
<style scoped>
</style>

