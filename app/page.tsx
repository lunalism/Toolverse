// app/page.tsx

import Link from "next/link";
import { Button } from "@/components/ui/button";

const tools = [
  { name: "이미지 변환기", href: "/image-converter", emoji: "🖼️" },
  { name: "글자 수 세기", href: "/text-counter", emoji: "🔤" },
  { name: "날짜 계산기", href: "/date-calculator", emoji: "📅" },
  { name: "PDF 도구", href: "/pdf-tools", emoji: "📄" },
  { name: "이미지 ↔ PDF", href: "/image-pdf-converter", emoji: "🔁" },
  { name: "IP 확인", href: "/ip-checker", emoji: "🌐" },
];

export default function Home() {
  return (
    <main className="min-h-screen py-16 px-6 max-w-4xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-4">Toolverse 🛠️</h1>
      <p className="text-lg text-muted-foreground mb-10">
        누구나 쉽게 사용할 수 있는 온라인 무료 도구 모음
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link href={tool.href} key={tool.name}>
            <Button
              variant="outline"
              className="w-full h-24 flex flex-col justify-center items-center rounded-2xl shadow hover:shadow-lg transition"
            >
              <span className="text-2xl">{tool.emoji}</span>
              <span className="mt-2">{tool.name}</span>
            </Button>
          </Link>
        ))}
      </div>
    </main>
  );
}
