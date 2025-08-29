// toolverse/app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/main/Header";
import Footer from "@/components/main/Footer";
import { pretendard } from "@/pretendard"; // pretendard 폰트 임포트

export const metadata: Metadata = {
  title: "Toolverse",
  description: "All-in-one free online tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      {/* pretendard 폰트 클래스 적용 */}
      <body className={pretendard.className}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow p-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}