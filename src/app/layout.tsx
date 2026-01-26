import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tanjung Barat - Website Resmi",
  description: "Website resmi Tanjung Barat. Informasi lengkap tentang profil, pelayanan, potensi wisata, dan berita terkini.",
  keywords: ["Tanjung Barat", "Jakarta Selatan", "Pelayanan Publik", "Wisata", "Berita"],
  authors: [{ name: "Pemerintah Tanjung Barat" }],
  openGraph: {
    title: "Tanjung Barat - Website Resmi",
    description: "Informasi lengkap tentang Tanjung Barat",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
