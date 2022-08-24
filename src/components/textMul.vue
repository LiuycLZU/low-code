<template>
	<textarea :placeholder="placeholder"></textarea>
</template>
<script>
	export default {
	data() {
		return {
			placeholder:'请输入内容...\n这是一个多行文本框'
		}
	}
}
</script>
