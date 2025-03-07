"use client"

import { useState, useRef } from "react"
import { QRCodeCanvas } from "qrcode.react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Card } from "@/components/ui/card"
import { Loader2, Download, Share2, Link, MessageSquare, Mail, QrCode } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster" // Adjust the import path as necessary

export function QRCodeGenerator() {
  const [input, setInput] = useState("")
  const [qrValue, setQrValue] = useState("")
  const [size, setSize] = useState(200)
  const [bgColor, setBgColor] = useState("#c0c0c0")
  const [fgColor, setFgColor] = useState("#1f1f1f")
  const [includeMargin, setIncludeMargin] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeTab, setActiveTab] = useState("text")
  const qrRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const handleGenerate = () => {
    if (!input.trim()) {
      toast({
        title: "Input required",
        description: "Please enter some text or a URL to generate a QR code.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    // Simulate processing time
    setTimeout(() => {
      setQrValue(input)
      setIsGenerating(false)
      toast({
        title: "QR Code generated!",
        description: "Your QR code has been created successfully.",
      })
    }, 500)
  }

  const handleDownload = () => {
    if (!qrValue) return

    const canvas = document.querySelector("canvas")
    if (!canvas) return

    const url = canvas.toDataURL("image/png")
    const link = document.createElement("a")
    link.download = "qrcode.png"
    link.href = url
    link.click()

    toast({
      title: "QR Code downloaded!",
      description: "Your QR code has been saved as a PNG file.",
    })
  }

  const handleShare = async () => {
    if (!qrValue || !navigator.share) return

    try {
      const canvas = document.querySelector("canvas")
      if (!canvas) return

      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) resolve(blob)
        }, "image/png")
      })

      await navigator.share({
        title: "QR Code",
        text: "Check out this QR code I generated!",
        files: [new File([blob], "qrcode.png", { type: "image/png" })],
      })

      toast({
        title: "Shared successfully!",
        description: "Your QR code has been shared.",
      })
    } catch (error) {
      console.error("Error sharing:", error)
      toast({
        title: "Sharing failed",
        description: "Unable to share the QR code. Try downloading instead.",
        variant: "destructive",
      })
    }
  }

  const placeholderText = {
    text: "Enter text to encode in QR code",
    url: "Enter URL (e.g., https://example.com)",
    email: "Enter email address",
    phone: "Enter phone number",
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Create Your QR Code</h2>

          <Tabs defaultValue="text" value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="text" className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span className="hidden sm:inline">Text</span>
              </TabsTrigger>
              <TabsTrigger value="url" className="flex items-center gap-1">
                <Link className="h-4 w-4" />
                <span className="hidden sm:inline">URL</span>
              </TabsTrigger>
              <TabsTrigger value="email" className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                <span className="hidden sm:inline">Email</span>
              </TabsTrigger>
              <TabsTrigger value="phone" className="flex items-center gap-1">
                <QrCode className="h-4 w-4" />
                <span className="hidden sm:inline">Phone</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="text" className="mt-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="text-input">Text Content</Label>
                  <Input
                    id="text-input"
                    placeholder={placeholderText.text}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="url" className="mt-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="url-input">Website URL</Label>
                  <Input
                    id="url-input"
                    placeholder={placeholderText.url}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="email" className="mt-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-input">Email Address</Label>
                  <Input
                    id="email-input"
                    placeholder={placeholderText.email}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    type="email"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="phone" className="mt-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone-input">Phone Number</Label>
                  <Input
                    id="phone-input"
                    placeholder={placeholderText.phone}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    type="tel"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="size-slider">Size: {size}px</Label>
              </div>
              <Slider
                id="size-slider"
                min={100}
                max={400}
                step={10}
                value={[size]}
                onValueChange={(value) => setSize(value[0])}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bg-color">Background Color</Label>
                <div className="flex">
                  <Input
                    id="bg-color"
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-12 h-10 p-1"
                  />
                  <Input value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="flex-1 ml-2" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fg-color">Foreground Color</Label>
                <div className="flex">
                  <Input
                    id="fg-color"
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-12 h-10 p-1"
                  />
                  <Input value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="flex-1 ml-2" />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="margin-switch" checked={includeMargin} onCheckedChange={setIncludeMargin} />
              <Label htmlFor="margin-switch">Include Margin</Label>
            </div>

            <Button onClick={handleGenerate} className="w-full" disabled={isGenerating || !input.trim()}>
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate QR Code"
              )}
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Your QR Code</h2>

          <div
            ref={qrRef}
            className="flex flex-col items-center justify-center bg-muted/30 rounded-lg p-6 min-h-[300px]"
          >
            {qrValue ? (
              <div className="flex flex-col items-center">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <QRCodeCanvas
                    value={qrValue}
                    size={size}
                    bgColor={bgColor}
                    fgColor={fgColor}
                    level="H"
                    includeMargin={includeMargin}
                  />
                </div>

                <div className="mt-6 flex gap-4">
                  <Button onClick={handleDownload} variant="outline" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Download
                  </Button>

                  {typeof navigator.share === "function" && (
                    <Button onClick={handleShare} variant="outline" className="flex items-center gap-2">
                      <Share2 className="h-4 w-4" />
                      Share
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                <QrCode className="h-16 w-16 mx-auto mb-4 opacity-20" />
                <p>Your QR code will appear here</p>
                <p className="text-sm mt-2">Fill in the form and click Generate</p>
              </div>
            )}
          </div>
        </Card>
      </div>
      <Toaster />
    </>
  )
}

