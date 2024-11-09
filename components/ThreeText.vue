<script setup>
import { Text } from "troika-three-text";

const props = defineProps({
    ...transformProps,
    color: { type: String, default: "white" },
    text: { type: String, default: "" },
    fontFile: { type: String, default: null },
    fontSize: { type: Number, default: 1 },
    fontWeight: { type: String, default: "normal" },
    anchorX: { type: String, default: "left" },
    anchorY: { type: String, default: "top" },
    letterSpacing: { type: Number, default: 0 },
    castShadow: { type: Boolean, default: false },
    receiveShadow: { type: Boolean, default: false },
});

const sceneContext = inject("sceneContext");

const font = computed(() => {
    if (props.fontFile) return props.fontFile;
    return props.fontWeight === "bold"
        ? "/font-bold.woff"
        : "/font-medium.woff";
});

const object = new Text();
object.castShadow = props.castShadow;
object.receiveShadow = props.receiveShadow;
sceneContext.scene.add(object);

watch(
    props,
    () => {
        object.font = font.value;
        object.fontWeight = props.fontWeight;
        object.text = props.text;
        object.color = props.color;
        object.fontSize = props.fontSize;
        object.anchorX = props.anchorX;
        object.anchorY = props.anchorY;
        object.letterSpacing = props.letterSpacing;
        object.sync();
    },
    { immediate: true }
);

object.addEventListener("synccomplete", () => {
    sceneContext.update();
});

watchTransform(props, object);

onUnmounted(() => {
    sceneContext.scene.remove(object);
    object.dispose();
});
</script>

<template>
</template>
