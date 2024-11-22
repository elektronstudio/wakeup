<script setup lang="ts">
import { System } from "detect-collisions";
import { computed, ref } from "vue";

const x = ref(20);
const bodies = ref([
  { x: 0, y: 0, radius: 10, id: "circle1" },
  { x: 20, y: 0, radius: 10, id: "circle2" },
  { x: 40, y: 0, radius: 10, id: "circle3" },
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
  <div><input type="range" v-model="x" step="5" /></div>
  <pre>{{ colliders }}</pre>
</template>
