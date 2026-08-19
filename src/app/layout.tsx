import type { Metadata } from "next";
import { Inter, Newsreader, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { AppBootstrap } from "@/components/AppBootstrap";
import { ToastProvider } from "@/components/ui/Toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Brandly — Digital Brand OS",
  description: "The living, digital home for your brand.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable} ${plexMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#F7F5F0] text-[#14140F]">
        <ToastProvider>
          <AppBootstrap>{children}</AppBootstrap>
        </ToastProvider>
      </body>
    </html>
  );
}
