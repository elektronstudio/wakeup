<script setup lang="ts">
import { Circle, System } from "detect-collisions";
import { computed, ref, watchEffect } from "vue";

interface Body {
  x: number;
  y: number;
  radius: number;
  type: string;
}

interface CollisionDetail {
  type: string;
  distance: number;
}

interface BodyWithCollisions extends Body {
  colliding: CollisionDetail[];
}

const x = ref(120);

const bodies = ref<Body[]>([
  { x: 100, y: 100, radius: 50, type: "user" },
  { x: 120, y: 100, radius: 50, type: "other" },
  { x: 140, y: 100, radius: 50, type: "circle" },
]);

watchEffect(() => {
  bodies.value[1].x = x.value;
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
          return colliding ? { type: other.type, distance } : null;
        })
        .filter(
          (collision): collision is CollisionDetail => collision !== null
        );

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
  <div>
    <input type="range" v-model="x" step="1" max="500" />
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
  <pre class="fixed top-0 right-0 w-1/2">{{ collisions }}</pre>
</template>
