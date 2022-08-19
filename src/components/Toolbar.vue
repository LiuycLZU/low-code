<template>
    <div>
        <div class="toolbar">
            <el-button style="margin-left: 10px;" @click="preview(false)">预览</el-button>
            <el-button @click="save">保存</el-button>
        </div>
        
        <!-- 预览 -->
        <Preview v-if="isShowPreview" :is-screenshot="isScreenshot" @close="handlePreviewChange" />
    </div>
</template>

<script>
import Preview from '@/components/Editor/Preview'
import { deepCopy } from '@/utils/utils'

export default {
    components: { Preview },
    data() {
        return {
            isShowPreview: false,
            needToChange: [
                'top',
                'left',
                'width',
                'height',
                'fontSize',
            ],
            scale: '100%',
            timer: null,
            isScreenshot: false,
        }
    },

    methods: {
        handleScaleChange() {
            clearTimeout(this.timer)
            this.timer = setTimeout(() => {
                // 画布比例设一个最小值，不能为 0
                // eslint-disable-next-line no-bitwise
                this.scale = (~~this.scale) || 1
                const componentData = deepCopy(this.componentData)
                componentData.forEach(component => {
                    Object.keys(component.style).forEach(key => {
                        if (this.needToChange.includes(key)) {
                            if (key === 'fontSize' && component.style[key] === '') return

                            // 根据原来的比例获取样式原来的尺寸
                            // 再用原来的尺寸 * 现在的比例得出新的尺寸
                            component.style[key] = this.format(this.getOriginStyle(component.style[key]))
                        }
                    })
                })
            }, 1000)
        },
        preview(isScreenshot) {
            this.isScreenshot = isScreenshot
            this.isShowPreview = true
            this.$store.commit('setEditMode', 'preview')
        },

        save() {
            localStorage.setItem('canvasData', JSON.stringify(this.componentData))
            localStorage.setItem('canvasStyle', JSON.stringify(this.canvasStyleData))
            this.$message.success('保存成功')
        },

        handlePreviewChange() {
            this.isShowPreview = false
            this.$store.commit('setEditMode', 'edit')
        },
    },
}
</script>

<style lang="scss" scoped>
.toolbar {
    padding: 15px 10px;
    white-space: nowrap;
    overflow-x: auto;
    background: #fff;
    border-bottom: 1px solid #ddd;

}
</style>
