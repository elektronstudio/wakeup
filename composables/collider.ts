import { ref, watchEffect } from "vue";
import {
  System,
  Circle,
  Line,
  Box,
  type Body as Collider,
} from "detect-collisions";

export type ColliderCircle = {
  type: "circle";
  x: number;
  y: number;
  r: number;
  colliding?: boolean;
  audio?: HTMLAudioElement;
};

export type ColliderLine = {
  type: "line";
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  colliding?: boolean;
  audio?: HTMLAudioElement;
};

export type ColliderRect = {
  type: "rect";
  x: number;
  y: number;
  width: number;
  height: number;
  colliding?: boolean;
  audio?: HTMLAudioElement;
};

export type ColliderBody = ColliderCircle | ColliderLine | ColliderRect;

export function useCollider(
  body: Ref<ColliderCircle>,
  bodies: Ref<ColliderBody[]>
) {
  const system = new System();

  const colliding = ref(false);
  const collidingBodies = ref<ColliderBody[]>([]);

  const userCollider = new Circle(
    { x: body.value.x, y: body.value.y },
    body.value.r
  );
  system.insert(userCollider);

  watch(
    [body, bodies],
    () => {
      userCollider.setPosition(body.value.x, body.value.y);

      collidingBodies.value = bodies.value.map((body) => {
        let bodyCollider;
        if (body.type === "circle") {
          bodyCollider = new Circle({ x: body.x, y: body.y }, body.r);
        } else if (body.type === "line") {
          bodyCollider = new Line(
            { x: body.x1, y: body.y1 },
            { x: body.x2, y: body.y2 }
          );
        } else if (body.type === "rect") {
          bodyCollider = new Box(
            { x: body.x, y: body.y },
            body.width,
            body.height
          );
        }
        system.insert(bodyCollider as Collider);

        const collision = system.checkCollision(
          userCollider,
          bodyCollider as Collider
        );
        colliding.value = collision;

        return { ...body, colliding: collision };
      });
    },
    { immediate: true }
  );

  return {
    colliding,
    collidingBodies,
  };
}
