import type { Metadata } from "next";
import "./globals.css";

import { Noto_Sans_JP } from "next/font/google";

const noto_sans_jp = Noto_Sans_JP();

export const metadata: Metadata = {
  title: "Memo App",
  description: "Memo App by Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${noto_sans_jp.className} antialiased text-gray-700`}>
        {children}
      </body>
    </html>
  );
}
