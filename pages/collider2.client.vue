<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { System, Circle, Box, Line } from "detect-collisions";

const { width, height, centerX, centerY } = useWindowCenter();

const viewBox = computed(
  () =>
    `-${width.value / 2} -${height.value / 2} ${width.value} ${height.value}`
);

function useCollider(objectsRef) {
  const collisionSystem = new System();
  const updatedObjects = ref([]);

  watch(
    objectsRef,
    (newObjects) => {
      collisionSystem.clear();

      // Create colliders for each object and insert them into the collision system
      const colliders = newObjects.map((object) => {
        let collider;
        switch (object.type) {
          case "circle":
            collider = new Circle({ x: object.x, y: object.y }, object.radius);
            break;
          case "rect":
            collider = new Box(
              { x: object.x, y: object.y },
              object.width,
              object.height
            );
            break;
          case "line":
            collider = new Line(
              { x: object.x1, y: object.y1 },
              { x: object.x2, y: object.y2 }
            );
            break;
          default:
            throw new Error(`Unknown object type: ${object.type}`);
        }

        collisionSystem.insert(collider);
        return { ...object, collider, colliding: false };
      });

      // Perform collision checks
      colliders.forEach((object) => {
        object.colliding = false;
      });

      collisionSystem.checkAll((response) => {
        const { a, b } = response;

        colliders.forEach((object) => {
          if (object.collider === a || object.collider === b) {
            object.colliding = true;
          }
        });
      });

      updatedObjects.value = colliders;
    },
    { immediate: true, deep: true }
  );

  return updatedObjects;
}

const objects = ref([
  { type: "circle", x: 0, y: 0, radius: 25 },
  { type: "rect", x: 0, y: 100, width: 50, height: 50 },
]);
const colliders = useCollider(objects);
const circleY = ref(0);
const circleY2 = ref(0);

watch(circleY, (newY) => {
  objects.value[0].y = newY;
});
watch(circleY2, (newY2) => {
  objects.value[1].y = newY2;
});
</script>

<template>
  <svg class="fixed pointer-events-none w-full h-full border-8 border-red-500">
    <g v-for="(object, index) in colliders" :key="index">
      <circle
        v-if="object.type === 'circle'"
        :cx="object.x"
        :cy="object.y"
        :r="object.radius"
        :stroke="object.colliding ? 'red' : 'white'"
        :fill="object.colliding ? 'rgba(255, 0, 0, 0.5)' : 'none'"
      />
      <rect
        v-if="object.type === 'rect'"
        :x="object.x - object.width / 2"
        :y="object.y - object.height / 2"
        :width="object.width"
        :height="object.height"
        :stroke="object.colliding ? 'red' : 'white'"
        :fill="object.colliding ? 'rgba(255, 0, 0, 0.5)' : 'none'"
      />
      <line
        v-if="object.type === 'line'"
        :x1="object.x1"
        :y1="object.y1"
        :x2="object.x2"
        :y2="object.y2"
        :stroke="object.colliding ? 'red' : 'white'"
      />
      <text
        :x="object.type === 'line' ? (object.x1 + object.x2) / 2 : object.x"
        :y="object.type === 'line' ? (object.y1 + object.y2) / 2 : object.y"
        fill="white"
        font-size="12"
        text-anchor="middle"
        dy="-10"
      >
        {{ object.colliding ? "Colliding" : "" }}
      </text>
    </g>
  </svg>
  <div class="fixed top-4 right-4">
    <input type="range" v-model="circleY" min="-200" max="200" />
    <input type="range" v-model="circleY2" min="-200" max="200" />
  </div>
</template>
