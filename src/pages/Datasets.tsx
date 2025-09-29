import { useState } from "react"
import { Plus, Search, Filter, MoreVertical, RefreshCw, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import { Badge } from "@/components/ui/badge"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function Datasets() {
  const [searchTerm, setSearchTerm] = useState("")

  const datasets = [
    {
      id: "ds-001",
      name: "Phật học cơ bản",
      description: "Tập dữ liệu về giáo lý Phật giáo cơ bản",
      domain: "Religion",
      files: 12,
      size: "2.4 GB",
      status: "indexed" as const,
      lastUpdated: "2024-01-15",
      chatbots: 3,
      tags: ["phật học", "tôn giáo", "triết học"]
    },
    {
      id: "ds-002", 
      name: "Văn học Việt Nam",
      description: "Bộ sưu tập tác phẩm văn học Việt Nam",
      domain: "Literature",
      files: 45,
      size: "8.2 GB", 
      status: "processing" as const,
      lastUpdated: "2024-01-14",
      chatbots: 1,
      tags: ["văn học", "việt nam", "thơ ca"]
    },
    {
      id: "ds-003",
      name: "Lịch sử thế giới",
      description: "Tài liệu lịch sử các nền văn minh",
      domain: "History",
      files: 28,
      size: "5.1 GB",
      status: "failed" as const,
      lastUpdated: "2024-01-13",
      chatbots: 0,
      tags: ["lịch sử", "văn minh", "thế giới"]
    },
    {
      id: "ds-004",
      name: "Khoa học tự nhiên",
      description: "Kiến thức cơ bản về vật lý, hóa học",
      domain: "Science",
      files: 67,
      size: "12.3 GB",
      status: "indexed" as const,
      lastUpdated: "2024-01-12",
      chatbots: 5,
      tags: ["khoa học", "vật lý", "hóa học"]
    }
  ]

  const filteredDatasets = datasets.filter(dataset =>
    dataset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dataset.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dataset.tags.some(tag => tag.includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Datasets</h1>
          <p className="text-muted-foreground">
            Quản lý tập dữ liệu phục vụ RAG
          </p>
        </div>
        <Button variant="admin" className="md:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Tạo Dataset mới
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-gradient-card shadow-card">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm dataset, domain, tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Bộ lọc
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Datasets Table */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Tất cả Datasets</CardTitle>
              <CardDescription>
                {filteredDatasets.length} dataset được tìm thấy
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Làm mới
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên Dataset</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>Files</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Chatbots</TableHead>
                <TableHead>Cập nhật</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDatasets.map((dataset) => (
                <TableRow key={dataset.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{dataset.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {dataset.description}
                      </div>
                      <div className="flex gap-1">
                        {dataset.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {dataset.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{dataset.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{dataset.domain}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{dataset.files} files</div>
                      <div className="text-sm text-muted-foreground">
                        {dataset.size}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={dataset.status}>
                      {dataset.status === "indexed" ? "Indexed" :
                       dataset.status === "processing" ? "Processing" : "Failed"}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{dataset.chatbots}</span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {dataset.lastUpdated}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          Xem chi tiết
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Re-index
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Xóa dataset
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}