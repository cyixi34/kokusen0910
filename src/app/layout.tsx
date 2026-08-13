import type { Metadata } from "next";
import localFont from "next/font/local";
import { SmoothScrollProvider } from "@/components/ui/SmoothScrollProvider";
import { Atmosphere } from "@/components/ui/Atmosphere";
import { PageTransition } from "@/components/ui/PageTransition";
import "./globals.css";

const feibaiFont = localFont({
  src: "./fonts/tsanger-feibai-w01.woff2",
  variable: "--font-feibai",
  display: "optional",
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
      className={`${feibaiFont.variable} antialiased`}
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
