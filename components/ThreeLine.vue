<script setup>
import { DoubleSide, Mesh } from "three";

const props = defineProps({
  ...transformProps,
  points: { type: Array, default: () => [] },
  lineColor: { type: String, default: "white" },
  lineWidth: { type: Number, default: 0.03 },
});

const sceneContext = inject("sceneContext");

const geometry = new MeshLine();
geometry.setGeometry(props.points.flat());

const material = new MeshLineMaterial({
  color: props.lineColor,
  lineWidth: props.lineWidth,
  side: DoubleSide,
});

const object = new Mesh(geometry, material);
object.raycast = MeshLineRaycast;

if (sceneContext) {
  sceneContext.scene.add(object);
  watchTransform(props, object);
  watchLinecolor(props, object);
}
</script>

<template></template>
