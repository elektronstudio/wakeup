<script setup lang="ts">
import { defineProps } from "vue";

const { r = 15 } = defineProps<{
  r?: number;
}>();
</script>

<template>
  <svg :width="r * 2" :height="r * 2" class="">
    <circle :cx="r" :cy="r" :r="r" fill="currentColor" />
  </svg>
</template>
