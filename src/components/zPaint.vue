<!-- 画布组件 -->
<template>
  <div>
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
let comArray = ref([]);//控制的数组
//接受组件的函数
function receiveComponents(res) {
  comArray.value.push({
    id: Date.now().valueOf(),//id
    style: returnStyle(["height", "width", "top", "left"], res),//style
  });
}
getCurrentInstance().appContext.config.globalProperties.$mitt.on(//接受信息
  "receiveComponents",
  receiveComponents
);
</script>
<style scoped>
.plaint {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>