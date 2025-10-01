import { useState } from "react"
import { ArrowLeft, FileText, Settings, TestTube2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/ui/status-badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DatasetFilesTab } from "./DatasetFilesTab"
import { DatasetRetrievalTab } from "./DatasetRetrievalTab"
import { DatasetConfigTab } from "./DatasetConfigTab"

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

interface DatasetDetailViewProps {
  dataset: Dataset
  onBack: () => void
  onUpdateDataset: (dataset: Dataset) => void
}

export function DatasetDetailView({ dataset, onBack }: DatasetDetailViewProps) {
  const [activeTab, setActiveTab] = useState("dataset")

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
          <TabsTrigger value="dataset">
            <FileText className="h-4 w-4 mr-2" />
            Dataset
          </TabsTrigger>
          <TabsTrigger value="retrieval">
            <TestTube2 className="h-4 w-4 mr-2" />
            Retrieval Testing
          </TabsTrigger>
          <TabsTrigger value="config">
            <Settings className="h-4 w-4 mr-2" />
            Configuration
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dataset" className="space-y-4">
          <DatasetFilesTab datasetId={dataset.id} />
        </TabsContent>

        <TabsContent value="retrieval" className="space-y-4">
          <DatasetRetrievalTab />
        </TabsContent>

        <TabsContent value="config" className="space-y-4">
          <DatasetConfigTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
