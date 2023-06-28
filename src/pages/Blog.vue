<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const id = ref(route.params.id)
console.log('watch外: ', id)
watch(route, () => {
  id.value = route.params.id
  console.log('watch内: ', id.value)
})
</script>

<template>
  <h1>Blog Page</h1>
  <p>blog id = {{ id }}</p>
</template>
