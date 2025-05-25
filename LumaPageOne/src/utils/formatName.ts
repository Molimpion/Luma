//Manter a primeira letra dos nomes na saudação em maiúsculo

export function capitalizeEachWord(str: string): string {
  if (!str) return "";
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
