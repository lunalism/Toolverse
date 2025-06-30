import Link from "next/link";
import { tools } from "@/lib/tools";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main className="min-h-screen py-16 px-6 max-w-5xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-4">🛠️ Toolverse</h1>
      <p className="text-lg text-muted-foreground mb-10">
        누구나 쉽게 사용할 수 있는 온라인 무료 도구 모음
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {tools.map(({ name, href, icon: Icon, color }) => (
          <Link href={href} key={name}>
            <div
              className={cn(
                "rounded-2xl p-6 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer bg-white border",
                "flex flex-col items-center justify-center space-y-4"
              )}
            >
              <div
                className={cn("w-16 h-16 rounded-full flex items-center justify-center text-3xl", color)}
              >
                <Icon className="w-8 h-8" />
              </div>
              <div className="text-base font-semibold">{name}</div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
