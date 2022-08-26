<template>
  <div class="full paintContainer">
    <div
      class="relative full paintDiv"
      :style="'width:' + length + 'px;height:' + width + 'px'"
    >
      <sButton
        v-for="item in domArrButton"
        :key="item.id"
        :styledom="item.style"
        :id="item.id"
      />
      <sInput
        v-for="item in domArrInput"
        :key="item.id"
        :styledom="item.style"
        :id="item.id"
      />
    </div>
  </div>
</template>
<script>
export default defineComponent({
  name: "previewPaint",
});
</script>
<script setup>
import { defineComponent } from "vue";
import { usePaintStore } from "@/stores/paint.js";
import { storeToRefs } from "pinia";
import sButton from "@/components/showCom/sButton.vue";
import sInput from "@/components/showCom/sInput.vue";
const paintStore = usePaintStore();
let { width, length, domArrButton, domArrInput } = storeToRefs(paintStore);
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