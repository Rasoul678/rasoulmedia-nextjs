export function* chunks<T>(arr: T[], n: number): Generator<T[], void> {
  for (let i = 0; i < arr.length; i += n) {
    yield arr.slice(i, i + n);
  }
}

export const random = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
