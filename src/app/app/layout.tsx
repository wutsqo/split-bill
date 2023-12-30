import TrakteerModal from "../trakteer/modal";
import { TrakteerProvider } from "../trakteer/provider";
import AccountModal from "./account-modal";
import Navigation from "./navigation";

export default function Layout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <div className="mx-auto container p-4 max-w-screen-sm">
      <Navigation />
      {children}
      <AccountModal />
      <TrakteerProvider>
        <AccountModal />
        <footer className="text-center text-xs pb-16">
          {/* <TrakteerButton className="umami--click--trakteer-button-about mt-4" /> */}
          <TrakteerModal />
        </footer>
      </TrakteerProvider>
    </div>
  );
}
