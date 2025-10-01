import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface RetrievalResult {
  id: string
  content: string
  score: number
  source: string
  chunkId: string
}

export function DatasetRetrievalTab() {
  const [testText, setTestText] = useState("")
  const [similarityThreshold, setSimilarityThreshold] = useState([0.7])
  const [vectorWeight, setVectorWeight] = useState([0.5])
  const [useKnowledgeGraph, setUseKnowledgeGraph] = useState(false)
  const [results, setResults] = useState<RetrievalResult[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleTest = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setResults([
        {
          id: "1",
          content: "Phật giáo là một tôn giáo và triết học phát nguồn từ tiểu lục địa Ấn Độ, được sáng lập bởi Đức Phật Thích-ca Mâu-ni vào khoảng thế kỷ 6-5 TCN...",
          score: 0.95,
          source: "kinh_trung_bo_tap_1.pdf",
          chunkId: "chunk-12"
        },
        {
          id: "2",
          content: "Tứ Diệu Đế là giáo lý cơ bản của Phật giáo, bao gồm: Khổ Đế, Tập Đế, Diệt Đế và Đạo Đế. Đây là nền tảng của con đường giải thoát...",
          score: 0.87,
          source: "giao_ly_phat_giao_co_ban.docx",
          chunkId: "chunk-5"
        },
        {
          id: "3",
          content: "Bát Chánh Đạo là con đường tu tập gồm 8 yếu tố: Chánh Kiến, Chánh Tư Duy, Chánh Ngữ, Chánh Nghiệp, Chánh Mạng, Chánh Tinh Tấn, Chánh Niệm, Chánh Định.",
          score: 0.82,
          source: "kinh_trung_bo_tap_1.pdf",
          chunkId: "chunk-23"
        }
      ])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Test Settings */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle>Test Settings</CardTitle>
          <CardDescription>
            Cấu hình các tham số để kiểm thử retrieval
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Similarity Threshold</Label>
            <div className="flex items-center gap-4">
              <Slider
                value={similarityThreshold}
                onValueChange={setSimilarityThreshold}
                min={0}
                max={1}
                step={0.01}
                className="flex-1"
              />
              <span className="text-sm font-medium w-12 text-right">
                {similarityThreshold[0].toFixed(2)}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Vector Similarity Weight</Label>
            <div className="flex items-center gap-4">
              <Slider
                value={vectorWeight}
                onValueChange={setVectorWeight}
                min={0}
                max={1}
                step={0.1}
                className="flex-1"
              />
              <span className="text-sm font-medium w-12 text-right">
                {vectorWeight[0].toFixed(1)}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rerank-model">Rerank Model (Optional)</Label>
            <Select>
              <SelectTrigger id="rerank-model">
                <SelectValue placeholder="Select rerank model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="bge-reranker">BGE Reranker</SelectItem>
                <SelectItem value="cohere-rerank">Cohere Rerank</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="knowledge-graph">Use Knowledge Graph</Label>
            <Switch
              id="knowledge-graph"
              checked={useKnowledgeGraph}
              onCheckedChange={setUseKnowledgeGraph}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="language">Cross-language Search</Label>
            <Select defaultValue="vi">
              <SelectTrigger id="language">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vi">Tiếng Việt</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="zh">中文</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="test-text">Test Text</Label>
            <Textarea
              id="test-text"
              placeholder="Nhập câu hỏi hoặc nội dung để test retrieval..."
              value={testText}
              onChange={(e) => setTestText(e.target.value)}
              rows={4}
            />
          </div>

          <Button 
            onClick={handleTest} 
            variant="admin" 
            className="w-full"
            disabled={!testText || isLoading}
          >
            <Search className="h-4 w-4 mr-2" />
            {isLoading ? "Testing..." : "Testing"}
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle>Kết quả Retrieval</CardTitle>
          <CardDescription>
            {results.length > 0 
              ? `Tìm thấy ${results.length} kết quả phù hợp`
              : "Chưa có kết quả. Nhập test text và nhấn Testing."
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {results.map((result) => (
              <Card key={result.id} className="bg-muted/30">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">
                        Score: {result.score.toFixed(2)}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {result.chunkId}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm mb-3">{result.content}</p>
                  <div className="text-xs text-muted-foreground">
                    Source: <span className="font-medium">{result.source}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
