export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-[92%] max-w-7xl ${className}`}>{children}</div>
  );
}
