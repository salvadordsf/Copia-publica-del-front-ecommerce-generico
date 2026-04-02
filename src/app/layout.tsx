import GlobalProviders from "./provider";
import "@/styles/globals.css";
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GlobalProviders>
      <html lang="es">
        <body className={outfit.variable}>
          {children}
          </body>
      </html>
    </GlobalProviders>
  );
}
