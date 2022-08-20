<template>
  <div class="main">
    <Left/>
    <Middle/>
    <Right/>
  </div>
</template>

<script>
import Left from "@/components/Mains/Left";
import Middle from "@/components/Mains/Middle";
import Right from "@/components/Mains/Right";

export default {
  components: {
    Left,
    Middle,
    Right,
  },
}
</script>

<style scoped>
.main {
  height: 650px;
  border: 1px solid #ece6e6;
}

</style>