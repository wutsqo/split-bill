export function mergeClassname(...args: any[]) {
  return args.filter((arg) => arg && typeof arg === "string").join(" ");
}

export function isRunningInBrowser() {
  return typeof window !== "undefined";
}
