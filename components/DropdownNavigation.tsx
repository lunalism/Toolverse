// components/DropdownNavigation.tsx

"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu, ImageIcon, TextIcon, CalendarIcon, FileTextIcon, RefreshCcw, Globe } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const menu = [
  {
    name: "이미지 변환",
    description: "HEIC → JPG 등 다양한 변환",
    href: "/image-converter",
    icon: <ImageIcon className="w-4 h-4 mr-2" />,
  },
  {
    name: "글자 수 세기",
    description: "문자 수, 단어 수 실시간 분석",
    href: "/text-counter",
    icon: <TextIcon className="w-4 h-4 mr-2" />,
  },
  {
    name: "날짜 계산기",
    description: "기간 차이 계산, 일 더하기 등",
    href: "/date-calculator",
    icon: <CalendarIcon className="w-4 h-4 mr-2" />,
  },
  {
    name: "PDF 도구",
    description: "PDF 분할 및 병합",
    href: "/pdf-tools",
    icon: <FileTextIcon className="w-4 h-4 mr-2" />,
  },
  {
    name: "이미지 ↔ PDF",
    description: "이미지 → PDF, PDF → 이미지",
    href: "/image-pdf-converter",
    icon: <RefreshCcw className="w-4 h-4 mr-2" />,
  },
  {
    name: "IP 확인",
    description: "내 IP 및 브라우저 정보",
    href: "/ip-checker",
    icon: <Globe className="w-4 h-4 mr-2" />,
  },
];

export default function DropdownNavigation() {
  const pathname = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="메뉴 열기">
          <Menu className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        {menu.map((item) => (
          <DropdownMenuItem
            key={item.href}
            asChild
            className={cn(
              "px-3 py-2 rounded-md flex flex-col items-start hover:bg-accent transition",
              pathname === item.href ? "bg-accent font-semibold" : ""
            )}
          >
            <Link href={item.href} className="w-full">
              <div className="flex items-center">
                {item.icon}
                <div className="flex flex-col">
                  <span className="text-sm">{item.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {item.description}
                  </span>
                </div>
              </div>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
