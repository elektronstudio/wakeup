import { ref, watchEffect } from "vue";
import { System, Circle, Line, Box } from "detect-collisions";

type User = { x: number; y: number; r: number; colliding?: boolean };

type CircleBody = {
  type: "circle";
  x: number;
  y: number;
  r: number;
  colliding?: boolean;
};

type LineBody = {
  type: "line";
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  colliding?: boolean;
};

type RectBody = {
  type: "rect";
  x: number;
  y: number;
  width: number;
  height: number;
  colliding?: boolean;
};

type Body = CircleBody | LineBody | RectBody;

export function useCollisionDetection(user: Ref<User>, defaultBodies: Body[]) {
  const system = new System();
  const bodies = ref<Body[]>([]);

  const userCollider = new Circle(
    { x: user.value.x, y: user.value.y },
    user.value.r
  );
  system.insert(userCollider);

  watchEffect(() => {
    // Update user collider position
    userCollider.setPosition(user.value.x, user.value.y);
    user.value.colliding = false;

    // Update bodies and check for collisions
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
      system.insert(bodyCollider as any);

      const colliding = system.checkCollision(
        userCollider,
        bodyCollider as any
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
