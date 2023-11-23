export function clamp(input: number, min: number, max: number): number {
  return input < min ? min : input > max ? max : input;
}

export function map(value: number, in_min: number, in_max: number, out_min: number, out_max: number): number {
  const mapped = ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;

  return clamp(mapped, out_min, out_max);
}

export function networkStrength(strength: number): number {
  return map(strength, -90, -30, 0, 4);
}
