export function shuffle(arr: any[]) {
  return arr.sort(() => Math.random() - 0.5);
}

export function any(arr: any[]) {
  return shuffle(arr)[0];
}
