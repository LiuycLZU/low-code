<template>
  <!-- 画布中input -->

  <div
    class="absolution noMarign"
    ref="pComDiv"
    :style="styleDom.style"
    @click="attrEdit"
    @mousedown="mouseDown"
  >
    <el-form-item :label="styleDom.style.label">
      <el-input :width="styleDom.style.width"></el-input>
    </el-form-item>
  </div>
</template>
<script>
export default defineComponent({
  props: ["id", "styledom"],
  name: "pInput",
});
</script>
<script setup>
import {
  defineComponent,
  ref,
  getCurrentInstance,
  onMounted,
  nextTick,
  toRefs,
  reactive,
} from "vue";
import emitter from "@/utils/mitt.js";
import { mouse } from "@/utils/zoom.js";
import { getMousePos, getElementLeft, getElementTop } from "@/utils/util.js";
import { usePaintStore } from "@/stores/paint.js";
let { props } = getCurrentInstance();
let paintStore = usePaintStore();
let pComDiv = ref(null);
let styleDom = reactive({ style: {} });
//input的样式
for (let i in props.styledom) {
  styleDom.style[i] = props.styledom[i];
}

//单击函数
function attrEdit() {
  let attrStyle = {};
  let style = styleDom.style;
  for (let i in styleDom.style) {
    attrStyle[i] = styleDom.style[i];
  }
  console.log(attrStyle.style);
  attrStyle["id"] = props.id;
  emitter.emit("attrEdit", attrStyle);
}
//接受属性变化
emitter.on("attrEditOk", (res) => {
  console.log(res, props.id);
  res.forEach((i) => {
    if (i.name === "id" && i.value === props.id) {
      console.log('');
      res.forEach((i) => {
        let style = styleDom.style;
        styleDom.style[i.name] = i.value;
      });
    }
  });

  // res.length = 0;
});
let time = Date.now();
function moveFun(e, optionDom, paint) {
  //移动按钮，见第四行
  if (Date.now() - time < 10) {
    //节流
    return;
  }
  time = Date.now();
  console.log(getMousePos());
  console.log(e);
  nextTick(() => {
    optionDom.style.top =
      (e.pageY - getElementTop(paint)) / paintStore.scale + "px";
    optionDom.style.left =
      (e.pageX - getElementLeft(paint)) / paintStore.scale + "px";
  });
}
function mouseDown() {
  let m = new mouse(pComDiv.value, moveFun, styleDom);
  m.initZoom();
}
</script>
<style scoped>
</style>

