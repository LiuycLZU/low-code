<template>
  <div>
    <HeaderLowCode/>
    <MainLowCode/>
    <FooterLowCode/>
  </div>
</template>

<script>
import HeaderLowCode from "@/components/HeaderLowCode";
import MainLowCode from "@/components/MainLowCode";
import FooterLowCode from "@/components/FooterLowCode"

export default {
  components: {
    HeaderLowCode,
    MainLowCode,
    FooterLowCode
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ce1f1f;
}
</style>
