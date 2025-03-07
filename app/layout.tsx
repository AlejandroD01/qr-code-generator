import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "QR Code Generator",
  description: "Create, customize, and share QR codes in seconds",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        {/* <link rel="icon" href="/favicon.ico" /> */}
        <link rel="icon" href="./favicon.ico" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}



import './globals.css'