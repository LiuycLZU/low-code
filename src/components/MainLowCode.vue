<template>
  <div id="main">
    <Left/>
    <Middle/>
    <Right/>
  </div>
</template>

<script>
import Left from "@/components/Mains/Left";
import Right from "@/components/Mains/Right";
import Middle from "@/components/Mains/Middle";

export default {
  components: {
    Left,
    Right,
    Middle,
  }
}
</script>

<style scoped>
#main {
  height: 650px;
  border: 1px solid #ece6e6;
}
/*.left{*/
/*  width: 20%;*/
/*}*/
/*.middle{*/
/*  width: 60%;*/
/*}*/
/*.right{*/
/*  width: 20%;*/
/*}*/
</style>