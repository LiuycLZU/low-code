<template>
    <div>
        <a :href="TextUrl" 
        :style="{fontSize:fontSize}" >
        {{textname}}</a><br>
        字体：
        <input type="text" v-model="textname" /><br>
        链接地址：
        <input type="text" v-model="TextUrl" /><br>
        字体大小：
        <input type="text" v-model="fontSize" /><br>
    </div>
</template>

<script>
    export default{
        name:'LinkParts',
        data() {
            return {
                textname:'链接',
                TextUrl:'',
                fontSize:'18px'
            }
        },
    }

</script>

<style>
    
</style>