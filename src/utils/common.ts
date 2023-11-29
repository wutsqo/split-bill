export function mergeClassname(...args: any[]) {
  return args.filter((arg) => arg && typeof arg === "string").join(" ");
}

export function isRunningInBrowser() {
  return typeof window !== "undefined";
}

export function formatMoney(value: number) {
  return value.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}
