import type { Metadata } from "next";
import "./globals.css";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { manrope } from "./ui/fonts";

config.autoAddCss = false

export const metadata: Metadata = {
  title: "NextStep - App",
  description: "proyecto Progra III",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
    >
      <body className={`${manrope.className} antialiased h-screen`} suppressHydrationWarning>{children}</body>
    </html>
  );
}