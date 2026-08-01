import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Check, Copy, Link as LinkIcon, QrCode } from 'lucide-react'

export default function PaymentUrlCard({ url }) {
    const [copied, setCopied] = useState(false)

    async function handleCopy() {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <Card className="border-primary/20 shadow-sm overflow-hidden bg-gradient-to-b from-background to-muted/20">
            <CardHeader className="bg-primary/5 border-b border-primary/10 pb-4">
                <div className="flex items-center gap-2">
                    <div className="bg-primary text-primary-foreground p-1.5 rounded-md">
                        <QrCode className="size-4" />
                    </div>
                    <CardTitle className="text-lg">Realizar Pago</CardTitle>
                </div>
                <CardDescription>
                    Escanea el código QR con una wallet compatible de Open Payments o copia la URL.
                </CardDescription>
            </CardHeader>

            <CardContent className="px-6 sm:px-8 py-8 grid gap-8">
                <div className="flex flex-col items-center justify-center">
                    <div className="p-4 bg-white rounded-xl shadow-sm border border-border inline-flex">
                        <QRCodeSVG value={url} size={180} level="Q" />
                    </div>
                </div>

                <div className="grid gap-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                        <LinkIcon className="size-4 text-muted-foreground" />
                        URL de pago
                    </label>
                    <div className="flex gap-2">
                        <Input
                            readOnly
                            value={url}
                            className="font-mono text-xs sm:text-sm bg-background"
                            onClick={(e) => e.target.select()}
                        />
                        <Button
                            size="icon"
                            variant={copied ? "default" : "outline"}
                            onClick={handleCopy}
                            title="Copiar URL"
                            className={`transition-colors shrink-0 ${copied ? 'bg-emerald-600 hover:bg-emerald-700' : ''}`}
                        >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
