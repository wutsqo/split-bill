import TrakteerButton from "../trakteer/button";
import TrakteerModal from "../trakteer/modal";
import { TrakteerProvider } from "../trakteer/provider";
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
      <TrakteerProvider>
        <AccountModal />
        <footer className="text-center text-xs">
          <TrakteerButton className="umami--click--trakteer-button-about mt-4" />
          <TrakteerModal />
        </footer>
      </TrakteerProvider>
    </AppContextProvider>
  );
}
