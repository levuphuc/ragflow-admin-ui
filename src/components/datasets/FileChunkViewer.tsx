import { useState } from "react"
import { ArrowLeft, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface FileItem {
  id: string
  name: string
  size: string
  uploadDate: string
  enabled: boolean
  chunkNumber: number
  parseType: string
  status: string
}

interface Chunk {
  id: string
  content: string
  enabled: boolean
  position: number
}

interface FileChunkViewerProps {
  file: FileItem
  onBack: () => void
}

export function FileChunkViewer({ file, onBack }: FileChunkViewerProps) {
  const [viewMode, setViewMode] = useState<"full" | "ellipsis">("ellipsis")
  
  // Mock original content
  const originalContent = `# ${file.name}

## Nội dung gốc của tài liệu

Đây là nội dung markdown hoặc plaintext được trích xuất từ file gốc.

### Đoạn 1
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

### Đoạn 2
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

### Đoạn 3
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`

  // Mock chunks
  const chunks: Chunk[] = Array.from({ length: file.chunkNumber }, (_, i) => ({
    id: `chunk-${i + 1}`,
    content: `Đây là nội dung của chunk ${i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
    enabled: true,
    position: i + 1
  }))

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại
          </Button>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-xl font-bold">{file.name}</h2>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">View:</span>
            <Button
              variant={viewMode === "full" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("full")}
            >
              Full Text
            </Button>
            <Button
              variant={viewMode === "ellipsis" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("ellipsis")}
            >
              Ellipsis
            </Button>
          </div>
          <Badge variant="secondary">
            Total: {chunks.length} chunks
          </Badge>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-2 gap-4">
        {/* Left: Original Content */}
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Nội dung gốc</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-300px)]">
              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-wrap text-sm">{originalContent}</pre>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Right: Chunk Results */}
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Chunk Results</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-300px)]">
              <div className="space-y-3">
                {chunks.map((chunk) => (
                  <Card key={chunk.id} className="bg-muted/30">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <Badge variant="outline" className="text-xs">
                          #{chunk.position}
                        </Badge>
                        <Switch checked={chunk.enabled} />
                      </div>
                      <p className={`text-sm ${viewMode === "ellipsis" ? "line-clamp-3" : ""}`}>
                        {chunk.content}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
