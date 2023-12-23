import AccountModal from "./account-modal";
import { AppContextProvider } from "./context";
import Navigation from "./navigation";

export default function Layout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <AppContextProvider>
      <div className="mx-auto container p-4 max-w-screen-sm">
        <Navigation />
        {children}
      </div>
      <AccountModal />
    </AppContextProvider>
  );
}
