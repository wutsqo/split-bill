import { TAB_IDS } from "@/app/app/constant";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  activeTabId: string;
}

interface Action {
  setActiveTabId: (tabId: TAB_IDS) => void;
}

export const useTabStore = create<State & Action>()(
  persist(
    (set) => ({
      activeTabId: TAB_IDS.PEOPLE,
      setActiveTabId: (tabId) => set({ activeTabId: tabId }),
    }),
    { name: "tab", skipHydration: true }
  )
);
