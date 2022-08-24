<template>
  <div class="full paintContainer">
    <div
      class="relative full paintDiv"
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
  name: "previewPaint",
});
</script>
<script setup>
import { defineComponent, onMounted, ref } from "vue";
import { getdata } from "@/utils/localData.js";
import { usePaintStore } from "@/stores/paint.js";
import { storeToRefs } from "pinia";
const paintStore = usePaintStore();
let { width, length } = storeToRefs(paintStore);
let comArray = ref([]);
onMounted(() => {
  comArray.value = getdata("domData");
  console.log(comArray.value);
});
</script>
<style scoped>
.paintDiv {
  border-radius: 3px;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 0, 0, 0.3);
}
.paintContainer {
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 115%;
}
</style>