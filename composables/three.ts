// Utility functions
export const deg2rad = (deg: number): number => (deg * Math.PI) / 180;

export const rad2deg = (rad: number): number => (rad * 180) / Math.PI;

// Transform properties
export const transformProps = {
  position: {
    default: [0, 0, 0] as [number, number, number],
  },
  rotation: {
    default: [0, 0, 0] as [number, number, number],
  },
  scale: {
    default: [1, 1, 1] as [number, number, number],
  },
};

// Watch transform
export const watchTransform = (
  props: {
    position: [number, number, number];
    rotation: [number, number, number];
    scale: [number, number, number];
  },
  object: {
    position: { x: number; y: number; z: number };
    rotation: { x: number; y: number; z: number };
    scale: { x: number; y: number; z: number };
  }
): void => {
  watch(
    () => props.position,
    (position) => {
      object.position.x = parseFloat(position[0].toString());
      object.position.y = parseFloat(position[1].toString());
      object.position.z = parseFloat(position[2].toString());
    },
    { immediate: true }
  );

  watch(
    () => props.rotation,
    (rotation) => {
      object.rotation.x = parseFloat(deg2rad(rotation[0]).toString());
      object.rotation.y = parseFloat(deg2rad(rotation[1]).toString());
      object.rotation.z = parseFloat(deg2rad(rotation[2]).toString());
    },
    { immediate: true }
  );

  watch(
    () => props.scale,
    (scale) => {
      object.scale.x = parseFloat(scale[0].toString());
      object.scale.y = parseFloat(scale[1].toString());
      object.scale.z = parseFloat(scale[2].toString());
    },
    { immediate: true }
  );
};

// Material properties
export const materialProps = {
  color: {
    default: "black",
  },
  lineColor: {
    default: null as string | null,
  },
  opacity: {
    default: 1,
  },
  lineOpacity: {
    default: 1,
  },
};

// Watch color
export const watchColor = (
  props: { color: string },
  object: { material: { color: { set: (color: string) => void } } },
  callback: () => void = () => {}
): void => {
  watch(
    () => props.color,
    (color) => {
      object.material.color.set(color);
      callback();
    }
  );
};

// Watch line color
export const watchLinecolor = (
  props: { lineColor: string | null },
  object: { material: { color: { set: (color: string) => void } } },
  callback: () => void = () => {}
): void => {
  watch(
    () => props.lineColor,
    (color) => {
      if (color) object.material.color.set(color);
      callback();
    }
  );
};

// Utility functions for points
export const pointsMidpoint = (
  [x1, y1]: [number, number],
  [x2, y2]: [number, number]
): [number, number] => [(x1 + x2) / 2, (y1 + y2) / 2];

export const pointsAngle = (
  [x1, y1]: [number, number],
  [x2, y2]: [number, number]
): number => -Math.atan2(y2 - y1, x2 - x1);

export const pointsDistance = (
  [x1, y1]: [number, number],
  [x2, y2]: [number, number]
): number => Math.hypot(x2 - x1, y2 - y1);

export const pointsTransforms = (
  points: [number, number][]
): {
  position: [number, number, number];
  rotation: [number, number, number];
  width: number;
}[] => {
  let transforms: {
    position: [number, number, number];
    rotation: [number, number, number];
    width: number;
  }[] = [];
  points.forEach((p, i) => {
    if (points[i + 1]) {
      transforms.push({
        position: [
          pointsMidpoint(points[i], points[i + 1])[0],
          0,
          pointsMidpoint(points[i], points[i + 1])[1],
        ],
        rotation: [0, rad2deg(pointsAngle(points[i], points[i + 1])), 0],
        width: pointsDistance(points[i], points[i + 1]),
      });
    }
  });
  return transforms;
};

// Rectangle points
export const rectPoints = (w = 1, h = 1): [number, number, number][] => [
  [w / -2, h / 2, 0],
  [w / 2, h / 2, 0],
  [w / 2, h / -2, 0],
  [w / -2, h / -2, 0],
  [w / -2, h / 2, 0],
];
