import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Local AI Agent - Create Philosophical Quote Videos",
  description: "AI-powered platform for creating philosophical quote videos with automated background generation, music composition, and social media scheduling.",
  keywords: ["AI", "philosophy", "quotes", "video generation", "social media", "automation"],
  authors: [{ name: "Z.ai Team" }],
  openGraph: {
    title: "Local AI Agent",
    description: "Create philosophical quote videos with AI",
    url: "https://chat.z.ai",
    siteName: "Local AI Agent",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Local AI Agent",
    description: "Create philosophical quote videos with AI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
