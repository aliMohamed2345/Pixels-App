import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Nav from './Components/Nav/Nav'
import ReduxProvider from "./ReduxProvider";
import ScrollToTop from "./Components/Home/ScrollToTop";
import { Suspense } from 'react'
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Pixels-App",
  description: "Pixels photos and videos Stock Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased transition-all bg-primary `}
      >
        <ReduxProvider>
          <Nav />
          <ScrollToTop />
          <Suspense>
            {children}
          </Suspense>
        </ReduxProvider>
      </body>
    </html>
  );
}
