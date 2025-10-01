import { useState } from "react"
import { Upload, FileText, Eye, Download, RefreshCw, Trash2, CheckCircle, Clock, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StatusBadge } from "@/components/ui/status-badge"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FileChunkViewer } from "./FileChunkViewer"

interface FileItem {
  id: string
  name: string
  size: string
  uploadDate: string
  enabled: boolean
  chunkNumber: number
  parseType: string
  status: "indexed" | "processing" | "failed"
}

interface DatasetFilesTabProps {
  datasetId: string
}

export function DatasetFilesTab({ datasetId }: DatasetFilesTabProps) {
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null)
  
  // Mock data
  const files: FileItem[] = [
    {
      id: "f1",
      name: "kinh_trung_bo_tap_1.pdf",
      size: "2.4 MB",
      uploadDate: "2024-01-15 14:30",
      enabled: true,
      chunkNumber: 45,
      parseType: "deepdoc",
      status: "indexed"
    },
    {
      id: "f2",
      name: "giao_ly_phat_giao_co_ban.docx",
      size: "1.8 MB",
      uploadDate: "2024-01-14 09:15",
      enabled: true,
      chunkNumber: 32,
      parseType: "general",
      status: "processing"
    },
    {
      id: "f3",
      name: "thien_hoc_nhap_mon.txt",
      size: "856 KB",
      uploadDate: "2024-01-13 16:45",
      enabled: false,
      chunkNumber: 0,
      parseType: "general",
      status: "failed"
    }
  ]

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

  if (selectedFile) {
    return (
      <FileChunkViewer 
        file={selectedFile} 
        onBack={() => setSelectedFile(null)} 
      />
    )
  }

  return (
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
              <TableHead>Upload Date</TableHead>
              <TableHead>Enable</TableHead>
              <TableHead>Chunk Number</TableHead>
              <TableHead>Parse</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.map((file) => (
              <TableRow key={file.id}>
                <TableCell>
                  <div 
                    className="flex items-center gap-2 cursor-pointer hover:text-primary"
                    onClick={() => setSelectedFile(file)}
                  >
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{file.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {file.uploadDate}
                </TableCell>
                <TableCell>
                  <Switch checked={file.enabled} />
                </TableCell>
                <TableCell>
                  <span className="font-medium">{file.chunkNumber}</span>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{file.parseType}</Badge>
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
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        •••
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setSelectedFile(file)}>
                        <Eye className="h-4 w-4 mr-2" />
                        Xem chunks
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
  )
}
