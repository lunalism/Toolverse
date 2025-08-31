// src/components/main/Header.tsx

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { useTheme } from "next-themes";

export function Header() {
    const { setTheme, theme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="relative flex h-14 items-center justify-between px-6 md:px-8 max-w-[1440px] mx-auto">
                {/* 왼쪽: 로고 */}
                <div className="flex items-center">
                    <Link href="/" className="flex items-center">
                        <span className="font-bold text-lg">Toolverse</span>
                    </Link>
                </div>

                {/* 가운데: 고정된 네비게이션 메뉴 */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <NavigationMenu>
                        <NavigationMenuList className="flex gap-1">
                            <NavigationMenuItem>
                                <Link href="/tools/text" className={navigationMenuTriggerStyle()}>
                                텍스트 도구
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href="#" className={navigationMenuTriggerStyle()}>
                                날짜/시간 도구
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href="/tools/security" className={navigationMenuTriggerStyle()}>
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

                {/* 오른쪽: 다크 모드 토글 */}
                <div className="flex items-center">
                    <Button variant="ghost" className="h-9 w-9" onClick={toggleTheme}>
                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                </div>
            </div>
        </header>
    );
}
