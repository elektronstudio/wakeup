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

export const random = (from: number = 0, to: number = 1): number =>
  from + Math.random() * (to - from);

export const randomHexColor = (): string =>
  `#${Math.floor(random(0, 0xffffff)).toString(16).padStart(6, "0")}`;
