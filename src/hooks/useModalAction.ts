import { create } from "zustand";

interface Action {
  showAuthModal: () => void;
}

export const useModalAction = create<Action>((set) => ({
  showAuthModal: () => {
    const dialog = document.getElementById(
      "account_modal"
    ) as HTMLDialogElement;
    dialog.showModal();
  },
}));
