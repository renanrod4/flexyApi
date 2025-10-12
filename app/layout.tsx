import type { Metadata } from "next";
import "./globals.css";

// import { Geist_Mono, Lora } from 'next/font/google'
 
// const geist = Geist_Mono({
//   subsets: ['latin'],
//   variable: '--font-geist-mono',

// })

// const lora = Lora({
//   subsets: ['latin'],
//   variable: '--font-lora',
// })

// `${geist.variable}${lora.variable}`


export const metadata: Metadata = {
  title: "Flexy API",
  description: "Flexy API is a AI-powered API that returns anything you ask for, in perfectly structured JSON format.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
