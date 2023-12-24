/* istanbul ignore file */

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

export function isInIframe() {
  if (!isRunningInBrowser()) return false;
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}
