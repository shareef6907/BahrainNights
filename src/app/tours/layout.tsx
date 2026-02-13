// Note: All metadata is defined in page.tsx to avoid duplicate canonical issues
// Layout only provides structure, page.tsx handles SEO metadata

export default function ToursLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
