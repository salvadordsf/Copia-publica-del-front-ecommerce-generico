import GlobalProviders from "./provider";
import "@/styles/globals.css";
import { Metadata } from "next";
import { Outfit } from "next/font/google";

export const metadata: Metadata = {
  title: {
    default: "Ecommerce genérico",
    template: "%s | Ecommerce genérico",
  },
  description:
    "A starter ecommerce template for Next.js 13 with TypeScript and Tailwind CSS. Developed by @salvadordsf (Salvador Di Sabatto).",
  generator: "Next.js 13",
  applicationName: "Ecommerce genérico",
  referrer: "origin-when-cross-origin",
  metadataBase: new URL("https://ecommerce-frontend-bice-eta.vercel.app"),
  keywords: [
    "ecommerce",
    "next.js",
    "typescript",
    "tailwind css",
    "starter template",
    "salvadordsf",
    "salvador di sabatto",
    "github",
    "developer",
    "web development",
    "react",
    "frontend",
  ],
  authors: [
    { name: "Salvador Di Sabatto", url: "https://github.com/salvadordsf/" },
  ],
  creator: "Salvador Di Sabatto",
  publisher: "Salvador Di Sabatto",
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  openGraph: {
    title: "Ecommerce genérico",
    description:
      "A starter ecommerce template for Next.js 13 with TypeScript and Tailwind CSS. Developed by @salvadordsf (Salvador Di Sabatto).",
    url: "https://ecommerce-frontend-bice-eta.vercel.app",
    siteName: "Ecommerce genérico",
    locale: "es_AR",
    type: "website",
  },
};

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GlobalProviders>
      <html lang="es">
        <body className={outfit.variable}>{children}</body>
      </html>
    </GlobalProviders>
  );
}
