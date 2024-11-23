<script setup lang="ts">
import { Circle, System } from "detect-collisions";
import { computed, ref, watchEffect } from "vue";

// https://www.npmjs.com/package/svg-intersections

interface Body {
  x: number;
  y: number;
  radius: number;
  type: string;
}

interface CollisionDetail {
  type: string;
  distance: number;
  distanceRatio: number;
}

interface BodyWithCollisions extends Body {
  colliding: CollisionDetail[];
}

const bodies = ref<Body[]>([
  { x: 120, y: 200, radius: 10, type: "me" },
  { x: 100, y: 100, radius: 10, type: "other" },
  { x: 140, y: 100, radius: 50, type: "space" },
]);

const y = ref(200);
const radius = ref(10);

watchEffect(() => {
  bodies.value[1].y = y.value;
  bodies.value[2].radius = radius.value;
});

function useCollisions(bodies: Ref<Body[]>): Ref<BodyWithCollisions[]> {
  const isColliding = (
    body1: Body,
    body2: Body
  ): { colliding: boolean; distance: number } => {
    const dx = body1.x - body2.x;
    const dy = body1.y - body2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return { colliding: distance < body1.radius + body2.radius, distance };
  };

  return computed(() => {
    return bodies.value.map((body) => {
      const colliding = bodies.value
        .filter((other) => other !== body)
        .map((other) => {
          const { colliding, distance } = isColliding(body, other);
          if (colliding) {
            const maxDistance = body.radius + other.radius;
            const distanceRatio = distance / maxDistance;
            return { type: other.type, distance, distanceRatio };
          }
          return null;
        })
        .filter(Boolean);

      return {
        ...body,
        colliding,
      } as BodyWithCollisions;
    });
  });
}
const collisions = useCollisions(bodies);
</script>

<template>
  <div class="flex gap-4 p-4">
    <input type="range" v-model.number="y" step="1" max="500" />
    <input type="range" v-model.number="radius" step="1" max="500" />
  </div>
  <svg width="500" height="500">
    <circle
      v-for="body in collisions"
      :key="body.type"
      :cx="body.x"
      :cy="body.y"
      :r="body.radius"
      :stroke="'white'"
      fill="none"
    />
  </svg>
  <pre class="fixed top-0 right-0 w-1/2 overflow-auto h-full">{{
    collisions
  }}</pre>
</template>
