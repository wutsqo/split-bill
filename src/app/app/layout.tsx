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
    </div>
  );
}
