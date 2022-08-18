<template>
  <div>
    <VideoParts/>
    <hr>
    <LinkParts/>
  </div>
  <div></div>
</template>

<script>
import VideoParts from './components/VideoParts'
import LinkParts from './components/LinkParts'

export default {
  name: 'App',
  components: {
    VideoParts,LinkParts
  }
}
</script>

<style>

</style>
