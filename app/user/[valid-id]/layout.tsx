export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-full px-6">{children}</div>;
}
