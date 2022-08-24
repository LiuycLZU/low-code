<script>
// 给每个选项一个唯一的 id
let id = 0

export default {
  data() {
    return {
      text='',
      newChoice: '',
      choices: [
        { id: id++, text: '请添加您的选项' },

      ]
    }
  },
  methods: {
    addChoice() {
      this.choices.push({ id: id++, text: this.newChoice })
      this.newChoice = ''
    },
    removeChioce(choice) {
      this.choices = this.choices.filter((t) => t !== choice)
    }
  }
}
</script>


<template>
   <input v-model="text" placeholder="请输入标题">
  
  <form @submit.prevent="addChoice">
    <input v-model="newChoice">
    <button>添加</button>    
  </form>
  <ol>
    <li v-for="choice in choices" :key="choice.id">
      {{ choice.text }}
      <button @click="removeChioce(choice)">删除</button>
    </li>
  </ol>
</template>
