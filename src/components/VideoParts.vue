<template>
    <div>
        <video :src="VideoUrl" :style="{width:width,height:height}" controls="controls"></video><br>
        <!-- 调整视频的宽度 -->
        高度：<input type="text" v-model="height" /><br>
        <!-- 调整视频的高度 -->
        宽度：
        <input type="text" v-model="width" /><br>
        <!-- 视频地址         -->
        视频地址：
        <input type="text" v-model="VideoUrl" /><br>
        <!-- 本地上传视频 -->
        本地上传：
        <input type="file"  @change="changeFile"  ><br>
        <div></div>
    </div>
</template>

<script>
    export default{
        name:'VideoParts',
        data() {
            return { 
                width:'300px',
                height:'200px',
                VideoUrl:''
            }
        },
        methods: {
            changeFile(e) {
                    let files = e.target.files //把文件传入files中
                    // console.log(files)//测试用的
                    if (!files || !files[0]) return false //本地上传视频点击取消后不报错
                    const aurl = URL.createObjectURL(files[0]) //获取上传视频的一个临时blob地址
                    // console.log(aurl)//测试用的
                    this.VideoUrl = aurl //上传视频的临时blob地址传给video     
                }
        },
    }

</script>

<style>

</style>