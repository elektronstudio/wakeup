<script setup lang="ts">
const el = ref<HTMLElement | null>(null);

const { centerX, centerY } = useWindowCenter();

const userRadius = 15;

const { x, y } = useDraggable(el, {
  initialValue: {
    x: centerX.value - userRadius,
    y: centerY.value - userRadius,
  },
});

const userStyle = computed(() => ({
  left: x.value + "px",
  top: y.value + "px",
}));
</script>

<template>
  <div ref="el" :style="userStyle" class="fixed cursor-grab flex gap-2">
    <Dot class="text-red-500/90" />
  </div>
</template>
