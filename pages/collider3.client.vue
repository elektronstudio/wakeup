<script setup lang="ts">
import { System } from "detect-collisions";
import { computed, ref, watchEffect } from "vue";

const x = ref(120);
const bodies = ref([
  { x: 0, y: 0, radius: 10, id: "circle1" },
  { x: 120, y: 0, radius: 10, id: "circle2" },
  { x: 140, y: 0, radius: 10, id: "circle3" },
]);

watchEffect(() => {
  bodies.value[1].x = x.value;
});

const colliders = computed(() => {
  const system = new System();

  bodies.value.forEach((body) => {
    system.createCircle({ x: body.x, y: body.y }, body.radius, {
      userData: { id: body.id },
    });
  });

  // Copy bodies and check for collisions
  const updatedBodies = bodies.value.map((body) => ({
    ...body,
    colliders: [] as any[],
  }));

  system.checkAll((response) => {
    const { a, b, overlap } = response;
    if (overlap > 0) {
      console.log({ a, b, overlap });
      const src = updatedBodies.find((c) => c.id === a.userData.id);
      if (src) {
        src.colliders.push([b.userData.id, overlap]);
      }
    }
  });

  return updatedBodies;
});
</script>

<template>
  <div>
    <input type="range" v-model="x" step="1" max="500" />
  </div>
  <svg width="500" height="500">
    <circle
      v-for="body in colliders"
      :key="body.id"
      :cx="body.x"
      :cy="body.y"
      :r="body.radius"
      :stroke="body.colliders.length > 0 ? 'white' : 'gray'"
      fill="none"
    />
  </svg>
  <pre class="fixed top-0 right-0 w-1/2">{{ colliders }}</pre>
</template>
