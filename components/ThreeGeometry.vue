<script setup>
import * as THREE from "three";
import {
    Group,
    MeshPhongMaterial,
    Mesh,
    EdgesGeometry,
    LineBasicMaterial,
    LineSegments,
    DoubleSide,
} from "three";

const props = defineProps({
    ...transformProps,
    ...materialProps,
    width: { type: Number, default: 1 },
    height: { type: Number, default: 1 },
    depth: { type: Number, default: 1 },
    geometry: { type: String, default: "BoxGeometry" },
    texture: { default: null },
    castShadow: { type: Boolean, default: false },
    receiveShadow: { type: Boolean, default: false },
});

const sceneContext = inject("sceneContext");

let group = new Group();

const geometry = new THREE[props.geometry](props.width, props.height, props.depth);

const fillMaterial = computed(() =>
    new MeshPhongMaterial({
        map: props.texture,
        color: props.color,
        opacity: props.opacity,
        side: DoubleSide,
    })
);

const fillObject = new Mesh(geometry, fillMaterial.value);
fillObject.castShadow = props.castShadow;
fillObject.receiveShadow = props.receiveShadow;

watchColor(props, fillObject, sceneContext.update);
group.add(fillObject);

if (props.lineColor) {
    const edges = new EdgesGeometry(geometry);
    const lineMaterial = new LineBasicMaterial({
        color: props.lineColor,
        opacity: props.lineOpacity,
        side: DoubleSide,
    });
    const lineObject = new LineSegments(edges, lineMaterial);
    group.add(lineObject);
    watchLinecolor(props, lineObject);
}

sceneContext.scene.add(group);
watchTransform(props, group);
</script>

<template>
</template>