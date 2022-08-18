<template>
<!-- 画布中button -->
  <el-button
    type="primary"
    class="absolution"
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
import { defineComponent, ref, getCurrentInstance } from "vue";
import emitter from "@/utils/mitt.js";
let { props } = getCurrentInstance();
let pButtonDiv = ref(null);
function attrEdit() {
  let style = pButtonDiv.value.ref.style;
  let attrStyle = {};
  for (let i = 0; style[i] != undefined; i++) {
    attrStyle[style[i]] = style[style[i]];
  }
  console.log(props);
  attrStyle["buttonId"] = props.buttonId;
  emitter.emit("attrEdit", attrStyle);
}
emitter.on("attrEditOk", (res) => {
  if (res.buttonId === props.buttonId) {
    let style = pButtonDiv.value.ref.style;
    for (let i = 0; style[i] != undefined; i++) {
      style[style[i]] = res[style[i]];
    }
  }
});
</script>
<style scoped></style>