<template>
  <div class="middle">
    <div class="Arr"
         @click="showIt"
         v-for="d in Arrs"
         :key="Date.now().valueOf()"
         :style="d">组件{{ name }}
    </div>
  </div>
</template>

<script>
import {unit} from "@/js/mixin";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Middle",
  data() {
    return {
      name: '白',
    }
  },
  methods: {
    showIt(e) {
      console.log(e.target);
    },
  },
  mixins:[unit]
}
</script>

<style scoped>
.middle {
  width: 60%;
  height: 100%;
  border: 1px solid red;
  float: left;
  position: relative;
}

.Arr {
  position: absolute;
}
</style>