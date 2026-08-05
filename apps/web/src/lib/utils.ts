type ClassValue = string | number | null | undefined | false | ClassValue[];

export function cn(...values: ClassValue[]): string {
  return values
    .flat(Infinity as 1)
    .filter((value): value is string | number => Boolean(value))
    .join(" ");
}
