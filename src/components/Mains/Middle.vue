<template>
  <div class="middle">
    <div class="Arr"
         v-for="b in btns"
         :key="b.id"
         :style="b.styles"
         @click="showBtn(b)">组件{{ b.id }}
    </div>
  </div>
</template>

<script>
import emitter from "@/js/mitt";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Middle",
  data() {
    return {
      btns: [{
        id: 1,
        styles: {left: '100px', top: '100px', height: '50px', width: '50px', background: '#aaa'}
      },
        {
          id: 2,
          styles: {left: '20px', top: '100px', height: '50px', width: '50px', background: '#000'}
        }
      ]
    }
  },
  methods: {
    // 把组件信息传到Right侧边栏
    showBtn(btn) {
      emitter.emit('showBtn', btn);
    },
    // 删除组件
    deleteBtn(id) {
      this.btns = this.btns.filter((btn) => {
        return btn.id !== id;
      })
    },
  },

  mounted() {
    // 自定义事件
    emitter.on('deleteBtn', this.deleteBtn);
  }
}

</script>

<style scoped>
.middle {
  width: 60%;
  height: 100%;
  float: left;
  position: relative;
}

.Arr {
  position: absolute;
}
</style>