<script setup lang="ts">
const el = ref<HTMLElement | null>(null)

const { centerX, centerY } = useWindowCenter();

const { x, y, style } = useDraggable(el, {
    initialValue: { x: centerX.value, y: centerY.value },
})

const user = ref({ x: 0, y: 0 })

watch([x, y], ([x, y]) => {
    user.value.x = x - centerX.value
    user.value.y = y - centerY.value
})
</script>

<template>
    <pre class="pointer-events-none select-none">{{ user }}</pre>
    <div ref="el" :style="style" class="fixed cursor-grab">
        <Dot ref="el" :style="style" class="text-red-500" />
    </div>
</template>