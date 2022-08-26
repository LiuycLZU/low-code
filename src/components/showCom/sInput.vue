<template>
  <!-- 画布中input -->

  <div
    class="absolution noMarign"
    ref="pComDiv"
    :style="props.styledom"
  >
    <el-form-item :label="props.styledom.label">
      <el-input v-model="props.styledom.model" :width="props.styledom.width"></el-input>
    </el-form-item>
  </div>
</template>
<script>
export default defineComponent({
  props: ["id", "styledom"],
  name: "sInput",
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
let { props } = getCurrentInstance();
let pComDiv = ref(null);
</script>
<style scoped>
</style>

