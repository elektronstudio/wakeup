<script setup lang="js">

const points = [
    [-8, -8],
    [-4, -5],
    [-3, -2],
    [-4, 1],
    [-2, 4],
    [1, 4],
    [3, 1],
    [0, -1],
    [1, -3],
    [5, -5],
    [9, -6],
];

const props = defineProps({
    ...transformProps,
    height: { type: Number, default: 4 },
});

const panels = pointsTransforms(points);
</script>

<template>
    <ThreeGroup :position="position" :rotation="rotation" :scale="scale">
        <ThreeGroup :position="[0, height / 2 + 0.1, 0]" :rotation="[180, 0, 0]" :scale="[1, height, 1]">
            <ThreeGroup v-for="panel in panels" :key="panel.position" :position="panel.position"
                :rotation="panel.rotation">
                <slot :panel="panel" />
            </ThreeGroup>
        </ThreeGroup>
    </ThreeGroup>
</template>
