import Header from "@/components/Header/Header";
import type { Metadata } from "next";
import { roboto, montserrat } from "@/app/fonts/fonts";
import "./globals.css";
import { availableLocales } from "@/utils/i18n";
import AuthProvider from "@/components/Auth-provider/AuthProvider";

export const metadata: Metadata = {
  title: "cineRaptor",
  description: "MovieApp in Next.js",
};

export function generateStaticParams() {
  return availableLocales.map((locale) => ({
    locale,
  }));
}

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: "en" | "fr" };
}>) {

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="256x256"/>
      </head>
      <body
        className={`${roboto.variable} ${montserrat.variable} antialiased bg-neutral-200`}
      >
        <Header locale={locale} />
        <main>
          <AuthProvider>{children}</AuthProvider>
        </main>
      </body>
    </html>
  );
}
