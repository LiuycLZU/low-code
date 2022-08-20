<template>
  <div class="right">
    <button id="showBtn" @click="isShow = true">查看属性</button>
    <button id="updateBtn" @click="isShow = false">编辑属性</button>
    <hr>
    <template v-if="isShow">
      <ul>
        <li>组件id：{{ Btn.id }}</li>
        <li>x坐标：{{ Btn.styles.left }}</li>
        <li>y坐标：{{ Btn.styles.top }}</li>
        <li>插件高度：{{ Btn.styles.height }}</li>
        <li>插件宽度：{{ Btn.styles.width }}</li>
        <li>插件颜色：{{ Btn.styles.background }}</li>
      </ul>
      <hr>
    </template>
    <template v-else>
      <form>
        <li>组件id：{{ Btn.id }}</li>
        x坐标：<input :value="Btn.styles.left"/><br><br>
        y坐标：<input :value="Btn.styles.top"/><br><br>
        插件高度：<input :value="Btn.styles.height"/><br><br>
        插件宽度：<input :value="Btn.styles.width"/><br><br>
        插件颜色：<input :value="Btn.styles.background"/><br><br>
        <hr>
        <button>确定</button>
        <button>取消</button>
        <button @click.prevent="deleteBtn(Btn.id)">删除</button>
      </form>
    </template>
  </div>
</template>

<script>
import emitter from "@/js/mitt";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Right",
  data() {
    return {
      isShow: true,
      Btn: {
        id: null,
        styles: {
          left: '',
          top: '',
          height: '',
          width: '',
          background: ''
        }
      }
    }
  },
  methods: {
    // 同步组件信息
    showBtn(nowBtn) {
      this.Btn = nowBtn;
    },
    // 删除组件
    deleteBtn(id) {
      if (confirm('确定删除吗')) {
        this.Btn = {
          id: null,
          styles: {
            left: '',
            top: '',
            height: '',
            width: '',
            background: ''
          }
        }
        emitter.emit('deleteBtn', id)
      }
    }
  },
  mounted() {
    emitter.on('showBtn', this.showBtn);
  },

}
</script>

<style scoped>
.right {
  width: 20%;
  height: 100%;
  background: antiquewhite;
  float: left;
}

li {
  list-style-type: none;
}

#showBtn, #updateBtn {
  width: 50%;
  height: 40px;
  line-height: 40px;
  float: left;
}

#showBtn {
  background: #a0cc39;
}

#updateBtn {
  background: #288da4;
}

input {
  width: 50px;
}
</style>