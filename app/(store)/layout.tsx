import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/Header";
import {
  ClerkProvider
} from '@clerk/nextjs'
import { SanityLive } from "@/sanity/lib/live";



export const metadata: Metadata = {
  title: "Sisimatt",
  description: "E-commerce platform for the modern market",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider dynamic>
    <html lang="en"> 
      <body>
        <Header />
        <main>{children}</main>
        <SanityLive />
      </body>
    </html>
    </ClerkProvider>
  );
}
