export default function EmptyState({ text }: { readonly text: string }) {
  return (
    <div role="alert" className="alert bg-base-100">
      <div className="w-full flex justify-center gap-3 items-center text-sm text-center sm:col-span-2 sm:text-base">
        <span>💡</span>
        <span>{text}</span>
      </div>
    </div>
  );
}
