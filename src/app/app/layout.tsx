import { AppContextProvider } from "./context";
import { Navigation } from "./navigation";

export default function Layout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <AppContextProvider>
      <div className="mx-auto container p-4">
        <Navigation />
        {children}
      </div>
    </AppContextProvider>
  );
}
