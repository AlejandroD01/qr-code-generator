"use client"
import { QRCodeGenerator } from "@/components/qr-code-generator"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster" // Adjust the import path as necessary

export default function Home() {
  const toast = useToast()

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/50 flex flex-col items-center justify-center p-4 md:p-8">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">QR Code Generator</h1>
          <p className="text-muted-foreground text-lg md:text-xl">Create, customize, and share QR codes in seconds</p>
        </div>

        <QRCodeGenerator />
      </div>
      <Toaster />
    </main>
  )
}