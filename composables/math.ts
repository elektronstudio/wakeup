export const distance = (x1: number, y1: number, x2: number, y2: number) =>
  Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

export const pol2car = (a: number, r: number) => {
  return {
    x: Math.cos((a - 90) * (Math.PI / 180)) * r,
    y: Math.sin((a - 90) * (Math.PI / 180)) * r,
  };
};

export const car2pol = (x: number, y: number) => {
  return {
    a: Math.atan2(y, x) * (180 / Math.PI),
    r: Math.sqrt(x * x + y * y),
  };
};
