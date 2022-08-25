<!-- 画布组件 -->
<template>
  <div class="full paintContainer" ref="paintCon">
    <div
      @mouseup="paintMoseUp"
      class="relative full paintDiv"
      ref="paintDiv"
      :style="'width:' + length + 'px;height:' + width + 'px'"
    >
      <pButton
        v-for="item in comArray"
        :key="item.id"
        :style="item.style"
        :buttonId="item.id"
      />
    </div>
  </div>
</template>
<script>
export default defineComponent({
  name: "zPaint",
});
</script>
<script setup>
import {
  defineComponent,
  getCurrentInstance,
  nextTick,
  ref,
  onMounted,
  toRaw,
} from "vue";
import { returnStyle, getElementLeft, getElementTop } from "@/utils/util.js";
import { setdata } from "@/utils/localData.js";
import { initmouse } from "@/utils/zoom.js";
import pButton from "@/components/operaComents/pButton.vue";
import { usePaintStore } from "@/stores/paint.js";
import { storeToRefs } from "pinia";
import { ElMessage } from "element-plus";
import emiter from "@/utils/mitt.js";
const paintStore = usePaintStore();
let paintDiv = ref(null); //画布
let paintCon = ref(null); //画布容器
let comArray = ref([]); //控制的数组
let { width, length } = storeToRefs(paintStore);
//接受组件的函数
function receiveComponents(res) {
  let style = paintDiv.value.getBoundingClientRect();
  if (paintStore.length === 0 || paintStore.width === 0) {
    ElMessage("请先生成画布");
    return false;
  }
  style.length = paintStore.length;
  style.width = paintStore.width;
  // paintStore.top = style.top;
  // paintStore.left = style.left;
  let rStyle = returnStyle(["height", "width", "top", "left"], res, style);
  if (rStyle != false) {
    comArray.value.push({
      id: Date.now().valueOf(), //id
      style: rStyle, //style
    });
  }
  //初始化组件移动容器
  initmouse(paintDiv.value);
}
function paintMoseUp() {
  paintStore.isPlace = true;
}
getCurrentInstance().appContext.config.globalProperties.$mitt.on(
  //接受信息
  "receiveComponents",
  receiveComponents
);
//画布缩放
onMounted(() => {
  function paintZoom(e) {
    let distance = e.deltaY;
    let style = paintDiv.value.style;
    if (distance < 0) {
      let scal = (
        parseFloat(style.scale === "" ? 1 : style.scale) + 0.01
      ).toFixed(2);
      style.scale = scal;
      // style.transform = "scale(" + scal + ")"; //scale()在这里要使用拼接的方式才能生效
      style.transformOrigin = "0 0";
      paintStore.scale = scal;
    } else {
      let scal = style.scale === "" ? 1 : style.scale;
      if (scal == 0.01) {
        scal = 0.01;
        return;
      } else {
        scal = (scal - 0.01).toFixed(2);
      }
      style.scale = scal;
      // style.transform = "scale(" + scal + ")"; //scale()在这里要使用拼接的方式才能生效。
      style.transformOrigin = "0 0";
      paintStore.scale = scal;
    }
    if (e.preventDefault) {
      /*FF 和 Chrome*/
      e.preventDefault(); // 阻止默认事件
    }
    return false;
  }
  paintStore.pageLeft = getElementLeft(paintDiv.value);
  paintStore.pageTop = getElementTop(paintDiv.value);
  paintCon.value.addEventListener("mousewheel", paintZoom);
});
//画布生成成功
emiter.on("paintOk", () => {
  paintStore.pageLeft = getElementLeft(paintDiv.value);
  paintStore.pageTop = getElementTop(paintDiv.value);
});
//用户点击保存，将数据存到localstorge
emiter.on("preview", () => {
  setdata("domData", toRaw(comArray.value));
  console.log(toRaw(comArray.value));
  ElMessage({
    message: "保存成功",
    type: "success",
  });
});
</script>
<style scoped>
.paintDiv {
  border: 1px dashed rgb(121, 187, 255);
  background-color: rgba(236, 245, 255, 0.3);
}
.paintContainer {
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 115%;
}
</style>