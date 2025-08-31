// app/page.tsx

import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-[calc(90vh-56px)] flex flex-col items-center justify-center">
      <div className="container text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
          모든 도구를 한 곳에서.
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          간편하고 유용한 무료 웹 도구 모음.
        </p>
        <Button className="mt-6" size="lg">
          도구 둘러보기
        </Button>
      </div>
    </div>
  );
}
