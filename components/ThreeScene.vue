<script setup>
import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    PCFSoftShadowMap,
    // UnrealBloomPass,
    // Vector2,
} from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
// import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

const el = ref(null);
const width = window.innerWidth;
const height = window.innerHeight;

const scene = new Scene();

const camera = new PerspectiveCamera(75, width / height, 0.1);
camera.position.y = 1;
camera.position.z = 12;
camera.lookAt(0, 1, 0);

const renderer = new WebGLRenderer({
    antialias: true,
    alpha: true,
});
renderer.setSize(width, height);
renderer.setPixelRatio(window.devicePixelRatio || 1);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = PCFSoftShadowMap;

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

// Uncomment if UnrealBloomPass is needed
// composer.addPass(
//   new UnrealBloomPass(new Vector2(window.innerWidth, window.innerHeight), 1, 2, 0.5)
// );

const update = () => composer.render();

provide("sceneContext", { scene, update });

const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener("change", update);

const tanFOV = Math.tan(((Math.PI / 180) * camera.fov) / 2);
const windowHeight = window.innerHeight;

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.fov =
        (360 / Math.PI) * Math.atan(tanFOV * (window.innerHeight / windowHeight));
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    update();
}

onMounted(() => {
    el.value.appendChild(renderer.domElement);
    update();
    window.addEventListener("resize", onWindowResize);
});

onUnmounted(() => {
    window.removeEventListener("resize", onWindowResize);
});

onBeforeUpdate(() => {
    update();
});

const animate = () => {
    requestAnimationFrame(animate);
    update();
};

</script>

<template>
    <div ref="el">
        <slot />
    </div>
</template>
