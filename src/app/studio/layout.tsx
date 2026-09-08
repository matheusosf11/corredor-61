export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-dvh min-h-svh bg-white">{children}</div>;
}
