import { Circle } from "collisions";

export const trunc = (value: number, decimals: number = 1): number =>
  Number(Math.round(Number(value + "e" + decimals)) + "e-" + decimals);

export const throttle = (
  fn: (...args: any[]) => void,
  delay: number
): ((...args: any[]) => void) => {
  let timeout = false;
  return (...rest: any[]) => {
    if (!timeout) {
      timeout = true;
      fn.apply(this, rest);
      setTimeout(() => {
        timeout = false;
      }, delay);
    }
  };
};

export const randomHexColor = (): string =>
  `#${Math.floor(random(0, 0xffffff)).toString(16).padStart(6, "0")}`;

export const random = (from: number = 0, to: number = 1): number =>
  from + Math.random() * (to - from);

type CircleConfig = { x: number; y: number; r: number };

export function randomXY(
  xRange: number,
  yRange: number,
  r: number,
  circles: CircleConfig[] = []
): any {
  const circleObjects = circles.map(
    (circle) => new Circle(circle.x, circle.y, circle.r)
  );

  let randomX: number;
  let randomY: number;

  while (true) {
    randomX = random(-xRange / 2, xRange / 2);
    randomY = random(-yRange / 2, yRange / 2);
    const pointCircle = new Circle(randomX, randomY, r);

    const collides = circleObjects.some((collisionCircle) =>
      pointCircle.collides(collisionCircle)
    );

    if (!collides) {
      break; // If no collision, we found a valid point
    }
  }

  return { x: randomX, y: randomY, xRange, yRange, c: circles[0]?.r };
}
