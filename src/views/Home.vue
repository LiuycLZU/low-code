<template>
    <div class="home">
        <Toolbar />
    </div>
</template>

<script>
import Toolbar from '@/components/Toolbar'
import { listenGlobalKeyDown } from '@/utils/shortcutKey'

export default {
    components: { Toolbar },

    created() {
        this.restore()
        // 全局监听按键事件
        listenGlobalKeyDown()
    },
    methods: {
        restore() {
            // 用保存的数据恢复画布
            if (localStorage.getItem('canvasData')) {
                this.$store.commit('setComponentData', JSON.parse(localStorage.getItem('canvasData')))
            }

            if (localStorage.getItem('canvasStyle')) {
                this.$store.commit('setCanvasStyle', JSON.parse(localStorage.getItem('canvasStyle')))
            }
        },
    },
}
</script>

<style >

</style>
