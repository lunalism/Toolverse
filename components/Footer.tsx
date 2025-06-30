// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="w-full py-6 text-center text-sm text-muted-foreground border-t">
      © {new Date().getFullYear()} Toolverse. 모든 권리 보유.
    </footer>
  );
}
