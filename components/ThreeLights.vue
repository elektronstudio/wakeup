<script setup>
import { AmbientLight, PointLight, Color } from "three";

const props = defineProps({
    color: { type: String, default: "white" },
});

const sceneContext = inject("sceneContext");

if (sceneContext) {
    const ambientLight = new AmbientLight();
    sceneContext.scene.add(ambientLight);

    const directionalLight = new PointLight(props.color);
    directionalLight.position.set(0, 100, 40);
    directionalLight.castShadow = true;
    sceneContext.scene.add(directionalLight);

    watch(
        () => props.color,
        (color) => {
            directionalLight.color = new Color(color);
        }
    );
}
</script>

<template>
</template>