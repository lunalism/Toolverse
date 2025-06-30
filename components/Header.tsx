"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const menu = [
  { name: "이미지 변환", href: "/image-converter" },
  { name: "글자 수 세기", href: "/text-counter" },
  { name: "날짜 계산기", href: "/date-calculator" },
  { name: "PDF 도구", href: "/pdf-tools" },
  { name: "이미지 ↔ PDF", href: "/image-pdf-converter" },
  { name: "IP 확인", href: "/ip-checker" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b px-6 py-4 flex items-center justify-between">
      {/* 로고만 */}
      <Link href="/" className="flex items-center">
        <Image src="/logo.png" alt="Toolverse Logo" width={120} height={38} />
      </Link>

      {/* 드롭다운 메뉴 - 데스크탑 & 모바일 공통 */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="메뉴 열기">
            <Menu className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          {menu.map((item) => (
            <DropdownMenuItem key={item.href} asChild>
              <Link
                href={item.href}
                className={`w-full block px-2 py-1.5 rounded hover:bg-accent ${
                  pathname === item.href ? "font-semibold text-blue-600" : ""
                }`}
              >
                {item.name}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
