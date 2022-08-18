<!-- 画布组件 -->
<template>
  <div @mouseup="paintMoseUp" class="relative full paintDiv" ref="paintDiv">
    <pButton
      v-for="item in comArray"
      :key="item.id"
      :style="item.style"
      :buttonId="item.id"
    />
  </div>
</template>
<script>
export default defineComponent({
  name: "zPaint",
});
</script>
<script setup>
import { defineComponent, getCurrentInstance, onMounted, ref } from "vue";
import { returnStyle } from "@/utils/util.js";
import pButton from "@/components/operaComents/pButton.vue";
import { usePaintStore } from "@/stores/paint.js";
import { storeToRefs } from "pinia";
const paintStore = usePaintStore();
let paintDiv = ref(null); //画布
let comArray = ref([]); //控制的数组
//接受组件的函数
function receiveComponents(res) {
  console.log(paintDiv);
  let style = paintDiv.value.getBoundingClientRect();
  paintStore.top = style.top;
  paintStore.left = style.left;
  comArray.value.push({
    id: Date.now().valueOf(), //id
    style: returnStyle(["height", "width", "top", "left"], res, style), //style
  });
}
function paintMoseUp() {
  paintStore.isPlace = true;
}
getCurrentInstance().appContext.config.globalProperties.$mitt.on(
  //接受信息
  "receiveComponents",
  receiveComponents
);
</script>
<style scoped>
.paintDiv {
  border-radius: 3px;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);
}
</style>