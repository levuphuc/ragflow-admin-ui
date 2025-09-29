import { useState } from "react"
import { 
  Search, 
  Filter, 
  MoreVertical, 
  RefreshCw, 
  Eye, 
  Edit,
  FileText,
  Trash2,
  AlertCircle,
  Calendar,
  Database
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import { Badge } from "@/components/ui/badge"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CreateDatasetModal } from "@/components/datasets/CreateDatasetModal"
import { DatasetDetailView } from "@/components/datasets/DatasetDetailView"
import { useToast } from "@/hooks/use-toast"

interface Dataset {
  id: string
  name: string
  description: string
  domain: string
  files: number
  size: string
  status: "indexed" | "processing" | "failed"
  lastUpdated: string
  createdAt: string
  chatbots: number
  tags: string[]
  chunks?: number
  totalChunks?: number
}

export default function Datasets() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null)
  const [datasets, setDatasets] = useState<Dataset[]>([
    {
      id: "ds-001",
      name: "Phật học cơ bản",
      description: "Tập dữ liệu về giáo lý Phật giáo cơ bản và thiền học",
      domain: "Religion",
      files: 12,
      size: "2.4 GB",
      status: "indexed" as const,
      lastUpdated: "2024-01-15",
      createdAt: "2024-01-10",
      chatbots: 3,
      tags: ["phật học", "tôn giáo", "triết học", "thiền"],
      chunks: 245,
      totalChunks: 245
    },
    {
      id: "ds-002", 
      name: "Văn học Việt Nam",
      description: "Bộ sưu tập tác phẩm văn học Việt Nam qua các thời kỳ",
      domain: "Literature",
      files: 45,
      size: "8.2 GB", 
      status: "processing" as const,
      lastUpdated: "2024-01-14",
      createdAt: "2024-01-08",
      chatbots: 1,
      tags: ["văn học", "việt nam", "thơ ca", "tiểu thuyết"],
      chunks: 156,
      totalChunks: 380
    },
    {
      id: "ds-003",
      name: "Lịch sử thế giới",
      description: "Tài liệu lịch sử các nền văn minh từ cổ đại đến hiện đại",
      domain: "History",
      files: 28,
      size: "5.1 GB",
      status: "failed" as const,
      lastUpdated: "2024-01-13",
      createdAt: "2024-01-05",
      chatbots: 0,
      tags: ["lịch sử", "văn minh", "thế giới", "cổ đại"],
      chunks: 0,
      totalChunks: 0
    },
    {
      id: "ds-004",
      name: "Khoa học tự nhiên",
      description: "Kiến thức cơ bản về vật lý, hóa học và sinh học",
      domain: "Science",
      files: 67,
      size: "12.3 GB",
      status: "indexed" as const,
      lastUpdated: "2024-01-12",
      createdAt: "2024-01-01",
      chatbots: 5,
      tags: ["khoa học", "vật lý", "hóa học", "sinh học"],
      chunks: 892,
      totalChunks: 892
    },
    {
      id: "ds-005",
      name: "Y học cổ truyền",
      description: "Tài liệu về y học cổ truyền Việt Nam và châu Á",
      domain: "Medicine",
      files: 23,
      size: "3.8 GB",
      status: "indexed" as const,
      lastUpdated: "2024-01-11",
      createdAt: "2024-01-03",
      chatbots: 2,
      tags: ["y học", "cổ truyền", "thảo dược", "châu á"],
      chunks: 178,
      totalChunks: 178
    }
  ])

  const { toast } = useToast()

  const filteredDatasets = datasets.filter(dataset =>
    dataset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dataset.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dataset.tags.some(tag => tag.includes(searchTerm.toLowerCase()))
  )

  const handleCreateDataset = (newDatasetData: {
    name: string
    description: string
    tags: string[]
  }) => {
    const newDataset: Dataset = {
      id: `ds-${String(datasets.length + 1).padStart(3, '0')}`,
      ...newDatasetData,
      domain: "Custom", // This could be determined from tags or user selection
      files: 0,
      size: "0 MB",
      status: "indexed",
      lastUpdated: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString().split('T')[0],
      chatbots: 0,
      chunks: 0,
      totalChunks: 0
    }
    
    setDatasets([newDataset, ...datasets])
    toast({
      title: "Dataset đã được tạo",
      description: `Dataset "${newDataset.name}" đã được tạo thành công.`,
    })
  }

  const handleUpdateDataset = (updatedDataset: Dataset) => {
    setDatasets(datasets.map(ds => 
      ds.id === updatedDataset.id ? updatedDataset : ds
    ))
    toast({
      title: "Dataset đã được cập nhật",
      description: `Thông tin dataset đã được lưu thành công.`,
    })
  }

  const handleReIndex = (datasetId: string) => {
    setDatasets(datasets.map(ds => 
      ds.id === datasetId ? { ...ds, status: "processing" as const } : ds
    ))
    toast({
      title: "Bắt đầu re-index",
      description: "Dataset đang được xử lý lại...",
    })
  }

  const handleDeleteDataset = (datasetId: string) => {
    setDatasets(datasets.filter(ds => ds.id !== datasetId))
    toast({
      title: "Dataset đã được xóa",
      description: "Dataset đã được xóa khỏi hệ thống.",
      variant: "destructive"
    })
  }

  // If viewing dataset detail
  if (selectedDataset) {
    return (
      <DatasetDetailView
        dataset={selectedDataset}
        onBack={() => setSelectedDataset(null)}
        onUpdateDataset={handleUpdateDataset}
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Datasets</h1>
          <p className="text-muted-foreground">
            Quản lý tập dữ liệu phục vụ RAG - {datasets.length} dataset tổng cộng
          </p>
        </div>
        <CreateDatasetModal onCreateDataset={handleCreateDataset} />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-success" />
              <div>
                <div className="text-2xl font-bold">
                  {datasets.filter(d => d.status === "indexed").length}
                </div>
                <div className="text-xs text-muted-foreground">Indexed</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4 text-warning" />
              <div>
                <div className="text-2xl font-bold">
                  {datasets.filter(d => d.status === "processing").length}
                </div>
                <div className="text-xs text-muted-foreground">Processing</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <div>
                <div className="text-2xl font-bold">
                  {datasets.filter(d => d.status === "failed").length}
                </div>
                <div className="text-xs text-muted-foreground">Failed</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              <div>
                <div className="text-2xl font-bold">
                  {datasets.reduce((sum, d) => sum + d.files, 0)}
                </div>
                <div className="text-xs text-muted-foreground">Total Files</div>
              </div>
            </div>
          </CardContent>
        </Card>
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
          {filteredDatasets.length === 0 ? (
            <div className="text-center py-12">
              <Database className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Chưa có dataset nào</h3>
              <p className="text-muted-foreground mb-4">
                Bắt đầu bằng cách tạo một bộ tri thức cho chatbot của bạn
              </p>
              <CreateDatasetModal onCreateDataset={handleCreateDataset} />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên Dataset</TableHead>
                  <TableHead>Domain</TableHead>
                  <TableHead>Files / Chunks</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Chatbots</TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Ngày tạo
                    </div>
                  </TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDatasets.map((dataset) => (
                  <TableRow 
                    key={dataset.id} 
                    className="hover:bg-muted/50 cursor-pointer"
                    onClick={() => setSelectedDataset(dataset)}
                  >
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{dataset.name}</div>
                        <div className="text-sm text-muted-foreground line-clamp-1">
                          {dataset.description}
                        </div>
                        <div className="flex gap-1">
                          {dataset.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {dataset.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{dataset.tags.length - 3}
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
                        <div className="flex items-center gap-2">
                          <FileText className="h-3 w-3 text-muted-foreground" />
                          <span className="font-medium">{dataset.files} files</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {dataset.chunks || 0} / {dataset.totalChunks || 0} chunks
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {dataset.size}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={dataset.status}>
                        {dataset.status === "indexed" ? "Indexed" :
                         dataset.status === "processing" ? "Processing" : "Failed"}
                      </StatusBadge>
                      {dataset.status === "processing" && (
                        <div className="text-xs text-muted-foreground mt-1">
                          {Math.round((dataset.chunks || 0) / (dataset.totalChunks || 1) * 100)}% hoàn thành
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{dataset.chatbots}</span>
                        {dataset.chatbots > 0 && (
                          <Badge variant="secondary" className="text-xs">
                            đang dùng
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      <div>{dataset.createdAt}</div>
                      <div className="text-xs">
                        Cập nhật: {dataset.lastUpdated}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={(e) => {
                            e.stopPropagation()
                            setSelectedDataset(dataset)
                          }}>
                            <Eye className="h-4 w-4 mr-2" />
                            Xem chi tiết
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => {
                            e.stopPropagation()
                            setSelectedDataset(dataset)
                          }}>
                            <Edit className="h-4 w-4 mr-2" />
                            Chỉnh sửa
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => {
                            e.stopPropagation()
                            handleReIndex(dataset.id)
                          }}>
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Re-index
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-destructive"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteDataset(dataset.id)
                            }}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Xóa dataset
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}