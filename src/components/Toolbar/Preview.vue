<template>
  <div ref="container" class="bg">
    <el-button v-if="!isScreenshot" class="close" @click="close"
      >关闭</el-button
    >
    <el-button v-else class="close">确定</el-button>
    <div class="canvas-container">
      <div
        class="canvas"
        :style="{
          width: 1000 + 'px',
          height: 400 + 'px',
        }"
      >
        <!-- 复制数据 -->
        <!-- <ComponentWrapper
                    v-for="(item, index) in copyData"
                    :key="index"
                    :config="item"
                /> -->
      </div>
    </div>
  </div>
</template>
<script>
export default defineComponent({
  name: "Preview",
});
</script>
<script setup>
import { defineComponent } from "vue";
</script>
<style lang="scss" scoped>
.bg {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  background: rgb(0, 0, 0, 0.5);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  padding: 20px;

  .canvas-container {
    width: calc(100% - 40px);
    height: calc(100% - 120px);
    overflow: auto;

    .canvas {
      background: #fff;
      position: relative;
      margin: auto;
    }
  }

  .close {
    position: absolute;
    right: 20px;
    top: 20px;
  }
}
</style>
