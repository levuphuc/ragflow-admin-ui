import { useState } from "react"
import { 
  ArrowLeft, 
  FileText, 
  Settings, 
  Activity, 
  Upload, 
  Download, 
  Trash2, 
  RefreshCw,
  Eye,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StatusBadge } from "@/components/ui/status-badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Dataset {
  id: string
  name: string
  description: string
  domain: string
  files: number
  size: string
  status: "indexed" | "processing" | "failed"
  lastUpdated: string
  chatbots: number
  tags: string[]
}

interface FileItem {
  id: string
  name: string
  size: string
  type: string
  uploadedAt: string
  status: "indexed" | "processing" | "failed"
  chunks: number
}

interface DatasetDetailViewProps {
  dataset: Dataset
  onBack: () => void
  onUpdateDataset: (dataset: Dataset) => void
}

export function DatasetDetailView({ dataset, onBack, onUpdateDataset }: DatasetDetailViewProps) {
  const [activeTab, setActiveTab] = useState("files")
  const [editMode, setEditMode] = useState(false)
  const [editedDataset, setEditedDataset] = useState(dataset)

  // Mock files data
  const files: FileItem[] = [
    {
      id: "f1",
      name: "kinh_trung_bo_tap_1.pdf",
      size: "2.4 MB",
      type: "PDF",
      uploadedAt: "2024-01-15 14:30",
      status: "indexed",
      chunks: 45
    },
    {
      id: "f2", 
      name: "giao_ly_phat_giao_co_ban.docx",
      size: "1.8 MB",
      type: "DOCX",
      uploadedAt: "2024-01-14 09:15",
      status: "processing",
      chunks: 0
    },
    {
      id: "f3",
      name: "thien_hoc_nhap_mon.txt", 
      size: "856 KB",
      type: "TXT",
      uploadedAt: "2024-01-13 16:45",
      status: "failed",
      chunks: 0
    }
  ]

  const handleSaveChanges = () => {
    onUpdateDataset(editedDataset)
    setEditMode(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "indexed":
        return <CheckCircle className="h-4 w-4 text-success" />
      case "processing":
        return <Clock className="h-4 w-4 text-warning animate-spin" />
      case "failed":
        return <AlertCircle className="h-4 w-4 text-destructive" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{dataset.name}</h1>
          <p className="text-muted-foreground">{dataset.description}</p>
        </div>
        <StatusBadge status={dataset.status}>
          {dataset.status === "indexed" ? "Indexed" :
           dataset.status === "processing" ? "Processing" : "Failed"}
        </StatusBadge>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="files">
            <FileText className="h-4 w-4 mr-2" />
            Files ({files.length})
          </TabsTrigger>
          <TabsTrigger value="indexing">
            <Activity className="h-4 w-4 mr-2" />
            Indexing Status
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>

        {/* Files Tab */}
        <TabsContent value="files" className="space-y-4">
          <Card className="bg-gradient-card shadow-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Danh sách Files</CardTitle>
                <CardDescription>
                  Quản lý các tệp trong dataset này
                </CardDescription>
              </div>
              <Button variant="admin">
                <Upload className="h-4 w-4 mr-2" />
                Thêm File
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tên File</TableHead>
                    <TableHead>Loại</TableHead>
                    <TableHead>Kích thước</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Chunks</TableHead>
                    <TableHead>Upload</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {files.map((file) => (
                    <TableRow key={file.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{file.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{file.type}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {file.size}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(file.status)}
                          <StatusBadge status={file.status}>
                            {file.status === "indexed" ? "Indexed" :
                             file.status === "processing" ? "Processing" : "Failed"}
                          </StatusBadge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{file.chunks}</span>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {file.uploadedAt}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              •••
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              Xem trước
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" />
                              Tải xuống
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <RefreshCw className="h-4 w-4 mr-2" />
                              Re-process
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Xóa
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
        </TabsContent>

        {/* Indexing Status Tab */}
        <TabsContent value="indexing" className="space-y-4">
          <Card className="bg-gradient-card shadow-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Trạng thái Indexing</CardTitle>
                <CardDescription>
                  Theo dõi quá trình vector hóa dữ liệu
                </CardDescription>
              </div>
              <Button variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Force Re-index
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-success">3</div>
                  <div className="text-sm text-muted-foreground">Indexed</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-warning">1</div>
                  <div className="text-sm text-muted-foreground">Processing</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-destructive">1</div>
                  <div className="text-sm text-muted-foreground">Failed</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold">45</div>
                  <div className="text-sm text-muted-foreground">Total Chunks</div>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h3 className="font-medium">Error Logs</h3>
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-destructive mt-0.5" />
                    <div className="flex-1">
                      <div className="font-medium text-destructive">File processing failed</div>
                      <div className="text-sm text-muted-foreground">
                        thien_hoc_nhap_mon.txt - Invalid encoding detected
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        2024-01-13 16:47:23
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle>Cài đặt Dataset</CardTitle>
              <CardDescription>
                Chỉnh sửa thông tin và cấu hình dataset
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {editMode ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name">Tên Dataset</Label>
                    <Input
                      id="edit-name"
                      value={editedDataset.name}
                      onChange={(e) => setEditedDataset({
                        ...editedDataset,
                        name: e.target.value
                      })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="edit-description">Mô tả</Label>
                    <Textarea
                      id="edit-description"
                      value={editedDataset.description}
                      onChange={(e) => setEditedDataset({
                        ...editedDataset,
                        description: e.target.value
                      })}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Tags</Label>
                    <div className="flex flex-wrap gap-2">
                      {editedDataset.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleSaveChanges}>
                      Lưu thay đổi
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setEditMode(false)
                        setEditedDataset(dataset)
                      }}
                    >
                      Hủy
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label>Tên Dataset</Label>
                    <div className="mt-1 font-medium">{dataset.name}</div>
                  </div>
                  
                  <div>
                    <Label>Mô tả</Label>
                    <div className="mt-1 text-muted-foreground">{dataset.description}</div>
                  </div>

                  <div>
                    <Label>Tags</Label>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {dataset.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Domain</Label>
                    <div className="mt-1">
                      <Badge variant="outline">{dataset.domain}</Badge>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button onClick={() => setEditMode(true)}>
                      Chỉnh sửa
                    </Button>
                    <Button variant="destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Xóa Dataset
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}