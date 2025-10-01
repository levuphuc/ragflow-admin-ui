import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export function DatasetConfigTab() {
  const [useRaptor, setUseRaptor] = useState(false)
  const [useKnowledgeGraph, setUseKnowledgeGraph] = useState(false)
  const [chunkSize, setChunkSize] = useState([512])
  const [maxToken, setMaxToken] = useState([2048])
  const [threshold, setThreshold] = useState([0.78])
  const [maxCluster, setMaxCluster] = useState([10])
  const [autoKeyword, setAutoKeyword] = useState([1])
  const [autoQuestion, setAutoQuestion] = useState([1])

  return (
    <Tabs defaultValue="general" className="space-y-4">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="chunk">Chunk Method</TabsTrigger>
      </TabsList>

      {/* General Tab */}
      <TabsContent value="general" className="space-y-4">
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle>Cài đặt chung</CardTitle>
            <CardDescription>
              Thông tin cơ bản về dataset
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Tên dataset" defaultValue="Phật học cơ bản" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="avatar">Avatar</Label>
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center">
                  <span className="text-2xl">📚</span>
                </div>
                <Button variant="outline" size="sm">Upload (Max 4MB)</Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Mô tả dataset..."
                rows={3}
                defaultValue="Tập tri thức về Phật học cơ bản, bao gồm các kinh điển và giáo lý"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="permissions">Permissions</Label>
              <Select defaultValue="only-me">
                <SelectTrigger id="permissions">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="only-me">Only me</SelectItem>
                  <SelectItem value="org">Organization</SelectItem>
                  <SelectItem value="public">Public</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button variant="admin">Lưu thay đổi</Button>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Chunk Method Tab */}
      <TabsContent value="chunk" className="space-y-4">
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle>Chunking Configuration</CardTitle>
            <CardDescription>
              Cấu hình phương pháp chia nhỏ và xử lý văn bản
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Chunking Settings */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="chunking-method">Chunking Method</Label>
                <Select defaultValue="general">
                  <SelectTrigger id="chunking-method">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="metadata">Metadata</SelectItem>
                    <SelectItem value="qa">QA</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pdf-parser">PDF Parser</Label>
                <Select defaultValue="deepdoc">
                  <SelectTrigger id="pdf-parser">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="deepdoc">DeepDoc</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="embedding-model">Embedding Model</Label>
                <Select defaultValue="text-embedding-3-large">
                  <SelectTrigger id="embedding-model">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text-embedding-3-large">text-embedding-3-large</SelectItem>
                    <SelectItem value="text-embedding-3-small">text-embedding-3-small</SelectItem>
                    <SelectItem value="text-embedding-ada-002">text-embedding-ada-002</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Recommended Chunk Size</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    value={chunkSize}
                    onValueChange={setChunkSize}
                    min={128}
                    max={2048}
                    step={128}
                    className="flex-1"
                  />
                  <span className="text-sm font-medium w-16 text-right">
                    {chunkSize[0]}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="delimiter">Delimiter for Text</Label>
                <Input 
                  id="delimiter" 
                  placeholder="\n" 
                  defaultValue="\n"
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="page-rank">Page Rank</Label>
                <Switch id="page-rank" />
              </div>

              <div className="space-y-2">
                <Label>Auto-keyword</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    value={autoKeyword}
                    onValueChange={setAutoKeyword}
                    min={0}
                    max={10}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-sm font-medium w-12 text-right">
                    {autoKeyword[0]}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Auto-question</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    value={autoQuestion}
                    onValueChange={setAutoQuestion}
                    min={0}
                    max={10}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-sm font-medium w-12 text-right">
                    {autoQuestion[0]}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="excel-html">Excel to HTML</Label>
                <Switch id="excel-html" />
              </div>

              <div className="space-y-2">
                <Label>Tag Sets</Label>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Phật học</Badge>
                  <Badge variant="secondary">Kinh điển</Badge>
                  <Badge variant="secondary">Triết học</Badge>
                  <Button variant="outline" size="sm">+ Add Tag</Button>
                </div>
              </div>
            </div>

            {/* RAPTOR Settings */}
            <div className="border-t pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="use-raptor" className="text-base">Use RAPTOR to enhance retrieval</Label>
                  <p className="text-sm text-muted-foreground">
                    Cải thiện khả năng truy xuất bằng hierarchical clustering
                  </p>
                </div>
                <Switch 
                  id="use-raptor" 
                  checked={useRaptor}
                  onCheckedChange={setUseRaptor}
                />
              </div>

              {useRaptor && (
                <div className="space-y-4 pl-4 border-l-2">
                  <div className="space-y-2">
                    <Label htmlFor="raptor-prompt">Prompt</Label>
                    <Textarea 
                      id="raptor-prompt" 
                      placeholder="Nhập prompt cho RAPTOR..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Max Token</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={maxToken}
                        onValueChange={setMaxToken}
                        min={512}
                        max={4096}
                        step={256}
                        className="flex-1"
                      />
                      <span className="text-sm font-medium w-16 text-right">
                        {maxToken[0]}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Threshold</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={threshold}
                        onValueChange={setThreshold}
                        min={0}
                        max={1}
                        step={0.01}
                        className="flex-1"
                      />
                      <span className="text-sm font-medium w-16 text-right">
                        {threshold[0].toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Max Cluster</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={maxCluster}
                        onValueChange={setMaxCluster}
                        min={1}
                        max={50}
                        step={1}
                        className="flex-1"
                      />
                      <span className="text-sm font-medium w-16 text-right">
                        {maxCluster[0]}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="random-seed">Random Seed</Label>
                    <Input 
                      id="random-seed" 
                      type="number" 
                      defaultValue="0"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Knowledge Graph */}
            <div className="border-t pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="knowledge-graph" className="text-base">Extract Knowledge Graph</Label>
                  <p className="text-sm text-muted-foreground">
                    Trích xuất knowledge graph từ văn bản
                  </p>
                </div>
                <Switch 
                  id="knowledge-graph"
                  checked={useKnowledgeGraph}
                  onCheckedChange={setUseKnowledgeGraph}
                />
              </div>
            </div>

            <Button variant="admin" className="w-full">Lưu cấu hình</Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
