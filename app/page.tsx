import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  ImageIcon,
  TextIcon,
  CalendarIcon,
  FileTextIcon,
  RefreshCcw,
  Globe,
} from "lucide-react";

const tools = [
  {
    name: "이미지 변환기",
    href: "/image-converter",
    icon: ImageIcon,
    color: "bg-blue-100 text-blue-600",
  },
  {
    name: "글자 수 세기",
    href: "/text-counter",
    icon: TextIcon,
    color: "bg-green-100 text-green-600",
  },
  {
    name: "날짜 계산기",
    href: "/date-calculator",
    icon: CalendarIcon,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    name: "PDF 도구",
    href: "/pdf-tools",
    icon: FileTextIcon,
    color: "bg-purple-100 text-purple-600",
  },
  {
    name: "이미지 ↔ PDF",
    href: "/image-pdf-converter",
    icon: RefreshCcw,
    color: "bg-pink-100 text-pink-600",
  },
  {
    name: "IP 확인",
    href: "/ip-checker",
    icon: Globe,
    color: "bg-gray-100 text-gray-600",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen py-16 px-6 max-w-5xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-4">🛠️ Toolverse</h1>
      <p className="text-lg text-muted-foreground mb-10">
        누구나 쉽게 사용할 수 있는 온라인 무료 도구 모음
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link href={tool.href} key={tool.name}>
              <div
                className={cn(
                  "rounded-2xl p-6 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer bg-white border",
                  "flex flex-col items-center justify-center space-y-4"
                )}
              >
                <div
                  className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center text-3xl",
                    tool.color
                  )}
                >
                  <Icon className="w-8 h-8" />
                </div>
                <div className="text-base font-semibold">{tool.name}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
