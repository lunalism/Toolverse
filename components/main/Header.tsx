// src/components/main/Header.tsx

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

// TODO: 다크 모드 토글 기능 추가
const toggleDarkMode = () => {
  console.log("다크 모드 토글!");
};

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center pl-4">
          <span className="font-bold text-lg">Toolverse</span>
        </Link>
        <div className="flex justify-center flex-grow">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="#" className={navigationMenuTriggerStyle()}>
                  텍스트 도구
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="#" className={navigationMenuTriggerStyle()}>
                  날짜/시간 도구
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="#" className={navigationMenuTriggerStyle()}>
                  보안 도구
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="#" className={navigationMenuTriggerStyle()}>
                  네트워크 도구
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="#" className={navigationMenuTriggerStyle()}>
                  색상 도구
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="#" className={navigationMenuTriggerStyle()}>
                  PDF 도구
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="#" className={navigationMenuTriggerStyle()}>
                  이미지 도구
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="#" className={navigationMenuTriggerStyle()}>
                  미디어 툴
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="#" className={navigationMenuTriggerStyle()}>
                  유틸리티 툴
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </header>
  );
}