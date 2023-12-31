export default function Layout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <div className="mx-auto container p-4 max-w-screen-sm">{children}</div>
  );
}
