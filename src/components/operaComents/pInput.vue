<template>
  <!-- 画布中input -->

  <div
    class="absolution noMarign"
    ref="pComDiv"
    :style="styleDom.style"
    @click="attrEdit"
    @mousedown="mouseDown"
  >
    <el-form-item :label="styleDom.style.label" user-select="none">
      <el-input v-model="styleDom.style.model" :width="styleDom.style.width"></el-input>
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
let { props } = getCurrentInstance();
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
    res = {}
  }
});
function mouseDown() {
  let m = new mouse(pComDiv.value, props.id, styleDom);
  m.initZoom();
}
</script>
<style scoped>
</style>

