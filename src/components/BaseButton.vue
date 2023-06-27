<script setup>
const props = defineProps({ color: String })
const emit = defineEmits(['onClick'])
const onClick = () => {
  emit('on-click')
}
</script>

<template>
  <button class="btn" :class="props.color" @click="onClick"><slot /></button>
</template>

<style scoped>
.btn {
  padding: 8px;
  border-radius: 6px;
  color: #fff;
  text-align: center;
  font-size: 14px;
}
.green {
  background-color: #00c853;
}
.blue {
  background-color: #03a9f4;
}
.pink {
  background-color: #ff4018;
}
</style>
