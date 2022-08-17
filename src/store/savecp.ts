import { defineStore } from "pinia";
import {uuidStore} from './uuid'


export const saveStore = defineStore('savecp',{
    state:()=>{
        return{
           allInfo:{}
        }
    },
    getters:{
        
          
    },
    actions:{
        const uuidstore = uuidStore();

        pushToAllInfo(){
            
            const cp = uuidstore().list

            for(var index in cp){
                for(var key in cp[index]){
                    // alert(key+"--"+cp[index][key]);
                    str += key + ':' + cp[index][key]
                    data = JSON.parse(str)
                    allInfo.push(data)
                    return allInfo
                }
            }
        
        }
    } 
    
})