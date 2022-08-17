<template>
    <div class="wrapper">
        <h2>刘怡岑小组</h2>
        <div class="btn-box">
            <div class="btn active" @click='handleClickActions'>保存</div>
            <div class="btn ">预览</div>
            <div class="btn ">发布</div>
        </div>
        
    </div>
</template>

<script>
import {saveStore} from '../store/savecp'
const savestore = saveStore();
const handleClickActions = ()=>{
  savestore.pushToAllInfo()
}

export default {
    components:{

    },
    props:{

    },
    data(){
        return{

        };
    },
    computed:{

    },
    created(){

    },
    mounted(){

    },
    watch:{

    },
}
</script>

<style scoped >
    .wrapper{
        background-color:rgb(5, 244, 152);
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: white;
        padding: 0 15px;
    }
    .btn-box{
        display: flex;
        width: 180px;
        justify-content: space-around;
    }
    .btn{
        background-color: white;
        color: black;
        font-size: 13px;
        padding: 2px 10px;
        border-radius: 4px;
        cursor: pointer;
    }
    .btn.active{
                    
        background-color: rgb(8, 169, 244);
    }
            
</style>