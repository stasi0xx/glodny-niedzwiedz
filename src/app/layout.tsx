import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { KubaWidget } from "@/components/features/KubaWidget";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Głodny Niedźwiedź - Catering Dietetyczny Premium",
  description:
    "Zdrowy catering dietetyczny z dostawą do domu. Sprawdź naszą ofertę i zamów dietę idealną dla siebie.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${inter.variable} ${sora.variable}`}>
      <body className="font-sans antialiased min-h-screen flex flex-col bg-[#F8F9FA] text-[#111827]">
        <LanguageProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <KubaWidget />
        </LanguageProvider>
      </body>
    </html>
  );
}
