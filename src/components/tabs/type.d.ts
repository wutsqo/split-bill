export interface ITab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: ITab[];
  activeTabId: string;
  setActiveTab: (tabId: string) => void;
}
