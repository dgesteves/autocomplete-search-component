import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ApolloClientProvider } from "@/services/ApolloClientProvider";
import { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Autocomplete",
  description: "Autocomplete search component",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </ApolloClientProvider>
      </body>
    </html>
  );
}
