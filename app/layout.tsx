import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quote Assessment | Fulcrum",
  description: "Complete our assessment to receive a personalized quote for your operational needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon-32x32.png" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
