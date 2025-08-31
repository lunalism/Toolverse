import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Header } from "@/components/main/Header";
import { Footer } from "@/components/main/Footer";
import { ThemeProvider } from "@/components/main/theme-provider";
import { Toaster } from "@/components/ui/sonner"

// Pretendard 폰트 설정
const pretendard = localFont({
  src: [
    {
      path: '../public/fonts/Pretendard-Thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../public/fonts/Pretendard-ExtraLight.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../public/fonts/Pretendard-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/Pretendard-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Pretendard-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Pretendard-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/Pretendard-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/Pretendard-ExtraBold.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../public/fonts/Pretendard-Black.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  display: 'swap',
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
    <html lang="ko" className={pretendard.className} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}