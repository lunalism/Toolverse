import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Header } from "@/components/main/Header";
import { Footer } from "@/components/main/Footer";

// Pretendard 폰트 설정
const pretendard = localFont({
  src: '../public/fonts/Pretendard-Regular.woff2',
  display: 'swap',
  weight: '400',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: 'Toolverse',
  description: 'A collection of useful web tools for everyone.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.className}>
      <body>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}