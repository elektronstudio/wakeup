<script setup>
import { Group } from "three";

const props = defineProps({ ...transformProps });
const slots = useSlots();

const sceneContext = inject("sceneContext");
const group = new Group();

if (sceneContext) {
  sceneContext.scene.add(group);

  provide("sceneContext", { ...sceneContext, scene: group });

  watch(
    () => slots.default(),
    () => {
      sceneContext.update();
    },
    { immediate: true }
  );

  watchTransform(props, group);
}
</script>

<template>
  <slot />
</template>
