import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, RefreshCw, Lock } from "lucide-react"

interface DummyBrowserProps {
  url?: string
  children: React.ReactNode
  onUrlChange?: (url: string) => void
}

export default function DummyBrowser({ url = "https://example.com", children, onUrlChange }: DummyBrowserProps) {
  const [displayUrl, setDisplayUrl] = useState(url)
  const [isEditing, setIsEditing] = useState(false)

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayUrl(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Format the URL if needed
    let formattedUrl = displayUrl
    if (formattedUrl && !/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = `https://${formattedUrl}`
      setDisplayUrl(formattedUrl)
    }

    // Call the onUrlChange callback if provided
    if (onUrlChange) {
      onUrlChange(formattedUrl)
    }

    setIsEditing(false)
  }

  return (
    <Card className="w-full m-4 max-w-5xl mx-auto overflow-hidden border shadow-lg bg-gray-100">
      <CardHeader className="p-2 border-b bg-muted/40">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" aria-label="Go back">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Go forward">
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Refresh">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 flex items-center">
            <div className="relative w-full flex items-center bg-background rounded-md border border-black px-3 py-1">
              {!isEditing && <Lock className="h-3 w-3 text-green-600 mr-1 flex-shrink-0" />}
              {isEditing ? (
                <Input
                  type="text"
                  value={displayUrl}
                  onChange={handleUrlChange}
                  onBlur={() => setIsEditing(false)}
                  className="border-0 p-0 h-7 focus-visible:ring-0 focus-visible:ring-offset-0"
                  autoFocus
                />
              ) : (
                <div
                  className="text-sm truncate cursor-text w-full h-7 flex items-center"
                  onClick={() => setIsEditing(true)}
                >
                  {displayUrl}
                </div>
              )}
            </div>
          </form>
        </div>
      </CardHeader>

      <CardContent className="p-0 bg-white">
        <div className="browser-content">{children}</div>
      </CardContent>
    </Card>
  )
}

