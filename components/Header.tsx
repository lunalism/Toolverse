// components/Header.tsx

import Image from "next/image";
import Link from "next/link";
import DropdownNavigation from "./DropdownNavigation";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b px-6 py-4 flex items-center justify-between">
      <Link href="/" className="flex items-center">
        <Image src="/logo.png" alt="Toolverse Logo" width={120} height={36} />
      </Link>

      <DropdownNavigation />
    </header>
  );
}
