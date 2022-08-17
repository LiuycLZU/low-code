import {defineStore} from 'pinia'

export const uuidStore = defineStore('uuid',{
    state:()=>{
        return{
            list:{
                  uuid1:{id:11111111,type:"button",style:"height:20px;width30px;top:30px;left:20px;"},
                  uuid2:{id:2222222,type:"button",style:"height:20px;width30px;top:30px;left:20px;"},
                  uuid3:{id:33333333,type:"button",style:"height:20px;width30px;top:30px;left:20px;"}
            }
        }
    },
    getters:{},
    actions:{}
})