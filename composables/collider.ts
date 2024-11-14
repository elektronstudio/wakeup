import { ref, watchEffect } from "vue";
import {
  System,
  Circle,
  Line,
  Box,
  type Body as Collider,
} from "detect-collisions";

type User = { x: number; y: number; r: number; colliding?: boolean };

type ColliderCircle = {
  type: "circle";
  x: number;
  y: number;
  r: number;
  colliding?: boolean;
};

type ColliderLine = {
  type: "line";
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  colliding?: boolean;
};

type ColliderRect = {
  type: "rect";
  x: number;
  y: number;
  width: number;
  height: number;
  colliding?: boolean;
};

export type ColliderBody = ColliderCircle | ColliderLine | ColliderRect;

export function useCollider(user: Ref<User>, defaultBodies: ColliderBody[]) {
  const system = new System();
  const bodies = ref<ColliderBody[]>([]);

  const userCollider = new Circle(
    { x: user.value.x, y: user.value.y },
    user.value.r
  );
  system.insert(userCollider);

  watchEffect(() => {
    userCollider.setPosition(user.value.x, user.value.y);
    user.value.colliding = false;

    bodies.value = defaultBodies.map((body) => {
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

      const colliding = system.checkCollision(
        userCollider,
        bodyCollider as Collider
      );
      if (colliding) {
        user.value.colliding = true;
      }

      return { ...body, colliding };
    });
  });

  return {
    user,
    bodies,
  };
}
