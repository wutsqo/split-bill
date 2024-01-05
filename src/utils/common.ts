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

type Modal = "account_modal" | "share_modal" | "pdf_modal";

export function showModal(modalId: Modal) {
  const modal = document.getElementById(modalId) as HTMLDialogElement;
  modal?.showModal();
}

export function closeModal(modalId: Modal) {
  const modal = document.getElementById(modalId) as HTMLDialogElement;
  modal?.close();
}
