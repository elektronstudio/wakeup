<script setup lang="ts">
const size = 5;
</script>
<template>
  <svg
    width="100vw"
    height="100vh"
    class="pointer-events-none fixed inset-0 text-white/50"
  >
    <defs>
      <pattern
        id="grid"
        :width="size + 'vw'"
        :height="size + 'vw'"
        patternUnits="userSpaceOnUse"
      >
        <circle
          :cx="size / 2 + 'vw'"
          :cy="size / 2 + 'vw'"
          r="0.5"
          fill="currentColor"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />
  </svg>
</template>
