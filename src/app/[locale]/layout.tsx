import Header from "@/components/Header/Header";
import type { Metadata } from "next";
import { roboto, montserrat } from "@/app/fonts/fonts";
import "./globals.css";
import { availableLocales } from "@/utils/i18n";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export function generateStaticParams(){
  return availableLocales.map((locale) => ({
    locale,
  }));
}

export default function RootLayout({
  children, params: { locale }
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={locale}>
      <body
        className={`${roboto.variable} ${montserrat.variable} antialiased bg-neutral-200`} 
      >
      <Header locale={locale}/>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
