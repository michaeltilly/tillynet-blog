import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "TillyNet",
    template: "%s | TillyNet",
  },
  description:
    "CCNP Network Engineer specializing in SD-Access, network automation, and enterprise infrastructure. Technical blog by Michael Tillman.",
  metadataBase: new URL("https://blog.tillynet.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://blog.tillynet.com",
    siteName: "TillyNet",
    title: "TillyNet - Michael Tillman | CCNP Network Engineer",
    description:
      "CCNP Network Engineer specializing in SD-Access, network automation, and enterprise infrastructure. Technical blog by Michael Tillman.",
  },
  twitter: {
    card: "summary_large_image",
    title: "TillyNet",
    description:
      "CCNP Network Engineer specializing in SD-Access, network automation, and enterprise infrastructure. Technical blog by Michael Tillman.",
  },
  alternates: {
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 antialiased`}>
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 pt-16">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
