import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SmoothScrollProvider } from "@/components/ui/SmoothScrollProvider";
import { Atmosphere } from "@/components/ui/Atmosphere";
import { PageTransition } from "@/components/ui/PageTransition";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: false,
});

export const metadata: Metadata = {
  title: "告别宣言 | FAREWELL PROCLAMATION",
  description:
    "告别宣言乐队官方网站。在最后的和弦里，说出所有未曾开口的话。",
  openGraph: {
    title: "告别宣言 | FAREWELL PROCLAMATION",
    description: "在最后的和弦里，说出所有未曾开口的话。",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground" suppressHydrationWarning>
        <SmoothScrollProvider>
          <Atmosphere />
          <PageTransition>
            {children}
          </PageTransition>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
