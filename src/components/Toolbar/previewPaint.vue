<template>
  <div class="full paintContainer">
    <div
      class="relative full paintDiv"
      :style="'width:' + length + 'px;height:' + width + 'px'"
    >
      <pButton
        v-for="item in components.button"
        :key="item.id"
        :style="item.style"
        :buttonId="item.id"
      />
      <pInput
        v-for="item in components.input"
        :key="item.id"
        :style="item.style"
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
import { defineComponent, onMounted, ref, computed, reactive } from "vue";
import { getdata } from "@/utils/localData.js";
import { usePaintStore } from "@/stores/paint.js";
import { storeToRefs } from "pinia";
const paintStore = usePaintStore();
let { width, length } = storeToRefs(paintStore);
let comArray = ref([]);
let components = reactive({ button: [], input: [] });
onMounted(() => {
  comArray.value = getdata("domData");
  console.log(comArray.value);
});
components.button = computed(() => {
  return comArray.value.filter((item) => item.type === "zButton");
});
components.input = computed(() => {
  return comArray.value.filter((item) => item.type === "zInput");
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