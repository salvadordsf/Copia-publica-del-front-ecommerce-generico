import GlobalProviders from "./provider";
import "@/styles/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GlobalProviders>
      <html lang="es">
        <body>{children}</body>
      </html>
    </GlobalProviders>
  );
}
