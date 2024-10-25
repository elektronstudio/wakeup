<script setup lang="js">

const props = defineProps({
  color: { type: String, default: "black" },
});

watch(
  () => props.color,
  (color) => document.body.style.setProperty("background", color),
  { immediate: true }
);
</script>

<template></template>
