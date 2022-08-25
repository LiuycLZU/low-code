<template>
  <el-row :gutter="20">
    <el-col :span="12"><zButton /></el-col>
    <el-col :span="12"><zInput /> </el-col>
  </el-row>
</template>
<script>
export default defineComponent({
  name: "comBarAll",
});
</script>
<script setup>
import { defineComponent } from "vue";
//组件
import zButton from "@/components/comBar/zButton.vue";
import zInput from "@/components/comBar/zInput.vue";
</script>
<style scoped></style>